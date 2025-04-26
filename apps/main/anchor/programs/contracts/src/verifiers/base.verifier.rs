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
