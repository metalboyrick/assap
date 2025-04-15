// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Cluster, PublicKey } from "@solana/web3.js";
import ContractsIDL from "../target/idl/contracts.json";
import type { Contracts } from "../target/types/contracts";

// Re-export the generated IDL and type
export { Contracts, ContractsIDL };

// The programId is imported from the program IDL.
export const CONTRACTS_PROGRAM_ID = new PublicKey(ContractsIDL.address);

// This is a helper function to get the Contracts Anchor program.
export function getContractsProgram(
  provider: AnchorProvider,
  address?: PublicKey,
) {
  return new Program(
    {
      ...ContractsIDL,
      address: address ? address.toBase58() : ContractsIDL.address,
    } as Contracts,
    provider,
  );
}

// This is a helper function to get the program ID for the Contracts program depending on the cluster.
export function getContractsProgramId(cluster: Cluster) {
  switch (cluster) {
    case "devnet":
    case "testnet":
      // This is the program ID for the Contracts program on devnet and testnet.
      return new PublicKey("4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e");
    case "mainnet-beta":
    default:
      return CONTRACTS_PROGRAM_ID;
  }
}
