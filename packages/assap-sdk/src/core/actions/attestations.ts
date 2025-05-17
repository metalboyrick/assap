import { Cluster, PublicKey, SystemProgram } from "@solana/web3.js";
import { AnchorProvider, BN } from "@coral-xyz/anchor";
import { SchemaRegistry } from "./schema"; // Assuming SchemaRegistry is exported from schema.ts
import { getContractsProgram, getContractsProgramId } from "@/lib/contracts";
import * as walrus from "@/lib/walrus";
import { OnchainUser } from "./users";

export type AttestationData = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[]
>;

/**
 * Utility function to get seed parameters for creating an attestation PDA.
 * Replicates logic from apps/main/src/lib/contracts.ts
 * @param payer PublicKey of the payer (typically the issuer)
 * @param schemaRegistry PublicKey of the schema registry account
 * @param attestCount The current attestation count for the schema (will be incremented)
 * @returns Array of buffers for PDA generation
 */
export function getCreateAttestationSeedParams(
  payer: PublicKey,
  schemaRegistry: PublicKey,
  attestCount: number,
): (Buffer | Uint8Array)[] {
  return [
    Buffer.from("attestation"),
    payer.toBuffer(),
    schemaRegistry.toBuffer(),
    new BN(attestCount).toArrayLike(Buffer, "le", 8),
  ];
}

/**
 * Creates a new attestation on the Solana blockchain.
 * @param cluster The Solana cluster to use.
 * @param payer PublicKey of the account paying for the transaction (usually the issuer).
 * @param schemaRegistry PublicKey of the schema registry account this attestation is based on.
 * @param attestData Stringified data for the attestation.
 * @param receiver PublicKey of the entity receiving the attestation.
 * @param issuerAttachedSolAccount PublicKey of the issuer's SOL account to be linked (if any).
 * @param attesteeAttachedSolAccount PublicKey of the attestee's/receiver's SOL account to be linked (if any).
 * @returns Promise<string> Transaction signature.
 */
export async function createAttestation(
  cluster: Cluster,
  payer: PublicKey,
  schemaRegistry: PublicKey,
  attestData: AttestationData,
  receiver: PublicKey,
  provider: AnchorProvider,
): Promise<{ txnHash: string; attestationUid: string }> {
  const programId = getContractsProgramId(cluster);
  const program = getContractsProgram(provider, programId);

  // Derive issuer and attestee PDAs
  const [issuerPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), payer.toBuffer()],
    new PublicKey(programId),
  );

  const [attesteePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), receiver.toBuffer()],
    new PublicKey(programId),
  );

  const [issueAccount, attesteeAccount, schemaAccount] = (await Promise.all([
    program.account.user.fetch(issuerPda) as Promise<unknown>,
    program.account.user.fetch(attesteePda) as Promise<unknown>,
    program.account.schemaRegistry.fetch(schemaRegistry) as Promise<unknown>,
  ])) as [OnchainUser, OnchainUser, SchemaRegistry];

  const attestCount = schemaAccount.attestCount.toNumber() + 1;

  // Derive the attestation PDA
  const [attestationPda] = PublicKey.findProgramAddressSync(
    getCreateAttestationSeedParams(payer, schemaRegistry, attestCount),
    new PublicKey(programId),
  );
  // TODO: verify data with schema (can be later)

  // store attestData in walrus
  const attestDataBlobId = await walrus.storeData({ attestData });

  return {
    txnHash: await program.methods
      .createAttestation(attestDataBlobId, receiver)
      .accountsPartial({
        payer,
        schemaRegistry,
        issuer: issuerPda,
        attestee: attesteePda,
        issuerAttachedSolAccount: issueAccount.solAccount,
        attesteeAttachedSolAccount: attesteeAccount.solAccount,
        attestation: attestationPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc(),
    attestationUid: attestationPda.toBase58(),
  };
}

export async function getAttestationDataFromBlobId(
  blobId: string,
): Promise<AttestationData> {
  const data = await walrus.getData(blobId);
  return data.attestData;
}
