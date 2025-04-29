use crate::{user::User, verifiers::base_verifier::BaseVerifier};
use anchor_lang::prelude::*;    

#[derive(Clone)]
pub struct SolMinTxVerifier;

impl BaseVerifier for SolMinTxVerifier {
    fn verify(&self, _user: &User, user_attached_sol_account: &AccountInfo) -> bool {
        // We can't directly get the transaction count on-chain
        // Instead, we'll check if the data size of the account is large enough
        // This is a heuristic: accounts with more transactions tend to have more data
        
        // Get the data size of the account
        let data_len = user_attached_sol_account.data_len();
        
        // Check if the account has been used enough
        // Accounts with more activity typically have larger data
        // This is an approximation - in a real implementation, you might
        // want to use a more accurate method or an oracle
        
        // For now, we'll use a simple heuristic:
        // Accounts with data size > 128 bytes likely have had multiple transactions
        data_len > 128
        
        // Note: For a production implementation, you would need to:
        // 1. Use an oracle or off-chain service to get actual transaction count
        // 2. Or implement a more sophisticated on-chain heuristic
        // 3. Or track transaction count in the User account itself
    }
}