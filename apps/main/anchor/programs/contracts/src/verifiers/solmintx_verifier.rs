use crate::verifiers::base_verifier::BaseVerifier;

#[derive(Clone)]
pub struct SolMinTxVerifier;

impl BaseVerifier for SolMinTxVerifier {
    fn verify(&self, _did: &str) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // get number of transactions

        // check if the number of transactions is greater than 10

        true
    }
}