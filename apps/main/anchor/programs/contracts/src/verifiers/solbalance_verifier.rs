use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use crate::{user::User, verifiers::base_verifier::BaseVerifier};

#[derive(Clone)]
pub struct SolBalanceVerifier;


impl BaseVerifier for SolBalanceVerifier {
    fn verify(&self, _user: &User, user_attached_sol_account: &AccountInfo) -> bool {

        // get sol balance via lamports
        let balance = user_attached_sol_account.lamports();
        

        // check if the SOL balace is greater than 0.5
        balance > LAMPORTS_PER_SOL / 2
    }
}