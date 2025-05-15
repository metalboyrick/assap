import { AnchorProvider } from "@coral-xyz/anchor";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useEffect, useState, useMemo } from "react";
import { isSolanaWallet } from "@dynamic-labs/solana";
import { type ISolana } from "@dynamic-labs/solana-core";

export function useAnchorProviderFromDynamic() {
  const { primaryWallet } = useDynamicContext();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [signer, setSigner] = useState<ISolana | null>(null);

  // get connection from dynamic
  useEffect(() => {
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
      return;
    }

    primaryWallet.getConnection().then((_connection: any) => {
      setConnection(_connection as Connection);
    });

    primaryWallet.getSigner().then((_signer) => {
      setSigner(_signer);
    });
  }, [primaryWallet]);

  const anchorWallet = useMemo<AnchorWallet | null>(() => {
    if (!primaryWallet || !isSolanaWallet(primaryWallet) || !signer) {
      return null;
    }

    return {
      publicKey: new PublicKey(primaryWallet.address),
      signTransaction: signer?.signTransaction as unknown as (
        transaction: Transaction,
      ) => Promise<Transaction>,
      signAllTransactions: signer?.signAllTransactions as unknown as (
        transactions: Transaction[],
      ) => Promise<Transaction[]>,
    } as AnchorWallet;
  }, [primaryWallet, signer]);

  const anchorProvider = useMemo<AnchorProvider | null>(() => {
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) return null;

    if (!anchorWallet || !connection) return null;

    return new AnchorProvider(connection, anchorWallet, {
      commitment: "confirmed",
    });
  }, [primaryWallet, connection, anchorWallet]);

  return { anchorProvider, anchorWallet };
}
