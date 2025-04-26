use crate::verifiers::BaseVerifier;

pub struct SolAgeVerifier;

impl BaseVerifier for SolAgeVerifier {
    fn verify(&self, did: &str) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // get the time since first activity

        // check if the time since first activity is greater than 1000000000
    }
}