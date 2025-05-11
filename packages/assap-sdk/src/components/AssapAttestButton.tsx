import { useAssapAttest, type UseAssapAttestProps } from "../hooks";
import { Button } from "./ui/button";

type AssapAttestButtonProps = UseAssapAttestProps;

export const AssapAttestButton = ({
  onAttestComplete,
  schemaId,
  attestData,
  cluster,
}: AssapAttestButtonProps) => {
  const { attest } = useAssapAttest({
    onAttestComplete,
    schemaId,
    attestData,
    cluster,
  });
  return <Button onClick={attest}>Attest Now</Button>;
};
