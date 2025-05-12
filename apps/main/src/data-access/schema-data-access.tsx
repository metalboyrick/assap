"use client";

import {
  CONTRACTS_PROGRAM_ID,
  getContractsProgram,
  getContractsProgramId,
} from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  Cluster,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useCluster } from "../components/cluster/cluster-data-access";
import { useAnchorProvider } from "../components/solana/solana-provider";
import { useTransactionToast } from "../components/ui/ui-layout";
import { getCreateSchemaSeedParams } from "@/lib/contracts";
import {
  registerSchema as sdkRegisterSchema,
  type SchemaData,
} from "@assap/assap-sdk";

export enum IdentityVerifier {
  SolBalance = "sol_balance",
  SolMinTx = "sol_min_tx",
  SolName = "sol_name",
  Twitter = "twitter",
  Email = "email",
  Human = "human",
}

export function useSchemaProgram() {
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
    queryKey: ["schema", "all", { cluster }],
    queryFn: () => program.account.schemaRegistry.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const registerSchemaMutation = useMutation({
    mutationKey: ["schema", "registerSchema", { cluster }],
    mutationFn: ({
      payer,
      schemaData,
      schemaName,
      issuerVerifiers,
      attesteeVerifiers,
    }: {
      payer: PublicKey;
      schemaData: SchemaData[];
      schemaName: string;
      issuerVerifiers: IdentityVerifier[];
      attesteeVerifiers: IdentityVerifier[];
    }) => {
      return sdkRegisterSchema(
        cluster.network as Cluster,
        payer,
        schemaData,
        schemaName,
        issuerVerifiers,
        attesteeVerifiers,
        provider,
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error("Failed to initialize account"),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    registerSchema: registerSchemaMutation,
  };
}
