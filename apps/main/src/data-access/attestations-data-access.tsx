"use client";

import { getContractsProgram, getContractsProgramId } from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useCluster } from "../components/cluster/cluster-data-access";
import { useAnchorProvider } from "../components/solana/solana-provider";
import { useTransactionToast } from "../components/ui/ui-layout";
import {
  createAttestation as sdkCreateAttestation,
  AttestationData,
} from "@assap/assap-sdk";

export function useAttestationProgram() {
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

  const attestations = useQuery({
    queryKey: ["attestation", "all", { cluster }],
    queryFn: () => program.account.attestation.all(),
  });

  const getAttestationBySchema = useQuery({
    queryKey: ["attestation", "bySchema", { cluster }],
    queryFn: async ({ queryKey }: any) => {
      const [_key, _type, { schemaId }] = queryKey;
      return program.account.attestation.all([
        {
          memcmp: {
            offset: 8, // Offset for schema ID in the attestation account
            bytes: schemaId,
          },
        },
      ]);
    },
    enabled: false,
  });

  const createAttestation = useMutation({
    mutationKey: ["attestation", "create", { cluster }],
    mutationFn: async ({
      payer,
      schemaRegistry,
      attestData,
      receiver,
      issuerAttachedSolAccount,
      attesteeAttachedSolAccount,
    }: {
      payer: PublicKey;
      schemaRegistry: PublicKey;
      attestData: AttestationData;
      receiver: PublicKey;
      issuerAttachedSolAccount: PublicKey;
      attesteeAttachedSolAccount: PublicKey;
    }) => {
      return sdkCreateAttestation(
        cluster.network as Cluster,
        payer,
        schemaRegistry,
        attestData,
        receiver,
        issuerAttachedSolAccount,
        attesteeAttachedSolAccount,
        provider,
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return attestations.refetch();
    },
    onError: () => toast.error("Failed to create attestation"),
  });

  return {
    program,
    programId,
    attestations,
    getAttestationBySchema,
    createAttestation,
  };
}
