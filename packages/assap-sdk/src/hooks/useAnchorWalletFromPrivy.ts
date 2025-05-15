import { AnchorProvider } from "@coral-xyz/anchor";
import { useSolanaWallets } from "@privy-io/react-auth";
import { AnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useMemo } from "react";

export function useAnchorWalletFromPrivy() {
  const { wallets } = useSolanaWallets();
  const { connection } = useConnection();

  const anchorProvider = useMemo(() => {
    if (wallets.length < 1) return null;

    const wallet = wallets[0];

    const anchorWallet: AnchorWallet = {
      publicKey: new PublicKey(wallet.address),
      signTransaction: async (transaction: Transaction) =>
        wallet.signTransaction(transaction),
      signAllTransactions: async (transactions: Transaction[]) =>
        wallet.signAllTransactions(transactions),
    } as AnchorWallet;

    if (!anchorWallet || !connection) return null;

    return new AnchorProvider(connection, anchorWallet, {
      commitment: "confirmed",
    });
  }, [connection]);

  return { anchorProvider };
}
