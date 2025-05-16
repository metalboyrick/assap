"use client";

import { ReactQueryProvider } from "@/app/react-query-provider";
import { AssapProvider } from "@assap-xyz/assap-sdk";
import { SolanaProvider } from "./solana/solana-provider";
import { ThemeProvider } from "next-themes";
import { ClusterProvider } from "./cluster/cluster-data-access";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ClusterProvider>
        <SolanaProvider>
          <AssapProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AssapProvider>
        </SolanaProvider>
      </ClusterProvider>
    </ReactQueryProvider>
  );
}
