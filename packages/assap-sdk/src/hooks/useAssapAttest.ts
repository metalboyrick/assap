import { useCheckForAssapProvider } from "../components/AssapProvider";

export interface UseAssapAttestProps {
  schemaId: string;
  attestData: Record<string, string>;
  onAttestComplete: () => void;
}

export function useAssapAttest({
  schemaId,
  attestData,
  onAttestComplete,
}: UseAssapAttestProps) {
  console.log(schemaId, attestData, onAttestComplete);

  // checks if this was used inside the assap provider
  useCheckForAssapProvider();

  return {
    attest: () => {
      console.log("attest");
    },
  };
}
