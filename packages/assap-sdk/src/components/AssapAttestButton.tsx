import { AttestationData } from "@/core";
import { useAssapAttest, type UseAssapAttestProps } from "../hooks";
import { Button } from "./ui/button";

type AssapAttestButtonProps = UseAssapAttestProps & {
  receiver: string;
  issuer: string;
  attestData: AttestationData;
};

export const AssapAttestButton = ({
  onAttestComplete,
  schemaId,
  cluster,
  attestData,
  receiver,
  issuer,
}: AssapAttestButtonProps) => {
  const { inititateAttestation } = useAssapAttest({
    onAttestComplete,
    schemaId,
    cluster,
  });
  return (
    <Button
      onClick={() => inititateAttestation({ attestData, receiver, issuer })}
    >
      Attest Now
    </Button>
  );
};
