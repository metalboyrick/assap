import {
  getSchemaById,
  getSchemaDataFromBlobId,
  type AttestationData,
} from "@/core";
import { useAssapContext } from "../components/AssapProvider";
import { Cluster } from "@solana/web3.js";
import { useUser } from "@civic/auth-web3/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export interface UseAssapAttestProps {
  schemaId: string;
  attestData: AttestationData;
  onAttestComplete: () => void;
  cluster: Cluster;
}

export function useAssapAttest({
  schemaId,
  onAttestComplete: _onAttestComplete,
  cluster: _cluster,
}: UseAssapAttestProps) {
  const { user } = useUser();

  const {
    setCurrentVerificationStep,
    setIsSchemaDataSetLoading,
    setSelectedSchemaDataSet,
    setAttestationData,
  } = useAssapContext();

  const { data: schemaDataSet, isLoading: isSchemaDataSetLoading } = useQuery({
    queryKey: ["schemaDataSet", schemaId],
    queryFn: async () => {
      const schema = await getSchemaById(schemaId);
      const schemaData = await getSchemaDataFromBlobId(schema.schema_data);
      return { schema, data: schemaData };
    },
  });

  useEffect(() => {
    setIsSchemaDataSetLoading(isSchemaDataSetLoading);
    setSelectedSchemaDataSet(schemaDataSet);
  }, [schemaDataSet, isSchemaDataSetLoading]);

  const attest = () => {
    setCurrentVerificationStep(1);
  };

  // this function initiates an attestation process by opening a window.
  const initiateAttestation = (attestData: AttestationData) => {
    // set Attestation Data
    setAttestationData(attestData);

    // set modals according to steps
    if (!user) {
      setCurrentVerificationStep(1);
    } else {
      setCurrentVerificationStep(2);
    }
  };

  return {
    attest,
    initiateAttestation,
    isSchemaDataSetLoading,
  };
}
