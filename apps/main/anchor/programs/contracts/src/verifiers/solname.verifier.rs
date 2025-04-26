use crate::verifiers::base_verifier::BaseVerifier;

pub struct SolNameVerifier;

impl BaseVerifier for SolNameVerifier {
    fn verify(&self, did: &str) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // check whether account has a solname
    }
}