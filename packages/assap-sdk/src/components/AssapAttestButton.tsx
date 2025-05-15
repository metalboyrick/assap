import { AttestationData } from "@/core";
import { useAssapAttest, type UseAssapAttestProps } from "../hooks";
import { Button } from "./ui/button";

type AssapAttestButtonProps = UseAssapAttestProps & {
  receiver?: string;
  attestData: AttestationData;
};

export const AssapAttestButton = ({
  onAttestComplete,
  schemaId,
  cluster,
  attestData,
  receiver,
}: AssapAttestButtonProps) => {
  const { initiateAttestation } = useAssapAttest({
    onAttestComplete,
    schemaId,
    cluster,
  });
  return (
    <Button onClick={() => initiateAttestation({ attestData, receiver })}>
      Attest Now
    </Button>
  );
};
