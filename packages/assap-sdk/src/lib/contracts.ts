import { Cluster, PublicKey } from "@solana/web3.js";

export function getContractsProgramId(cluster: Cluster) {
  switch (cluster) {
    case "devnet":
    case "testnet":
      // This is the program ID for the Contracts program on devnet and testnet.
      return new PublicKey("4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e");
    case "mainnet-beta":
    default:
      return "4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e";
  }
}
