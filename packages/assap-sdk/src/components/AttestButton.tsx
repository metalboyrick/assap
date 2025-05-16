import { Button } from "@/components/ui/button";
import { AttestationData } from "@/core";
import { useAssapAttest } from "@/hooks/useAssapAttest";
import { cn } from "@/lib/utils";
import { Cluster } from "@solana/web3.js";

export function AttestButton({
  schemaId,
  onAttestComplete,
  attestData,
  className,
}: {
  schemaId: string;
  onAttestComplete: () => void;
  attestData: AttestationData;
  className?: string;
  cluster: Cluster;
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
      className={cn(
        "bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700",
        className,
      )}
    >
      Attest Now
    </Button>
  );
}
