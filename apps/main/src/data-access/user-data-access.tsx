"use client";

import {
  CONTRACTS_PROGRAM_ID,
  getContractsProgram,
  getContractsProgramId,
} from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster, PublicKey, SystemProgram } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useCluster } from "../components/cluster/cluster-data-access";
import { useAnchorProvider } from "../components/solana/solana-provider";
import { useTransactionToast } from "../components/ui/ui-layout";
import * as anchor from "@coral-xyz/anchor";

export function useUserProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getContractsProgramId(cluster.network as Cluster),
    [cluster],
  );
  const program = useMemo(
    () => getContractsProgram(provider, programId),
    [provider, programId],
  );

  const accounts = useQuery({
    queryKey: ["user", "all", { cluster }],
    queryFn: () => program.account.user.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }], // Consider namespacing this better if used across hooks
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createUser = useMutation({
    mutationKey: ["user", "create", { cluster }],
    mutationFn: async ({ payer }: { payer: PublicKey }) => {
      const [userPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), payer.toBuffer()],
        CONTRACTS_PROGRAM_ID,
      );

      return program.methods
        .createUser()
        .accountsPartial({
          payer,
          user: userPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: (error: Error) => {
      toast.error(`Failed to create user: ${error.message}`);
      console.error("Create User Error:", error);
    },
  });

  const updateUser = useMutation({
    mutationKey: ["user", "update", { cluster }],
    mutationFn: async ({
      payer, // This should be the signer, either the DID or the sol_account that has authority
      userAccount, // The PDA of the user account to update
      solAccount,
      twitterAccount,
      emailAccount,
      humanVerification,
      solName,
    }: {
      payer: PublicKey;
      userAccount: PublicKey;
      solAccount?: PublicKey;
      twitterAccount?: boolean;
      emailAccount?: boolean;
      humanVerification?: boolean;
      solName?: boolean;
    }) => {
      // Ensure optional parameters are correctly handled (passed as null if not provided, Anchor handles Option<T>)
      return program.methods
        .updateUser(
          solAccount ?? null,
          twitterAccount ?? null,
          emailAccount ?? null,
          humanVerification ?? null,
          solName ?? null,
        )
        .accountsPartial({
          payer,
          user: userAccount,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: (error: Error) => {
      toast.error(`Failed to update user: ${error.message}`);
      console.error("Update User Error:", error);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createUser,
    updateUser,
  };
}
