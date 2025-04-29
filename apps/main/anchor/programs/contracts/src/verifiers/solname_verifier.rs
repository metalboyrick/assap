use anchor_lang::prelude::*;
use crate::{user::User, verifiers::base_verifier::BaseVerifier};

#[derive(Clone)]
pub struct SolNameVerifier;
impl BaseVerifier for SolNameVerifier {
    fn verify(&self, user: &User, _user_attached_sol_account: &AccountInfo) -> bool {
        user.sol_name
    }
}