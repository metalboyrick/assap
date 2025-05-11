import { useCheckForAssapProvider } from "../components/AssapProvider";
import { Cluster } from "@solana/web3.js";

export interface UseAssapAttestProps {
  schemaId: string;
  attestData: Record<string, string>;
  onAttestComplete: () => void;
  cluster: Cluster;
}

export function useAssapAttest({
  schemaId,
  attestData,
  onAttestComplete,
  cluster,
}: UseAssapAttestProps) {
  console.log(schemaId, attestData, onAttestComplete, cluster);

  // checks if this was used inside the assap provider
  useCheckForAssapProvider();

  return {
    attest: () => {
      console.log("attest");
    },
  };
}
