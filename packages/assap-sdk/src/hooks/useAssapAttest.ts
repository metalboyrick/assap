import {
  AttestationData,
  getSchemaById,
  getSchemaDataFromBlobId,
} from "@/core";
import { useAssapContext } from "../components/AssapProvider";
import { Cluster } from "@solana/web3.js";
import { useUser } from "@civic/auth-web3/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export interface UseAssapAttestProps {
  schemaId: string;
  onAttestComplete: (txnHash: string) => void;
  cluster: Cluster;
}

export function useAssapAttest({
  schemaId,
  onAttestComplete: _onAttestComplete,
  cluster,
}: UseAssapAttestProps) {
  const { user } = useUser();

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
