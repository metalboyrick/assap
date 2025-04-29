use anchor_lang::prelude::*;
use crate::{user::User, verifiers::base_verifier::BaseVerifier};

#[derive(Clone)]
pub struct TwitterVerifier;
impl BaseVerifier for TwitterVerifier {
    fn verify(&self, user: &User, _user_attached_sol_account: &AccountInfo) -> bool {
        user.twitter_account
    }
}
