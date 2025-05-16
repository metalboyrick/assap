import { IdentityVerifier } from "../actions/schema";

export interface Schema {
  schema_uid: string;
  creation_transaction_id: string;
  creator_uid: string;
  creation_timestamp: Date;
  schema_name: string;
  schema_data: string;
  creation_cost: number;
  human_message_template?: string;
  verification_requirements?: {
    issuer_verifiers: IdentityVerifier[];
    attestee_verifiers: IdentityVerifier[];
  };
}

export interface Attestation {
  attestation_uid: string;
  schema_uid: string;
  attestee_uid: string;
  attestor_uid: string;
  creation_date: Date;
  transaction_id: string;
  attestation_index: number;
  attestation_data?: any;
}
