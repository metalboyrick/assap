use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The provided schema account does not match the expected account")]
    InvalidSchemaAccount,

    #[msg("The provided user account does not match the expected account")]
    InvalidUserAccount,

    #[msg("The provided attestation account does not match the expected account")]
    InvalidAttestationAccount,

    #[msg("The provided attest data is invalid")]
    InvalidAttestData,

    #[msg("The provided attestee account does not match the expected account")]
    InvalidAttestee,

    #[msg("The provided issuer account does not match the expected account")]
    InvalidIssuer,

    #[msg("The provided issuer attached sol account does not match the expected account")]
    InvalidIssuerAttachedSolAccount,

    #[msg("The provided attestee attached sol account does not match the expected account")]
    InvalidAttesteeAttachedSolAccount,

    #[msg("The provided schema is already registered")]
    SchemaAlreadyRegistered,
}
