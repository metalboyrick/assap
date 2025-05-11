import { GatewayProvider } from "@civic/solana-gateway-react";
import { Toaster } from "./Toast";
import { CivicAuthProvider } from "@civic/auth-web3";
import { Connection, PublicKey } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";

const gatekeeperNetwork = new PublicKey(
  "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
);

export function AssapProvider({ children }: { children: React.ReactNode }) {
  return (
    <GatewayProvider
      connection={new Connection(clusterApiUrl("devnet"), "confirmed")}
      cluster="devnet"
      // wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
    >
      {/* client id hard coded for now, this will be moved to some sort of injection mechanism later */}
      <CivicAuthProvider clientId={"6b1a9573-300c-4777-ad91-27cbea305f1b"}>
        {children}
      </CivicAuthProvider>
      <Toaster />
    </GatewayProvider>
  );
}
