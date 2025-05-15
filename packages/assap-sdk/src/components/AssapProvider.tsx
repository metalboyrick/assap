import { GatewayProvider } from "@civic/solana-gateway-react";
import { Cluster, PublicKey } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VerificationDialogs } from "./VerificationDialogs";
import { AttestationData, Schema, SchemaData } from "@/core";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletError } from "@solana/wallet-adapter-base";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

// Import wallet adapter UI styles
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

const gatekeeperNetwork = new PublicKey(
  "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
);

export type VerificationMethod = {
  id: string;
  name: string;
  isVerified: boolean;
  icon: React.ElementType; // For Lucide icons
  iconBgClass: string;
  iconColorClass: string;
};

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
  receiver: PublicKey;
  setReceiver: (receiver: PublicKey) => void;
  issuer: PublicKey;
  setIssuer: (issuer: PublicKey) => void;
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
  const [receiver, setReceiver] = useState<PublicKey>({} as PublicKey);
  const [issuer, setIssuer] = useState<PublicKey>({} as PublicKey);

  // AnchorProvider setup
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  // Endpoint for ConnectionProvider
  const endpoint = useMemo(() => {
    return typeof cluster === "string" ? clusterApiUrl(cluster) : cluster;
  }, [cluster]);

  const onError = useCallback((error: WalletError) => {
    console.error("Wallet Adapter Error:", error);
  }, []);

  // Define wallets for WalletProvider if not using DynamicContextProvider exclusively
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      // Add other wallets here e.g. new PhantomWalletAdapter(),
    ],
    [],
  );

  let content = (
    <QueryClientProvider client={queryClient}>
      {/* <PrivyProvider
        appId="cmaohnlg900dkl70m51s5kx7e"
        clientId="client-WY6LJbGdikecgEK2dmh8kn4RvktCAzWEzVVq6DyPePPkG"
        config={{
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            solana: {
              createOnLogin: "users-without-wallets",
            },
          },
          solanaClusters: [
            {
              name: "devnet",
              rpcUrl: "https://api.devnet.solana.com",
            },
          ],
          externalWallets: {
            solana: {
              connectors: toSolanaWalletConnectors(),
            },
          },
        }}
      > */}
      <DynamicContextProvider
        settings={{
          environmentId: "102aa782-c66d-4651-9738-33f5665bfcbb",
          walletConnectors: [SolanaWalletConnectors],
        }}
      >
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={wallets}
            onError={onError}
            autoConnect={true}
          >
            <WalletModalProvider>
              <GatewayProvider
                connection={connection}
                cluster={cluster}
                wallet={wallet}
                gatekeeperNetwork={gatekeeperNetwork}
              >
                <VerificationDialogs
                  currentVerificationStep={currentVerificationStep}
                  setCurrentVerificationStep={setCurrentVerificationStep}
                  verificationStatus={verificationStatus}
                  onClose={() => setCurrentVerificationStep(0)}
                />
                {children}
              </GatewayProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        {/* </PrivyProvider> */}
      </DynamicContextProvider>
    </QueryClientProvider>
  );

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
        receiver,
        setReceiver,
        issuer,
        setIssuer,
      }}
    >
      {content}
    </AssapContext.Provider>
  );
}
