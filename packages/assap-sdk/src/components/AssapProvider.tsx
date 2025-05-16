import { Cluster, PublicKey } from "@solana/web3.js";
import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VerificationDialogs } from "./VerificationDialogs";
import { AttestationData, Schema, SchemaData } from "@/core";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  DynamicContextProvider,
  overrideNetworkRpcUrl,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { WalletError } from "@solana/wallet-adapter-base";

// Import wallet adapter UI styles
import "@solana/wallet-adapter-react-ui/styles.css";

// const gatekeeperNetwork = new PublicKey(
//   "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
// );

export type VerificationMethod = {
  id: string;
  name: string;
  isVerified: boolean;
  icon: React.ElementType; // For Lucide icons
  iconBgClass: string;
  iconColorClass: string;
};

export type NameServiceData = {
  avatar?: string;
  name?: string;
};

export type WalletProviderEnum =
  | "browserExtension"
  | "custodialService"
  | "walletConnect"
  | "qrCode"
  | "deepLink"
  | "embeddedWallet"
  | "smartContractWallet";

export type WalletProperties = {
  turnkeySubOrganizationId?: string;
  turnkeyHDWalletId?: string;
  isAuthenticatorAttached?: boolean;
};

export type JwtVerifiedCredentialFormatEnum =
  | "blockchain"
  | "email"
  | "oauth"
  | "passkey";

export type SocialSignInProviderEnum =
  | "emailOnly"
  | "magicLink"
  | "apple"
  | "bitbucket"
  | "discord"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "instagram"
  | "linkedin"
  | "microsoft"
  | "twitch"
  | "twitter"
  | "blocto"
  | "banxa"
  | "dynamic"
  | "alchemy"
  | "zerodev"
  | "turnkey";

export type JwtVerifiedCredential = {
  id: string;
  address?: string;
  chain?: string;
  refId?: string;
  signerRefId?: boolean;
  email?: string;
  nameService?: NameServiceData;
  publicIdentifier?: string;
  walletName?: string;
  walletProvider?: WalletProviderEnum;
  walletProperties?: WalletProperties;
  format?: JwtVerifiedCredentialFormatEnum;
  oauthProvider?: SocialSignInProviderEnum;
  oauthUsername?: string;
  oauthDisplayName?: string;
  oauthAccountId?: string;
  oauthAccountPhotos?: string[];
  oauthEmails?: string;
  previousUsers?: string[];
  embeddedWalletId?: string | null;
};

const RPC_URL = "https://api.devnet.solana.com";
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

  onAttestComplete: (txnHash: string) => void;
  setOnAttestComplete: (onAttestComplete: (txnHash: string) => void) => void;
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
  const [onAttestComplete, setOnAttestComplete] = useState<
    (txnHash: string) => void
  >(() => {});

  const onError = (error: WalletError) => {
    console.error("Wallet Adapter Error:", error);
  };

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
          environmentId: "12d0cb43-b719-4251-80fb-d6446132fb5c",
          walletConnectors: [SolanaWalletConnectors],
          overrides: {
            solNetworks: (networks) =>
              overrideNetworkRpcUrl(networks, {
                "103": [RPC_URL],
              }),
          },
          walletsFilter: (wallets) =>
            wallets.filter(
              (w) =>
                w.key.includes("solflare") ||
                w.key.includes("phantom") ||
                w.key.includes("backpack"),
            ),
        }}
      >
        <ConnectionProvider endpoint={RPC_URL}>
          <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
            <WalletModalProvider>
              {/* <GatewayProvider
                connection={connection}
                cluster={cluster}
                wallet={wallet}
                gatekeeperNetwork={gatekeeperNetwork}
              > */}
              <VerificationDialogs
                currentVerificationStep={currentVerificationStep}
                setCurrentVerificationStep={setCurrentVerificationStep}
                verificationStatus={verificationStatus}
                onClose={() => setCurrentVerificationStep(0)}
              />
              {children}
              {/* </GatewayProvider> */}
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
        onAttestComplete,
        setOnAttestComplete,
      }}
    >
      {content}
    </AssapContext.Provider>
  );
}
