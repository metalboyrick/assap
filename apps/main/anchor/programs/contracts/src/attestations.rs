use anchor_lang::prelude::*;
use crate::schema_registry::SchemaRegistry;
use crate::user::User;
use crate::verifiers::mapping::VerifierMapping;
use crate::error_code::ErrorCode;
use crate::verifiers::base_verifier::BaseVerifier;

#[event]
pub struct AttestationCreated {
    pub uid: u64,
    pub schema_account: Pubkey,
    pub issuer: Pubkey,
    pub receiver: Pubkey,
    pub timestamp: u64,
    pub attest_data: String,
    pub attest_index: u64,
}

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
#[instruction(attest_data: String, receiver: Pubkey)]
pub struct CreateAttestation<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    // this will pull up the schema account passed in by the user
    #[account(mut)]
    pub schema_registry: Account<'info, SchemaRegistry>,

    #[account(
        seeds = [b"user", payer.key().as_ref()],
        bump
    )]
    pub issuer: Account<'info, User>,

    #[account(        
        seeds = [b"user", receiver.as_ref()],
        bump
    )]
    pub attestee: Account<'info, User>,

    /// CHECK: This is the sol account that the issuer attached to the user instance. 
    /// We're using AccountInfo because we're only checking its public key against the stored address.
    #[account(
        constraint = issuer.sol_account == Pubkey::default() || issuer_attached_sol_account.key() == issuer.sol_account @ ErrorCode::InvalidIssuerAttachedSolAccount
    )]
    pub issuer_attached_sol_account: AccountInfo<'info>,

    /// CHECK: This is the sol account that the attestee attached to the user instance.
    /// We're using AccountInfo because we're only checking its public key against the stored address.
    #[account(
        constraint = attestee.sol_account == Pubkey::default() || attestee_attached_sol_account.key() == attestee.sol_account @ ErrorCode::InvalidAttesteeAttachedSolAccount
    )]
    pub attestee_attached_sol_account: AccountInfo<'info>,

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
    attest_data: String,
    receiver: Pubkey,
) -> Result<()> {
    let attestation: &mut Account<'_, Attestation> = &mut ctx.accounts.attestation;
    let schema_registry: &Account<'_, SchemaRegistry> = &ctx.accounts.schema_registry;
    let attestee: &Account<'_, User> = &ctx.accounts.attestee;
    let issuer: &Account<'_, User> = &ctx.accounts.issuer;
    let schema_account = ctx.accounts.schema_registry.key(); 
    
    // Verify using the mapping directly
    let verifier_mapping = VerifierMapping::new();
    
    // Check issuer verifiers
    let all_issuer_valid = schema_registry.issuer_verifiers.iter()
        .all(|verifier_name| {
            match verifier_mapping.get_verifier(verifier_name) {
                Some(verifier) => verifier.verify(&issuer, &ctx.accounts.issuer_attached_sol_account),
                None => false,
            }
        });
        
    if !all_issuer_valid {
        return Err(ErrorCode::InvalidAttestData.into());
    }
    
    // Check attestee verifiers
    let all_attestee_valid = schema_registry.attestee_verifiers.iter()
        .all(|verifier_name| {
            match verifier_mapping.get_verifier(verifier_name) {
                Some(verifier) => verifier.verify(&attestee, &ctx.accounts.attestee_attached_sol_account),
                None => false,
            }
        });
        
    if !all_attestee_valid {
        return Err(ErrorCode::InvalidAttestData.into());
    }

    // Schema account is now validated through the account constraint
    attestation.schema_account = schema_account;
    attestation.issuer = ctx.accounts.issuer.did;
    attestation.receiver = ctx.accounts.attestee.did;
    attestation.timestamp = Clock::get()?.unix_timestamp as u64;

    // next increment the attest count
    attestation.attest_index = ctx.accounts.schema_registry.attest_count;
    attestation.attest_data = attest_data;

    ctx.accounts.schema_registry.attest_count += 1;

    emit!(AttestationCreated {
        uid: attestation.uid,
        schema_account: attestation.schema_account,
        issuer: attestation.issuer,
        receiver: attestation.receiver,
        timestamp: attestation.timestamp,
        attest_data: attestation.attest_data.clone(),
        attest_index: attestation.attest_index,
    });

    Ok(())
}