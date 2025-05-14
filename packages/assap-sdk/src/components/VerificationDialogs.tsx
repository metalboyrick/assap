import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Twitter,
  Mail,
  Wallet,
  Info,
  Shield,
  CheckCircle2,
  LucideIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import { UserButton, useUser } from "@civic/auth-web3/react";
import { IdentityVerifier } from "@/core";
import { useAssapContext } from "./AssapProvider";

export type VerificationMethod = {
  id: string;
  name: string;
  isVerified: boolean;
  icon: React.ElementType; // For Lucide icons
  iconBgClass: string;
  iconColorClass: string;
};

interface VerificationCardButtonProps {
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const VerificationCardButton: React.FC<VerificationCardButtonProps> = ({
  icon: Icon,
  iconBgClass,
  iconColorClass,
  title,
  description,
  onClick,
}) => {
  return (
    <div
      className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`h-10 w-10 rounded-full ${iconBgClass} flex items-center justify-center mr-4`}
      >
        <Icon className={`h-5 w-5 ${iconColorClass}`} />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
};

export interface VerificationDialogsProps {
  currentVerificationStep: number;
  setCurrentVerificationStep: (step: number) => void;
  verificationStatus: VerificationMethod[];
  onClose: () => void;
}

export const VerificationDialogs: React.FC<VerificationDialogsProps> = ({
  currentVerificationStep,
  setCurrentVerificationStep,
  verificationStatus,
  onClose,
}) => {
  const { user } = useUser();

  const { selectedSchemaDataSet, isSchemaDataSetLoading, attestationData } =
    useAssapContext();

  useEffect(() => {
    if (!user && currentVerificationStep > 1) {
      console.log({ user });
      setCurrentVerificationStep(1);
    }
  }, [user, currentVerificationStep, setCurrentVerificationStep]);

  const handleLoginConfirm = () => {
    setCurrentVerificationStep(1.5); // Go to data preview step
  };

  const handleDataPreviewConfirm = () => {
    setCurrentVerificationStep(2); // Go to verification methods step
  };

  const handleVerifyConfirm = () => {
    setCurrentVerificationStep(3);
  };

  const handleStatusConfirm = () => {
    setCurrentVerificationStep(0);
    onClose();
  };

  // Helper function to display data value
  const formatDataValue = (data: any): string => {
    if (Array.isArray(data)) {
      return data.join(", ");
    }
    return String(data);
  };

  // Helper function to get badge color based on data type
  const getTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case "string":
        return "bg-blue-900/30 text-blue-400 border-blue-800";
      case "number":
        return "bg-green-900/30 text-green-400 border-green-800";
      case "boolean":
        return "bg-purple-900/30 text-purple-400 border-purple-800";
      case "date":
        return "bg-amber-900/30 text-amber-400 border-amber-800";
      case "array":
        return "bg-red-900/30 text-red-400 border-red-800";
      case "object":
        return "bg-indigo-900/30 text-indigo-400 border-indigo-800";
      default:
        return "bg-zinc-900/30 text-zinc-400 border-zinc-800";
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog
        open={currentVerificationStep === 1}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(1) : setCurrentVerificationStep(0)
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Sign in to your ASSAP Credentials
            </DialogTitle>
            <DialogDescription>
              You need to sign in before creating an attestation for this schema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <p className="text-sm text-zinc-300">
                Signing in allows us to verify your identity and ensure that
                your attestation is valid. This helps maintain the integrity of
                the ASSAP protocol and prevents Sybil attacks.
              </p>
            </div>

            <div className="flex items-center justify-center p-6 border border-zinc-800 rounded-lg">
              <div className="text-center">
                <h3 className="font-medium text-lg mb-2">
                  Secure Authentication
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Your data is encrypted and securely stored on the Solana
                  blockchain
                </p>
                <UserButton
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 rounded-sm"
                  dropdownButtonClassName="bg-zinc-900"
                  wrapperClassName="w-full relative z-10"
                  style={{
                    color: "white",
                    borderColor: "white",
                  }}
                />
                <div className="mt-4 flex gap-2 items-center justify-center w-full">
                  <div className="text-xs text-zinc-500">Powered by</div>
                  <img
                    src="https://cdn.prod.website-files.com/6721152f5cf7d1402980ed13/6724ff46d44044c6b1599154_civic-logo-white.svg"
                    alt="Civic Logo"
                    className="h-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="border-zinc-700">
                Cancel
              </Button>
            </DialogClose>
            {user && (
              <Button
                onClick={handleLoginConfirm}
                className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
              >
                Continue
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Data Preview Modal - The new step */}
      <Dialog
        open={currentVerificationStep === 1.5}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(1.5) : setCurrentVerificationStep(0)
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Data to be Attested</DialogTitle>
            <DialogDescription>
              Review the data that will be attested on the blockchain for this
              schema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isSchemaDataSetLoading ? (
              <div className="py-8 flex flex-col items-center justify-center">
                <div className="h-10 w-10 rounded-full border-2 border-zinc-700 border-t-red-500 animate-spin mb-4"></div>
                <p className="text-sm text-zinc-400">Loading schema data...</p>
              </div>
            ) : (
              <>
                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 mb-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-4 w-4 text-blue-400 mr-2" />
                    <h3 className="font-bold">
                      {selectedSchemaDataSet?.schema.schema_name}
                    </h3>
                  </div>
                  {selectedSchemaDataSet?.data.humanMessage && (
                    <p className="text-sm text-zinc-300 mb-2">
                      {selectedSchemaDataSet.data.humanMessage}
                    </p>
                  )}
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-1 px-2 w-[150px]">
                        Field / Type
                      </TableHead>
                      <TableHead className="py-1 px-2">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSchemaDataSet?.data.schemaData.map(
                      (field, index) => (
                        <TableRow
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-900/30"
                              : "bg-zinc-900/10"
                          }
                        >
                          <TableCell className="flex items-center gap-3 py-3 px-2 w-[150px]">
                            <div className="font-medium truncate">
                              {field.name}
                            </div>
                            <Badge
                              className={`${getTypeColor(field.type)} mt-1`}
                            >
                              {field.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-zinc-300 truncate py-3 px-2">
                            {formatDataValue(attestationData[field.name])}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>

                <Alert className="bg-zinc-800 border-zinc-700">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <AlertTitle>Important Notice</AlertTitle>
                  <AlertDescription>
                    This data will be cryptographically signed and stored on the
                    Solana blockchain. Once attested, it cannot be modified or
                    deleted.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 sm:w-auto w-full"
              onClick={() => setCurrentVerificationStep(1)}
            >
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={handleDataPreviewConfirm}
              disabled={isSchemaDataSetLoading || !selectedSchemaDataSet}
            >
              Continue to Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* First Verification Modal */}
      <Dialog
        open={currentVerificationStep === 2}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(2) : setCurrentVerificationStep(0)
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Please complete the required verifications
            </DialogTitle>
            <DialogDescription>
              This schema requires the verifications of the following identity
              methods, please verify all of them to continue.
            </DialogDescription>
          </DialogHeader>

          {/* Current User Section */}
          <div className="border border-zinc-800 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              {user && (
                <UserButton
                  style={{
                    color: "white",
                    borderColor: "white",
                  }}
                  className="w-full"
                  wrapperClassName="w-full relative z-10"
                  dropdownButtonClassName="bg-zinc-900"
                />
              )}
            </div>
          </div>

          {isSchemaDataSetLoading ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-zinc-700 border-t-red-500 animate-spin mb-4"></div>
              <p className="text-sm text-zinc-400">
                Loading schema requirements...
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                {selectedSchemaDataSet?.schema.verification_requirements
                  ?.issuer_verifiers &&
                selectedSchemaDataSet.schema.verification_requirements
                  .issuer_verifiers.length > 0 ? (
                  selectedSchemaDataSet.schema.verification_requirements.issuer_verifiers.map(
                    (verifier) => {
                      switch (verifier) {
                        case IdentityVerifier.SolBalance:
                        case IdentityVerifier.SolMinTx:
                        case IdentityVerifier.SolName:
                          return (
                            <VerificationCardButton
                              key="solana-wallet-verifier"
                              icon={Wallet}
                              iconBgClass="bg-purple-900/30"
                              iconColorClass="text-purple-400"
                              title="Solana Wallet"
                              description="Verify using your Solana wallet"
                            />
                          );
                        case IdentityVerifier.Twitter:
                          return (
                            <VerificationCardButton
                              key="twitter-verifier"
                              icon={Twitter}
                              iconBgClass="bg-blue-900/30"
                              iconColorClass="text-blue-400"
                              title="Twitter"
                              description="Verify using your Twitter account"
                            />
                          );
                        case IdentityVerifier.Email:
                          return (
                            <VerificationCardButton
                              key="email-verifier"
                              icon={Mail}
                              iconBgClass="bg-red-900/30"
                              iconColorClass="text-red-400"
                              title="Email"
                              description="Verify using your email address"
                            />
                          );
                        default:
                          return null;
                      }
                    },
                  )
                ) : (
                  <Alert className="bg-zinc-800 border-zinc-700">
                    <Info className="h-4 w-4 text-blue-400" />
                    <AlertTitle>No Verifications Required</AlertTitle>
                    <AlertDescription>
                      This attestation does not require verifications, you can
                      proceed.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex items-center justify-center mt-2">
                <Info className="h-4 w-4 text-zinc-500 mr-2" />
                <span className="text-xs text-zinc-500">
                  Select a verification method to continue
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 sm:w-auto w-full"
              onClick={() => setCurrentVerificationStep(1.5)}
            >
              Back
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-zinc-700 sm:w-auto w-full"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={handleVerifyConfirm}
              disabled={isSchemaDataSetLoading}
            >
              Check Verification Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Verification Status Modal */}
      <Dialog
        open={currentVerificationStep === 3}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(3) : setCurrentVerificationStep(0)
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Your Verification Status
            </DialogTitle>
            <DialogDescription>
              Review your current verification status for different identity
              methods
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              {verificationStatus.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full ${method.iconBgClass} flex items-center justify-center mr-4`}
                    >
                      <method.icon
                        className={`h-5 w-5 ${method.iconColorClass}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-zinc-400">
                        {method.isVerified ? "Verified" : "Not verified"}
                      </p>
                    </div>
                  </div>
                  <div>
                    {method.isVerified ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle2 className="h-5 w-5 mr-1" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-700 hover:bg-zinc-800"
                            >
                              Verify
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Not active in mockup</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Alert className="bg-zinc-800 border-zinc-700">
              <Shield className="h-4 w-4 text-blue-400" />
              <AlertTitle>Verification Required</AlertTitle>
              <AlertDescription>
                This schema requires at least one verified identity method to
                create an attestation.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 sm:w-auto w-full"
              onClick={() => setCurrentVerificationStep(2)}
            >
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={handleStatusConfirm}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
