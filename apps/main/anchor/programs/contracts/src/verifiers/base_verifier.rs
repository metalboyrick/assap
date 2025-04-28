use crate::user::User;

/// Enum of all possible verifiers
#[derive(Clone)]
pub enum Verifier {
    SolBalance,
    SolMinTx,
    SolName,
    SolAge,
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
    fn verify(&self, user: &User) -> bool;
}

impl BaseVerifier for Verifier {

    fn verify(&self, _user: &User) -> bool {
        match self {
            Verifier::SolBalance => true, // Placeholder implementation
            Verifier::SolMinTx => true,   // Placeholder implementation
            Verifier::SolName => true,    // Placeholder implementation
            Verifier::SolAge => true,     // Placeholder implementation
        }
    }
}
