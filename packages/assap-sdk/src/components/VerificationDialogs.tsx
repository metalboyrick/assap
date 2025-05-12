import React from "react";
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
import {
  Twitter,
  Mail,
  Wallet,
  Info,
  Shield,
  CheckCircle2,
  LogIn,
} from "lucide-react";

export type VerificationMethod = {
  id: string;
  name: string;
  isVerified: boolean;
  icon: React.ElementType; // For Lucide icons
  iconBgClass: string;
  iconColorClass: string;
};

export interface VerificationDialogsProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isVerifyModalOpen: boolean;
  setIsVerifyModalOpen: (open: boolean) => void;
  isStatusModalOpen: boolean;
  setIsStatusModalOpen: (open: boolean) => void;
  verificationStatus: VerificationMethod[];
  onLoginConfirm: () => void;
  onVerifyConfirm: () => void;
  onStatusConfirm: () => void;
  onClose: () => void;
}

export const VerificationDialogs: React.FC<VerificationDialogsProps> = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isVerifyModalOpen,
  setIsVerifyModalOpen,
  isStatusModalOpen,
  setIsStatusModalOpen,
  verificationStatus,
  onLoginConfirm,
  onVerifyConfirm,
  onStatusConfirm,
}) => {
  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
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
                <Button
                  className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 w-full"
                  onClick={onLoginConfirm}
                >
                  Sign in to Continue <LogIn className="h-6 w-6 text-white" />
                </Button>
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

          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="border-zinc-700">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* First Verification Modal */}
      <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Please Verify Your Identity
            </DialogTitle>
            <DialogDescription>
              Choose a verification method to proceed with creating your
              attestation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-4">
                  <Twitter className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Twitter</h3>
                  <p className="text-sm text-zinc-400">
                    Verify using your Twitter account
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-4">
                  <Wallet className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Solana Wallet</h3>
                  <p className="text-sm text-zinc-400">
                    Verify using your Solana wallet
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-zinc-400">
                    Verify using your email address
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-2">
              <Info className="h-4 w-4 text-zinc-500 mr-2" />
              <span className="text-xs text-zinc-500">
                Select a verification method to continue
              </span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
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
              onClick={onVerifyConfirm}
            >
              Check Verification Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Verification Status Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
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
              onClick={() => {
                setIsStatusModalOpen(false);
                setIsVerifyModalOpen(true);
              }}
            >
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={onStatusConfirm}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
