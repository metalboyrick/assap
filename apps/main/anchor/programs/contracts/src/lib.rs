#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e");

mod error_code;
mod verifiers;
mod schema_registry;
mod attestations;
mod user;

use schema_registry::*;
use attestations::*;
use user::*;
#[program]
pub mod contracts {
    use super::*;

  pub fn register_schema(ctx: Context<RegisterSchema>, schema: String, schema_name: String, issuer_verifiers: Vec<String>, attestee_verifiers: Vec<String>) -> Result<()> {
    schema_registry::register_schema(ctx, schema, schema_name, issuer_verifiers, attestee_verifiers)
  }

  pub fn create_attestation(ctx: Context<CreateAttestation>, attest_data: String, receiver: Pubkey) -> Result<()> {
    attestations::create_attestation(ctx, attest_data, receiver)
  }

  pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
    user::create_user(ctx)
  }
}
