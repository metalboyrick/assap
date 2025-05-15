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
  CheckCircle2,
  LucideIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  createAttestation,
  // createUser,
  // getUserByAddress,
  IdentityVerifier,
} from "@/core";
import { useAssapContext, VerificationMethod } from "./AssapProvider";
import { PublicKey } from "@solana/web3.js";
// import { updateUser } from "@/core/actions/users";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAnchorProviderFromDynamic } from "@/hooks/useAnchorProviderFromDynamic";

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
}) => {
  const { cluster, onAttestComplete } = useAssapContext();
  const { user, primaryWallet } = useDynamicContext();

  const { anchorProvider } = useAnchorProviderFromDynamic();

  const { selectedSchemaDataSet, isSchemaDataSetLoading, attestationData } =
    useAssapContext();

  useEffect(() => {
    if (!user && currentVerificationStep > 1) {
      console.log({ user });
      setCurrentVerificationStep(1);
    }
  }, [user, currentVerificationStep, setCurrentVerificationStep]);

  // const handleCreateUser = async () => {
  //   try {
  //     if (!anchorProvider) {
  //       throw new Error("Anchor provider not found");
  //     }
  //     if (!publicKey) {
  //       throw new Error("Wallet not connected");
  //     }

  //     const userInSolana = await getUserByAddress(
  //       "devnet",
  //       publicKey,
  //       anchorProvider,
  //     );

  //     console.log({ userInSolana });

  //     return userInSolana;
  //   } catch (error) {
  //     console.error({ error });

  //     if (!anchorProvider) {
  //       throw new Error("Anchor provider not found");
  //     }
  //     if (!publicKey) {
  //       throw new Error("Wallet not connected for user creation");
  //     }

  //     await createUser("devnet", publicKey, anchorProvider);

  //     await updateUser("devnet", publicKey, anchorProvider, {
  //       emailAccount: false,
  //       twitterAccount: false,
  //       solAccount: publicKey ? publicKey : undefined,
  //     });

  //     console.log({ user: publicKey });

  //     return { address: publicKey.toBase58() };
  //   }
  // };

  // useEffect(() => {
  //   if (publicKey && anchorProvider) {
  //     handleCreateUser();
  //   }
  // }, [publicKey, anchorProvider]);

  const handleLoginConfirm = () => {
    setCurrentVerificationStep(2);
  };

  const handleDataPreviewConfirm = () => {
    setCurrentVerificationStep(3);
  };

  const handleVerifyConfirm = async () => {
    setCurrentVerificationStep(4);
  };

  const formatDataValue = (data: any): string => {
    if (Array.isArray(data)) {
      return data.join(", ");
    }
    return String(data);
  };

  function renderHumanMessage(
    template: string,
    data: Record<string, any>,
  ): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => {
      const value = data[key];
      return value !== undefined ? String(value) : `{${key}}`;
    });
  }

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
              <div className="text-center w-full flex items-center justify-center flex-col">
                <h3 className="font-medium text-lg mb-2">
                  Secure Authentication
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Your data is encrypted and securely stored on the Solana
                  blockchain
                </p>
                <DynamicWidget
                  variant="modal"
                  innerButtonComponent={
                    <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 w-full">
                      Connect Account
                    </Button>
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="border-zinc-700">
                Cancel
              </Button>
            </DialogClose>
            {!!user && (
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

      <Dialog
        open={currentVerificationStep === 2}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(2) : setCurrentVerificationStep(0)
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
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-blue-400 mr-2" />
                    <h3 className="font-bold">
                      {selectedSchemaDataSet?.schema.schema_name}
                    </h3>
                  </div>
                </div>

                {selectedSchemaDataSet?.data.humanMessage && (
                  <div className="mb-4">
                    <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide">
                      Preview message
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded p-3">
                      <p className="text-sm text-zinc-300 font-mono break-words">
                        {renderHumanMessage(
                          selectedSchemaDataSet.data.humanMessage,
                          attestationData,
                        )}
                      </p>
                    </div>
                  </div>
                )}

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

      <Dialog
        open={currentVerificationStep === 3}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(3) : setCurrentVerificationStep(0)
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

          <div className="border border-zinc-800 rounded-lg p-4 mb-4">
            <div className="flex flex-col gap-2">
              <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide">
                Your Account
              </div>
              <DynamicWidget />
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
              onClick={() => setCurrentVerificationStep(2)}
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
              Review your data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={currentVerificationStep === 4}
        onOpenChange={(open) =>
          open ? setCurrentVerificationStep(4) : setCurrentVerificationStep(0)
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Review & Confirm Attestation
            </DialogTitle>
            <DialogDescription>
              Please review all details before submitting your attestation to
              the blockchain.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 mb-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="font-bold">
                  {selectedSchemaDataSet?.schema.schema_name}
                </h3>
              </div>
            </div>

            {selectedSchemaDataSet?.data.humanMessage && (
              <div className="mb-2">
                <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide">
                  Preview message
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 rounded p-3">
                  <p className="text-sm text-zinc-300 font-mono break-words">
                    {renderHumanMessage(
                      selectedSchemaDataSet.data.humanMessage,
                      attestationData,
                    )}
                  </p>
                </div>
              </div>
            )}

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
                {selectedSchemaDataSet?.data.schemaData.map((field, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-zinc-900/30" : "bg-zinc-900/10"
                    }
                  >
                    <TableCell className="flex items-center gap-3 py-3 px-2 w-[150px]">
                      <div className="font-medium truncate">{field.name}</div>
                      <Badge className={`${getTypeColor(field.type)} mt-1`}>
                        {field.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-300 truncate py-3 px-2">
                      {formatDataValue(attestationData[field.name])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div>
              <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide">
                Completed Verifications
              </div>
              <div className="grid grid-cols-1 gap-2">
                {verificationStatus.filter((v) => v.isVerified).length === 0 ? (
                  <div className="text-sm text-zinc-500">
                    No verifications completed.
                  </div>
                ) : (
                  verificationStatus
                    .filter((v) => v.isVerified)
                    .map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center gap-3 p-2 border border-zinc-800 rounded-lg"
                      >
                        <div
                          className={`h-8 w-8 rounded-full ${method.iconBgClass} flex items-center justify-center`}
                        >
                          <method.icon
                            className={`h-4 w-4 ${method.iconColorClass}`}
                          />
                        </div>
                        <span className="font-medium text-zinc-300">
                          {method.name}
                        </span>
                        <span className="text-green-400 flex items-center ml-2 text-xs">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Verified
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 sm:w-auto w-full"
              onClick={() => setCurrentVerificationStep(3)}
            >
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={async () => {
                if (!selectedSchemaDataSet?.schema.schema_uid) {
                  console.error("Schema UID is required");
                  return;
                }

                if (!primaryWallet?.address) {
                  alert(
                    "Please connect your wallet before performing attestation.",
                  );
                  return;
                }

                if (!anchorProvider) {
                  throw new Error("Anchor provider not found");
                }

                const publicKey = new PublicKey(primaryWallet.address);

                try {
                  const txnHash = await createAttestation(
                    cluster,
                    publicKey,
                    new PublicKey(selectedSchemaDataSet.schema.schema_uid),
                    attestationData,
                    publicKey,
                    publicKey,
                    publicKey,
                    anchorProvider,
                  );

                  setCurrentVerificationStep(1);

                  onAttestComplete(txnHash);
                } catch (err) {
                  console.error("Failed to create attestation:", err);
                  alert("Failed to create attestation. Please try again.");
                }
              }}
            >
              Perform Attestation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
