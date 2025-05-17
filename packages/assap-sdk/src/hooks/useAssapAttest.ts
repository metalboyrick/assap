import {
  AttestationData,
  getSchemaById,
  getSchemaDataFromBlobId,
} from "@/core";
import { useAssapContext } from "../components/AssapProvider";
import { Cluster } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  PENDING_SCHEMA_DATA_LOCAL_STORAGE_KEY,
  PENDING_ATTESTATION_DATA_LOCAL_STORAGE_KEY,
} from "@/lib/local-storage";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export interface UseAssapAttestProps {
  schemaId: string;
  onAttestComplete: (txnHash: string, attestationUid: string) => void;
  cluster: Cluster;
}

export function useAssapAttest({
  schemaId,
  onAttestComplete: _onAttestComplete,
  cluster,
}: UseAssapAttestProps) {
  const { user } = useDynamicContext();

  const {
    setCurrentVerificationStep,
    setIsSchemaDataSetLoading,
    setSelectedSchemaDataSet,
    setCluster,
    setAttestationData,
    setOnAttestComplete,
  } = useAssapContext();

  const { data: schemaDataSet, isLoading: isSchemaDataSetLoading } = useQuery({
    queryKey: ["schemaDataSet", schemaId],
    queryFn: async () => {
      const schema = await getSchemaById(schemaId);
      const schemaData = await getSchemaDataFromBlobId(schema.schema_data);

      // Save the schemaData to local storage and put it as a constant
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            PENDING_SCHEMA_DATA_LOCAL_STORAGE_KEY,
            JSON.stringify({ schema, data: schemaData }),
          );
        } catch (e) {
          // Ignore storage errors
        }
      }

      return { schema, data: schemaData };
    },
  });

  useEffect(() => {
    setIsSchemaDataSetLoading(isSchemaDataSetLoading);
    setSelectedSchemaDataSet(schemaDataSet);
    setCluster(cluster);
  }, [schemaDataSet, isSchemaDataSetLoading]);

  // cluster: Cluster,
  // payer: PublicKey,
  // schemaRegistry: PublicKey,
  // attestData: AttestationData,
  // receiver: PublicKey,
  // issuerAttachedSolAccount: PublicKey,
  // attesteeAttachedSolAccount: PublicKey,
  // provider: AnchorProvider,

  const initiateAttestation = ({
    attestData,
  }: {
    attestData: AttestationData;
    receiver?: string;
  }) => {
    // if (!primaryWallet?.address) {
    //   return;
    // }

    if (typeof window !== "undefined") {
      try {
        // Clear the pending attestation data key
        window.localStorage.removeItem(
          PENDING_ATTESTATION_DATA_LOCAL_STORAGE_KEY,
        );
        // Add the current attest data
        window.localStorage.setItem(
          PENDING_ATTESTATION_DATA_LOCAL_STORAGE_KEY,
          JSON.stringify(attestData),
        );
      } catch (e) {
        // Ignore storage errors
      }
    }

    setOnAttestComplete(_onAttestComplete);
    setAttestationData(attestData);

    if (!user) {
      setCurrentVerificationStep(1);
    } else {
      setCurrentVerificationStep(2);
    }
  };

  return {
    initiateAttestation,
    isSchemaDataSetLoading,
  };
}
