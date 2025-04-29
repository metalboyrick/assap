use crate::{user::User, verifiers::base_verifier::BaseVerifier};
use anchor_lang::prelude::*;    
#[derive(Clone)]
pub struct SolMinTxVerifier;

impl BaseVerifier for SolMinTxVerifier {
    fn verify(&self, user: &User, user_attached_sol_account: &AccountInfo) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // get number of transactions

        // check if the number of transactions is greater than 10

        true
    }
}