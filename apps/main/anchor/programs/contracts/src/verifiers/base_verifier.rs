use crate::user::User;
use anchor_lang::prelude::*;

/// Enum of all possible verifiers
#[derive(Clone)]
pub enum Verifier {
    SolBalance,
    SolMinTx,
    SolName,
    Twitter,
    Email,
    Human,
}

/// Trait for verifying participants in the attestation process
pub trait BaseVerifier {
    /// Verifies if an attestee is eligible to receive an attestation
    /// 
    /// # Arguments
    /// * `user` - The user instance of the attestee / attester
    /// 
    /// # Returns
    /// * `bool` - True if the attestee is eligible, false otherwise
    fn verify(&self, user: &User, user_attached_sol_account: &AccountInfo) -> bool;
}

impl BaseVerifier for Verifier {

    fn verify(&self, _user: &User, _user_attached_sol_account: &AccountInfo) -> bool {
        match self {
            Verifier::SolBalance => true, // Placeholder implementation
            Verifier::SolMinTx => true,   // Placeholder implementation
            Verifier::SolName => true,    // Placeholder implementation
            Verifier::Twitter => true,    // Placeholder implementation
            Verifier::Email => true,      // Placeholder implementation
            Verifier::Human => true,      // Placeholder implementation
        }
    }
}
