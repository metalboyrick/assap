use anchor_lang::prelude::*;
use crate::{user::User, verifiers::base_verifier::BaseVerifier};

#[derive(Clone)]
pub struct SolNameVerifier;

impl BaseVerifier for SolNameVerifier {
    fn verify(&self, user: &User, user_attached_sol_account: &AccountInfo) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // check whether account has a solname

        true
    }
}