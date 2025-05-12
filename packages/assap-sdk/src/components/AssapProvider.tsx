import { GatewayProvider } from "@civic/solana-gateway-react";
import { CivicAuthProvider } from "@civic/auth-web3";
import { Connection, PublicKey } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VerificationDialogs, VerificationMethod } from "./VerificationDialogs";

const gatekeeperNetwork = new PublicKey(
  "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
);

interface AssapContextValue {
  currentVerificationStep: number;
  setCurrentVerificationStep: (step: number) => void;
}

// Create a context for the AssapProvider
const AssapContext = createContext<AssapContextValue | null>(null);

// Create a client
const queryClient = new QueryClient();

// Hook to check if component is within AssapProvider
export function useCheckForAssapProvider() {
  const context = useContext(AssapContext);
  if (!context) {
    throw new Error("AssapProvider must be placed in the root of the app");
  }
}

export function useAssapContext() {
  const context = useContext(AssapContext);
  if (!context) {
    throw new Error("AssapProvider must be placed in the root of the app");
  }
  return context;
}

export function AssapProvider({ children }: { children: React.ReactNode }) {
  const [currentVerificationStep, setCurrentVerificationStep] = useState(0);
  const [verificationStatus] = useState<VerificationMethod[]>([]);

  return (
    <AssapContext.Provider
      value={{ currentVerificationStep, setCurrentVerificationStep }}
    >
      <QueryClientProvider client={queryClient}>
        <GatewayProvider
          connection={new Connection(clusterApiUrl("devnet"), "confirmed")}
          cluster="devnet"
          // wallet={wallet}
          gatekeeperNetwork={gatekeeperNetwork}
        >
          {/* client id hard coded for now, this will be moved to some sort of injection mechanism later */}
          <CivicAuthProvider clientId={"6b1a9573-300c-4777-ad91-27cbea305f1b"}>
            {children}
            <VerificationDialogs
              onClose={() => setCurrentVerificationStep(0)}
              isLoginModalOpen={currentVerificationStep === 1}
              setIsLoginModalOpen={() => setCurrentVerificationStep(1)}
              isVerifyModalOpen={currentVerificationStep === 2}
              setIsVerifyModalOpen={() => setCurrentVerificationStep(2)}
              isStatusModalOpen={currentVerificationStep === 3}
              setIsStatusModalOpen={() => setCurrentVerificationStep(3)}
              verificationStatus={verificationStatus}
              onLoginConfirm={() => setCurrentVerificationStep(2)}
              onVerifyConfirm={() => setCurrentVerificationStep(3)}
              onStatusConfirm={() => setCurrentVerificationStep(0)}
            />
          </CivicAuthProvider>
        </GatewayProvider>
      </QueryClientProvider>
    </AssapContext.Provider>
  );
}
