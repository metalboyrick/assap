use crate::verifiers::base_verifier::BaseVerifier;

pub struct SolAgeVerifier;

impl BaseVerifier for SolAgeVerifier {
    fn verify(&self, _did: &str) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // get the time since first activity

        // check if the time since first activity is greater than 1000000000
    
        true
    }
}