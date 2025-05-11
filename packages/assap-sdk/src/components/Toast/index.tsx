import { Toaster as SonnerToaster } from "sonner";

interface ToasterProps {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  richColors?: boolean;
  closeButton?: boolean;
}

export function Toaster({
  position = "top-right",
  richColors = true,
  closeButton = true,
}: ToasterProps = {}) {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      closeButton={closeButton}
    />
  );
}
