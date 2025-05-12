import { type AttestationData } from "@/core";
import { useAssapContext } from "../components/AssapProvider";
import { Cluster } from "@solana/web3.js";

export interface UseAssapAttestProps {
  schemaId: string;
  attestData: AttestationData;
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

  const { setCurrentVerificationStep } = useAssapContext();

  return {
    attest: () => {
      setCurrentVerificationStep(1);
    },
  };
}
