#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

mod schema_registry;
  use schema_registry::*;

mod attestations;
  use attestations::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The provided schema account does not match the expected account")]
    InvalidSchemaAccount,
}

#[program]
pub mod contracts {
    use super::*;

  pub fn register_schema(ctx: Context<RegisterSchema>, schema: String, schema_name: String, issuer_min_score: u64, receiver_min_score: u64, issuer_scoring_program: Pubkey, receiver_scoring_program: Pubkey) -> Result<()> {
    schema_registry::register_schema(ctx, schema, schema_name, issuer_min_score, receiver_min_score, issuer_scoring_program, receiver_scoring_program)
  }

  pub fn create_attestation(ctx: Context<CreateAttestation>, schema_account: Pubkey, attest_data: String, receiver: Pubkey) -> Result<()> {
    attestations::create_attestation(ctx, schema_account, attest_data, receiver)
  }
}
