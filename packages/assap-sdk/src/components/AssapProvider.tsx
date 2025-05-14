import { GatewayProvider } from "@civic/solana-gateway-react";
import { CivicAuthProvider } from "@civic/auth-web3";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VerificationDialogs, VerificationMethod } from "./VerificationDialogs";
import { AttestationData, Schema, SchemaData } from "@/core";

const gatekeeperNetwork = new PublicKey(
  "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
);

interface AssapContextValue {
  currentVerificationStep: number;
  setCurrentVerificationStep: (step: number) => void;
  selectedSchemaDataSet:
    | {
        schema: Schema;
        data: { humanMessage: string; schemaData: SchemaData[] };
      }
    | undefined;
  setSelectedSchemaDataSet: (
    schemaDataSet:
      | {
          schema: Schema;
          data: { humanMessage: string; schemaData: SchemaData[] };
        }
      | undefined,
  ) => void;
  isSchemaDataSetLoading: boolean;
  setIsSchemaDataSetLoading: (isSchemaDataSetLoading: boolean) => void;
  attestationData: AttestationData;
  setAttestationData: (attestationData: AttestationData) => void;
  cluster: Cluster;
  setCluster: (cluster: Cluster) => void;
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
  const [selectedSchemaDataSet, setSelectedSchemaDataSet] = useState<
    | {
        schema: Schema;
        data: { humanMessage: string; schemaData: SchemaData[] };
      }
    | undefined
  >(undefined);
  const [isSchemaDataSetLoading, setIsSchemaDataSetLoading] = useState(false);
  const [attestationData, setAttestationData] = useState<AttestationData>(
    {} as AttestationData,
  );
  const [cluster, setCluster] = useState<Cluster>("devnet");

  return (
    <AssapContext.Provider
      value={{
        currentVerificationStep,
        setCurrentVerificationStep,
        selectedSchemaDataSet,
        setSelectedSchemaDataSet,
        isSchemaDataSetLoading,
        setIsSchemaDataSetLoading,
        attestationData,
        setAttestationData,
        cluster,
        setCluster,
      }}
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
            <VerificationDialogs
              currentVerificationStep={currentVerificationStep}
              setCurrentVerificationStep={setCurrentVerificationStep}
              verificationStatus={verificationStatus}
              onClose={() => setCurrentVerificationStep(0)}
            />
            {children}
          </CivicAuthProvider>
        </GatewayProvider>
      </QueryClientProvider>
    </AssapContext.Provider>
  );
}
