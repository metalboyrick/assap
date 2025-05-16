import { Button } from "@/components/ui/button";
import { AttestationData } from "@/core";
import { useAssapAttest } from "@/hooks/useAssapAttest";

export function AttestButton({
  schemaId,
  onAttestComplete,
  attestData,
}: {
  schemaId: string;
  onAttestComplete: () => void;
  attestData: AttestationData;
}) {
  const { initiateAttestation } = useAssapAttest({
    schemaId,
    onAttestComplete,
    cluster: "devnet",
  });

  return (
    <Button
      onClick={() =>
        initiateAttestation({
          attestData,
        })
      }
      className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
    >
      Attest Now
    </Button>
  );
}
