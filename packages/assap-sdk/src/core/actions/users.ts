import { Cluster, PublicKey, SystemProgram } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import {
  getContractsProgram,
  getContractsProgramId,
  CONTRACTS_PROGRAM_ID,
} from "@/lib/contracts";

/**
 * Creates a new user on the Solana blockchain.
 * @param cluster The Solana cluster to use.
 * @param payer The public key of the payer account (signer).
 * @param provider The AnchorProvider instance.
 * @returns Promise<string> Transaction signature.
 */
export async function createUser(
  cluster: Cluster,
  payer: PublicKey,
  provider: AnchorProvider,
): Promise<string> {
  const programId = getContractsProgramId(cluster);
  const program = getContractsProgram(provider, programId);

  // Derive the user PDA
  const [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), payer.toBuffer()],
    CONTRACTS_PROGRAM_ID,
  );

  // Call the createUser instruction
  return program.methods
    .createUser()
    .accountsPartial({
      payer,
      user: userPda,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

/**
 * Fetches a user account from the Solana blockchain by address (PDA).
 * @param cluster The Solana cluster to use.
 * @param address The public key of the user PDA.
 * @param provider The AnchorProvider instance.
 * @returns Promise<User> The user account data.
 */
export async function getUserByAddress(
  cluster: Cluster,
  address: PublicKey,
  provider: AnchorProvider,
): Promise<any> {
  // Replace 'any' with a proper User interface if available
  const programId = getContractsProgramId(cluster);
  const program = getContractsProgram(provider, programId);

  // Derive the user PDA
  const [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), address.toBuffer()],
    CONTRACTS_PROGRAM_ID,
  );

  return program.account.user.fetch(userPda);
}

/**
 * Updates a user account on the Solana blockchain.
 * @param cluster The Solana cluster to use.
 * @param payer The public key of the payer account (signer).
 * @param provider The AnchorProvider instance.
 * @param solAccount Optional new SOL account public key.
 * @param twitterAccount Optional new Twitter verification status.
 * @param emailAccount Optional new Email verification status.
 * @param humanVerification Optional new Human verification status.
 * @param solName Optional new Solana Name verification status.
 * @returns Promise<string> Transaction signature.
 */
export async function updateUser(
  cluster: Cluster,
  payer: PublicKey,
  provider: AnchorProvider,
  {
    solAccount,
    twitterAccount,
    emailAccount,
    humanVerification,
    solName,
  }: {
    solAccount?: PublicKey;
    twitterAccount?: boolean;
    emailAccount?: boolean;
    humanVerification?: boolean;
    solName?: boolean;
  } = {},
): Promise<string> {
  const programId = getContractsProgramId(cluster);
  const program = getContractsProgram(provider, programId);

  // Derive the user PDA
  const [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), payer.toBuffer()],
    CONTRACTS_PROGRAM_ID,
  );

  return program.methods
    .updateUser(
      solAccount ?? null,
      twitterAccount ?? null,
      emailAccount ?? null,
      humanVerification ?? null,
      solName ?? null,
    )
    .accountsPartial({
      payer,
      user: userPda,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}
