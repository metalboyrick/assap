use crate::{user::User, verifiers::base_verifier::BaseVerifier};
use anchor_lang::prelude::*;

pub struct SolAgeVerifier;

impl BaseVerifier for SolAgeVerifier {
    fn verify(&self, user: &User, user_attached_sol_account: &AccountInfo) -> bool {
        // get the user instance (account.rs) from the did

        // get the sol account

        // get the time since first activity

        // check if the time since first activity is greater than 1000000000
    
        true
    }
}