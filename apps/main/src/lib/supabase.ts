import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Create a single client for the entire app
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Types based on our database schema
export interface Schema {
  schema_uid: string;
  creation_transaction_id: string;
  creator_uid: string;
  creation_timestamp: string;
  schema_name: string;
  schema_data: string;
  creation_cost: number;
  human_message_template?: string;
  verification_requirements?: any;
}

export interface Attestation {
  attestation_uid: string;
  schema_uid: string;
  attestee_uid: string;
  attestor_uid: string;
  creation_date: string;
  attestation_data?: any;
}
