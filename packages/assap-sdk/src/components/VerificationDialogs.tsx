"use client";

import React, { useEffect, useState } from "react";
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
  createUser,
  // createUser,
  // getUserByAddress,
  IdentityVerifier,
} from "@/core";
import { useAssapContext, VerificationMethod } from "./AssapProvider";
import { PublicKey } from "@solana/web3.js";
// import { updateUser } from "@/core/actions/users";
import { useAnchorProviderFromDynamic } from "@/hooks/useAnchorProviderFromDynamic";
import {
  getUserByAddress,
  OnchainUser,
  updateUser,
} from "@/core/actions/users";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { getPendingAttestationDataFromLocalStorage } from "@/lib/local-storage";
import { useAccountLinking } from "@/hooks/useAccountLinking";

interface VerificationCardButtonProps {
  icon: LucideIcon | (() => React.ReactNode);
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
  onClick?: () => void;
  isVerified?: boolean;
}

interface SignCredentialsProps {
  handleCreateUser: () => void;
  isUserCreated: boolean;
}

const SignCredentials: React.FC<SignCredentialsProps> = ({
  handleCreateUser,
  isUserCreated,
}) => {
  return (
    <div className="flex flex-col  items-center gap-4">
      <DynamicWidget />
      <Button
        onClick={handleCreateUser}
        disabled={isUserCreated}
        className="mt-4 bg-black border-2 border-transparent bg-clip-padding relative z-10
          before:content-[''] before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-red-600 before:to-blue-600 before:z-[-1] before:pointer-events-none
          hover:before:from-red-700 hover:before:to-blue-700"
      >
        {isUserCreated ? (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Credentials Signed
          </span>
        ) : (
          "Sign Your Credentials on-chain"
        )}
      </Button>
    </div>
  );
};

const VerificationCardButton: React.FC<VerificationCardButtonProps> = ({
  icon: Icon,
  iconBgClass,
  iconColorClass,
  title,
  description,
  onClick,
  isVerified = false,
}) => {
  // If verified, make the card unclickable and change cursor
  const handleClick = isVerified ? undefined : onClick;
  return (
    <div
      className={`flex items-center gap-3 p-4 border rounded-lg transition-colors justify-between ${
        isVerified
          ? "border-green-700 bg-green-900/20 cursor-default"
          : "border-zinc-800 hover:bg-zinc-800/50 cursor-pointer"
      }`}
      onClick={handleClick}
      tabIndex={isVerified ? -1 : 0}
      aria-disabled={isVerified}
      style={isVerified ? { pointerEvents: "none", opacity: 0.8 } : {}}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
            isVerified ? "bg-green-900/40" : iconBgClass
          }`}
        >
          {isVerified ? (
            <>
              <Icon className={`!h-5 !w-5 text-green-400 pr-4`} />
            </>
          ) : (
            <Icon className={`!h-5 !w-5 ${iconColorClass} pr-4`} />
          )}
        </div>
        <div>
          <h3 className={`font-medium ${isVerified ? "text-green-400" : ""}`}>
            {title}
          </h3>
          <p
            className={`text-sm ${isVerified ? "text-green-300" : "text-zinc-400"}`}
          >
            {description}
          </p>
        </div>
      </div>
      {isVerified && (
        <div className="flex items-center ml-4 min-w-[90px] justify-end">
          <svg
            className="h-4 w-4 text-green-400 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-xs text-green-400 font-semibold">Verified</span>
        </div>
      )}
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
}) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dynamicOauthCode = urlParams.get("dynamicOauthCode");

    if (dynamicOauthCode) {
      setCurrentVerificationStep(1);
    }
  }, []);

  const { cluster, onAttestComplete } = useAssapContext();

  const { user, primaryWallet } = useDynamicContext();

  const { anchorProvider } = useAnchorProviderFromDynamic();

  const { selectedSchemaDataSet, isSchemaDataSetLoading, attestationData } =
    useAssapContext();

  const [isUserCreated, setIsUserCreated] = useState(false);
  const [onchainUser, setOnchainUser] = useState<OnchainUser | undefined>(
    undefined,
  );

  // Add state for the Solana wallet instruction modal
  const [showSolanaInstructionModal, setShowSolanaInstructionModal] =
    useState(false);
  const [currentVerifier, setCurrentVerifier] =
    useState<IdentityVerifier | null>(null);

  const { linkAndUpdateUserAccount, checkWalletVerification } =
    useAccountLinking({
      onUpdateUser: async () => {
        getUserCreationStatus().then((_onchainUser) => {
          if (!!_onchainUser) {
            setOnchainUser(_onchainUser);
          }
          setIsUserCreated(!!_onchainUser);
        });
      },
    });

  useEffect(() => {
    if (!user && currentVerificationStep > 1) {
      setCurrentVerificationStep(1);
    }
  }, [user, currentVerificationStep, setCurrentVerificationStep]);

  const getUserCreationStatus = async () => {
    if (!anchorProvider || !primaryWallet?.address || !user) {
      return false;
    }

    const jwtVerifiedCredential = user.verifiedCredentials.find(
      (credential: any) => credential.walletProvider === "embeddedWallet",
    );

    if (!jwtVerifiedCredential?.address) {
      return false;
    }

    // this should be embedded
    const _onchainUser = await getUserByAddress(
      "devnet",
      new PublicKey(jwtVerifiedCredential.address),
      anchorProvider,
    );

    return _onchainUser;
  };

  // to get user creation status
  useEffect(() => {
    getUserCreationStatus().then((_onchainUser) => {
      if (!!_onchainUser) {
        setOnchainUser(_onchainUser);
      }
      setIsUserCreated(!!_onchainUser);
    });
    // Dependencies present in getUserCreationStatus, within the useEffect dependency array:
  }, [anchorProvider, primaryWallet?.address, user]);

  const handleCreateUser = async () => {
    if (!anchorProvider || !primaryWallet?.address || !user) {
      throw new Error("Anchor provider or primary wallet address not found");
    }

    const jwtVerifiedCredential = user.verifiedCredentials.find(
      (credential: any) => credential.walletProvider === "embeddedWallet",
    );

    if (!jwtVerifiedCredential?.address) {
      throw new Error("Embedded wallet not found");
    }

    const publicKey = new PublicKey(jwtVerifiedCredential.address);

    await createUser("devnet", publicKey, anchorProvider);
    await updateUser("devnet", publicKey, anchorProvider, {
      emailAccount: !!user?.email,
      twitterAccount: !!user?.verifiedCredentials.find(
        (credential: any) => credential.oauthProvider === "twitter",
      ),
      // solAccount: (() => {
      //   const solAccount = user?.verifiedCredentials.find(
      //     (credential: any) => {
      //       if (!credential.address || !credential.walletProvider) {
      //         return false;
      //       }

      //       return credential.walletProvider === "browserExtension";
      //     },
      //   );

      //   if (!solAccount?.address) {
      //     return undefined;
      //   }

      //   return new PublicKey(solAccount.address);
      // })(),
    });

    getUserCreationStatus().then((_onchainUser) => {
      if (!!_onchainUser) {
        setOnchainUser(_onchainUser);
      }
      setIsUserCreated(false);
    });
  };

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

  // Compute if all requirements are satisfied
  const allRequirementsVerified = (() => {
    if (isSchemaDataSetLoading || !selectedSchemaDataSet) return false;
    const verifiers =
      selectedSchemaDataSet.schema.verification_requirements
        ?.issuer_verifiers || [];
    if (verifiers.length === 0) return true;
    return verifiers.every((verifier) => {
      if (!onchainUser) return false;
      switch (verifier) {
        case IdentityVerifier.SolBalance:
        case IdentityVerifier.SolMinTx:
          return !!onchainUser.solAccount;
        case IdentityVerifier.SolName:
          return !!onchainUser.solName;
        case IdentityVerifier.Twitter:
          return !!onchainUser.twitterAccount;
        case IdentityVerifier.Email:
          return !!onchainUser.emailAccount;
        default:
          return false;
      }
    });
  })();

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
                <SignCredentials
                  handleCreateUser={handleCreateUser}
                  isUserCreated={isUserCreated}
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
                          Object.keys(attestationData || {}).length > 0
                            ? attestationData
                            : getPendingAttestationDataFromLocalStorage() || {},
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
                            {formatDataValue(
                              attestationData[field.name] !== undefined
                                ? attestationData[field.name]
                                : getPendingAttestationDataFromLocalStorage()?.[
                                    field.name
                                  ],
                            )}
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
            <div className="flex flex-col gap-2 items-center">
              <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide">
                Your Account
              </div>
              <SignCredentials
                handleCreateUser={handleCreateUser}
                isUserCreated={isUserCreated}
              />
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
                      if (onchainUser) {
                        let isVerified = false;
                        if (onchainUser) {
                          switch (verifier) {
                            case IdentityVerifier.SolBalance:
                            case IdentityVerifier.SolMinTx:
                              isVerified =
                                onchainUser.solAccount.toString() !==
                                "11111111111111111111111111111111";
                              return (
                                <VerificationCardButton
                                  key="solana-wallet-verifier"
                                  icon={Wallet}
                                  iconBgClass="bg-purple-900/30"
                                  iconColorClass="text-purple-400"
                                  title="Solana Wallet"
                                  description="Link your Solana wallet to verify"
                                  isVerified={isVerified}
                                  onClick={() => {
                                    setCurrentVerifier(
                                      IdentityVerifier.SolBalance,
                                    );
                                    setShowSolanaInstructionModal(true);
                                  }}
                                />
                              );
                            case IdentityVerifier.SolName:
                              isVerified = !!onchainUser.solName;
                              return (
                                <VerificationCardButton
                                  key="solana-wallet-verifier"
                                  icon={Wallet}
                                  iconBgClass="bg-purple-900/30"
                                  iconColorClass="text-purple-400"
                                  title="Solana Wallet"
                                  description="Link your Solana wallet to verify"
                                  isVerified={isVerified}
                                  onClick={() => {
                                    setCurrentVerifier(
                                      IdentityVerifier.SolName,
                                    );
                                    setShowSolanaInstructionModal(true);
                                  }}
                                />
                              );
                            case IdentityVerifier.Twitter:
                              isVerified = !!onchainUser.twitterAccount;
                              return (
                                <VerificationCardButton
                                  key="twitter-verifier"
                                  icon={() => (
                                    <img
                                      height="20"
                                      width="20"
                                      src="https://cdn.simpleicons.org/x/white"
                                    />
                                  )}
                                  iconBgClass="bg-black"
                                  iconColorClass="text-white"
                                  title="X"
                                  description="Link your X account to verify"
                                  isVerified={isVerified}
                                  onClick={() =>
                                    linkAndUpdateUserAccount(
                                      IdentityVerifier.Twitter,
                                    )
                                  }
                                />
                              );
                            case IdentityVerifier.Email:
                              isVerified = !!onchainUser.emailAccount;
                              return (
                                <VerificationCardButton
                                  key="email-verifier"
                                  icon={Mail}
                                  iconBgClass="bg-red-900/30"
                                  iconColorClass="text-red-400"
                                  title="Email (Google)"
                                  description="Link your email address to verify"
                                  isVerified={isVerified}
                                  onClick={() =>
                                    linkAndUpdateUserAccount(
                                      IdentityVerifier.Email,
                                    )
                                  }
                                />
                              );
                            default:
                              isVerified = false;
                              return null;
                          }
                        } else {
                          // If onchainUser is not defined, just return the card with isVerified false
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
                                  description="Link your Solana wallet to verify"
                                  isVerified={false}
                                  onClick={() => {
                                    setCurrentVerifier(
                                      IdentityVerifier.SolBalance,
                                    );
                                    setShowSolanaInstructionModal(true);
                                  }}
                                />
                              );
                            case IdentityVerifier.Twitter:
                              return (
                                <VerificationCardButton
                                  key="twitter-verifier"
                                  icon={() => (
                                    <img
                                      height="20"
                                      width="20"
                                      src="https://cdn.simpleicons.org/x/white"
                                    />
                                  )}
                                  iconBgClass="bg-black"
                                  iconColorClass="text-white"
                                  title="X"
                                  description="Link your X account to verify"
                                  isVerified={false}
                                  onClick={() =>
                                    linkAndUpdateUserAccount(
                                      IdentityVerifier.Twitter,
                                    )
                                  }
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
                                  description="Link your email address to verify"
                                  isVerified={false}
                                  onClick={() =>
                                    linkAndUpdateUserAccount(
                                      IdentityVerifier.Email,
                                    )
                                  }
                                />
                              );
                            default:
                              return null;
                          }
                        }
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
              disabled={isSchemaDataSetLoading || !allRequirementsVerified}
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
                      Object.keys(attestationData || {}).length > 0
                        ? attestationData
                        : getPendingAttestationDataFromLocalStorage() || {},
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
                      {formatDataValue(
                        attestationData[field.name] !== undefined
                          ? attestationData[field.name]
                          : getPendingAttestationDataFromLocalStorage()?.[
                              field.name
                            ],
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div>
              <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide">
                Completed Verifications
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {onchainUser ? (
                  [
                    {
                      key: "solAccount",
                      label: "Solana Wallet",
                      isVerified:
                        onchainUser.solAccount &&
                        onchainUser.solAccount.toString() !==
                          "11111111111111111111111111111111",
                      icon: Wallet,
                      iconBgClass: "bg-purple-900/30",
                      iconColorClass: "text-purple-400",
                    },
                    {
                      key: "solName",
                      label: "Solana Name",
                      isVerified: !!onchainUser.solName,
                      icon: Wallet,
                      iconBgClass: "bg-purple-900/30",
                      iconColorClass: "text-purple-400",
                    },
                    {
                      key: "twitterAccount",
                      label: "Twitter",
                      isVerified: !!onchainUser.twitterAccount,
                      icon: () => (
                        <img
                          height="16"
                          width="16"
                          src="https://cdn.simpleicons.org/x/white"
                        />
                      ),
                      iconBgClass: "bg-black",
                      iconColorClass: "text-white",
                    },
                    {
                      key: "emailAccount",
                      label: "Email",
                      isVerified: !!onchainUser.emailAccount,
                      icon: Mail,
                      iconBgClass: "bg-red-900/30",
                      iconColorClass: "text-red-400",
                    },
                    {
                      key: "humanVerification",
                      label: "Human",
                      isVerified: !!onchainUser.humanVerification,
                      icon: CheckCircle2,
                      iconBgClass: "bg-green-900/30",
                      iconColorClass: "text-green-400",
                    },
                  ].filter((v) => v.isVerified).length === 0 ? (
                    <div className="text-sm text-zinc-500">
                      No verifications completed.
                    </div>
                  ) : (
                    [
                      {
                        key: "solAccount",
                        label: "Solana Wallet",
                        isVerified:
                          onchainUser.solAccount &&
                          onchainUser.solAccount.toString() !==
                            "11111111111111111111111111111111",
                        icon: Wallet,
                        iconBgClass: "bg-purple-900/30",
                        iconColorClass: "text-purple-400",
                      },
                      {
                        key: "solName",
                        label: "Solana Name",
                        isVerified: !!onchainUser.solName,
                        icon: Wallet,
                        iconBgClass: "bg-purple-900/30",
                        iconColorClass: "text-purple-400",
                      },
                      {
                        key: "twitterAccount",
                        label: "Twitter",
                        isVerified: !!onchainUser.twitterAccount,
                        icon: () => (
                          <img
                            height="16"
                            width="16"
                            src="https://cdn.simpleicons.org/x/white"
                          />
                        ),
                        iconBgClass: "bg-black",
                        iconColorClass: "text-white",
                      },
                      {
                        key: "emailAccount",
                        label: "Email",
                        isVerified: !!onchainUser.emailAccount,
                        icon: Mail,
                        iconBgClass: "bg-red-900/30",
                        iconColorClass: "text-red-400",
                      },
                      {
                        key: "humanVerification",
                        label: "Human",
                        isVerified: !!onchainUser.humanVerification,
                        icon: CheckCircle2,
                        iconBgClass: "bg-green-900/30",
                        iconColorClass: "text-green-400",
                      },
                    ]
                      .filter((v) => v.isVerified)
                      .map((v) => (
                        <Badge
                          key={v.key}
                          className="flex items-center gap-1 bg-green-900/30 border-green-700 text-green-400 px-2 py-0.5 text-xs font-semibold rounded-md"
                        >
                          <span className="flex items-center gap-1">
                            <v.icon className="h-3.5 w-3.5 mr-1 text-green-400" />
                            <span className="text-green-400 font-medium">
                              {v.label}
                            </span>
                          </span>
                        </Badge>
                      ))
                  )
                ) : (
                  <div className="text-sm text-zinc-500">
                    No verifications completed.
                  </div>
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
                }
              }}
            >
              Perform Attestation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add the new Solana Wallet Instruction Modal */}
      <Dialog
        open={showSolanaInstructionModal}
        onOpenChange={(open) => setShowSolanaInstructionModal(open)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Solana Wallet Verification
            </DialogTitle>
            <DialogDescription>
              Follow these steps to verify your Solana wallet
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <ol className="list-decimal pl-5 space-y-3">
                <li className="text-sm text-zinc-300">
                  Navigate to the{" "}
                  <span className="font-semibold">Your Account</span> section
                  and click on your address, then select{" "}
                  <span className="font-semibold">Link Wallet</span>.
                </li>
                <li className="text-sm text-zinc-300">
                  After connecting your wallet, return to this verification
                  process and click the{" "}
                  <span className="font-semibold">Solana Wallet</span> button
                  again.
                </li>
                <li className="text-sm text-zinc-300">
                  Click{" "}
                  <span className="font-semibold">Check Verification</span>{" "}
                  below to confirm your wallet meets the eligibility
                  requirements.
                </li>
              </ol>
            </div>

            <Alert className="bg-zinc-800 border-zinc-700">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Verification requires your wallet to be properly connected and
                meet the specific requirements for this attestation.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 sm:w-auto w-full"
              onClick={() => setShowSolanaInstructionModal(false)}
            >
              Close
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={async () => {
                if (currentVerifier) {
                  await checkWalletVerification(currentVerifier);
                  setShowSolanaInstructionModal(false);
                }
              }}
            >
              Check Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
