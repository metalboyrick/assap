use anchor_lang::prelude::*;
use crate::schema_registry::SchemaRegistry;
use crate::schema_registry::StringExt;
use crate::ErrorCode;


#[account]
#[derive(InitSpace)]
pub struct Attestation {
    pub uid: u64,
    pub schema_account: Pubkey,
    pub issuer: Pubkey,
    pub receiver: Pubkey,
    pub timestamp: u64,
    #[max_len(2048)]
    pub attest_data: String,
    pub attest_index: u64,
}

#[derive(Accounts)]
#[instruction(schema_account: Pubkey, attest_data: String, receiver: Pubkey)]
pub struct CreateAttestation<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    // this will pull up the schema account passed in by the user
    #[account(
        mut,
        constraint = schema_registry.key() == schema_account @ ErrorCode::InvalidSchemaAccount
    )]
    pub schema_registry: Account<'info, SchemaRegistry>,

    #[account(
        init,
        payer = payer,
        space = 8 + Attestation::INIT_SPACE,
        seeds = [b"attestation", payer.key().as_ref(), (schema_registry.attest_count + 1).to_le_bytes().as_ref()],
        bump
    )]
    pub attestation: Account<'info, Attestation>,

    pub system_program: Program<'info, System>,
}

pub fn create_attestation(
    ctx: Context<CreateAttestation>,
    schema_account: Pubkey,
    attest_data: String,
    receiver: Pubkey,
) -> Result<()> {
    let attestation = &mut ctx.accounts.attestation;

    let schema_registry = &ctx.accounts.schema_registry;
    let issuer_verifiers = get_issuer_verifiers(&schema_registry);
    let attestee_verifiers = get_attestee_verifiers(&schema_registry);

    if !issuer_verifiers.iter().all(|v| v.verify(&attest_data)) {
        return Err(ErrorCode::InvalidAttestData.into());
    }

    if !attestee_verifiers.iter().all(|v| v.verify(&attest_data)) {
        return Err(ErrorCode::InvalidAttestData.into());
    }

    // Schema account is now validated through the account constraint
    attestation.schema_account = schema_account;
    attestation.issuer = ctx.accounts.payer.key();
    attestation.receiver = receiver;
    attestation.timestamp = Clock::get()?.unix_timestamp as u64;

    // next increment the attest count
    attestation.attest_index = ctx.accounts.schema_registry.attest_count;
    attestation.attest_data = attest_data;

    ctx.accounts.schema_registry.attest_count += 1;
    Ok(())
}