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
    /// * `did` - The decentralized identifier of the attestee
    /// 
    /// # Returns
    /// * `bool` - True if the attestee is eligible, false otherwise
    fn verify(&self, did: &str) -> bool;
}

impl BaseVerifier for Verifier {

    // TODO: instead of passing DID in, we should look to directly pass the User instance from the user.rs in directly.
    fn verify(&self, _did: &str) -> bool {
        match self {
            Verifier::SolBalance => true, // Placeholder implementation
            Verifier::SolMinTx => true,   // Placeholder implementation
            Verifier::SolName => true,    // Placeholder implementation
            Verifier::SolAge => true,     // Placeholder implementation
        }
    }
}
