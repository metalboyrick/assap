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

// Helper function to create the seed parameters for attestation PDA
const getCreateAttestationSeedParams = (attestationId: string): Buffer[] => {
  return [Buffer.from("attestation"), Buffer.from(attestationId)];
};

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
      attestData: string;
      receiver: PublicKey;
      issuerAttachedSolAccount: PublicKey;
      attesteeAttachedSolAccount: PublicKey;
    }) => {
      // Derive issuer and attestee PDAs
      const [issuerPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), payer.toBuffer()],
        CONTRACTS_PROGRAM_ID,
      );

      const [attesteePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), receiver.toBuffer()],
        CONTRACTS_PROGRAM_ID,
      );

      // Get the current attestation count
      const schemaAccount =
        await program.account.schemaRegistry.fetch(schemaRegistry);
      const attestCount = schemaAccount.attestCount.toNumber() + 1;

      // Derive the attestation PDA
      const [attestationPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("attestation"),
          payer.toBuffer(),
          new anchor.BN(attestCount).toBuffer("le", 8),
        ],
        CONTRACTS_PROGRAM_ID,
      );

      return program.methods
        .createAttestation(attestData, receiver)
        .accountsPartial({
          payer,
          schemaRegistry,
          issuer: issuerPda,
          attestee: attesteePda,
          issuerAttachedSolAccount,
          attesteeAttachedSolAccount,
          attestation: attestationPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
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
