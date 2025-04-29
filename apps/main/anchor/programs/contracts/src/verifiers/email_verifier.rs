use anchor_lang::prelude::*;
use crate::{user::User, verifiers::base_verifier::BaseVerifier};

#[derive(Clone)]
pub struct EmailVerifier;
impl BaseVerifier for EmailVerifier {
    fn verify(&self, user: &User, _user_attached_sol_account: &AccountInfo) -> bool {
        user.email_account
    }
}
