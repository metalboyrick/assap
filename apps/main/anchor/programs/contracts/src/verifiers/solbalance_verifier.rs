use crate::verifiers::base_verifier::BaseVerifier;

#[derive(Clone)]
pub struct SolBalanceVerifier;

impl BaseVerifier for SolBalanceVerifier {
    fn verify(&self, _did: &str) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // get the time since first activity

        // check if the SOL balace is greater than 0.5

        true
    }
}