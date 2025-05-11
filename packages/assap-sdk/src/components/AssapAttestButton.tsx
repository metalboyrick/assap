import { useAssapAttest, type UseAssapAttestProps } from "../hooks";
import { Button } from "./ui/button";

type AssapAttestButtonProps = UseAssapAttestProps;

export const AssapAttestButton = ({
  onAttestComplete,
  schemaId,
  attestData,
}: AssapAttestButtonProps) => {
  const { attest } = useAssapAttest({
    onAttestComplete,
    schemaId,
    attestData,
  });
  return <Button onClick={attest}>Attest Now</Button>;
};
