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
}
