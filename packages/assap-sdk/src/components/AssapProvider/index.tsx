import { GatewayProvider } from "@civic/solana-gateway-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Toaster } from "../Toast";

const gatekeeperNetwork = new PublicKey(
  "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
);

export function AssapProvider({ children }: { children: React.ReactNode }) {
  return (
    <GatewayProvider
      connection={new Connection(clusterApiUrl("mainnet-beta"), "confirmed")}
      cluster="mainnet-beta"
      // wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
    >
      {children}
      <Toaster />
    </GatewayProvider>
  );
}
