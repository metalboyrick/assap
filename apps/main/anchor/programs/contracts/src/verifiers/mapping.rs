use std::collections::HashMap;
use crate::{user::User, verifiers::base_verifier::{BaseVerifier, Verifier}};
use anchor_lang::prelude::*;

pub struct VerifierMapping {
    verifiers: HashMap<String, Verifier>,
}

impl VerifierMapping {
    pub fn new() -> Self {
        let mut verifiers = HashMap::new();
        
        // Register all verifiers
        verifiers.insert("sol_balance".to_string(), Verifier::SolBalance);
        verifiers.insert("sol_min_tx".to_string(), Verifier::SolMinTx);
        verifiers.insert("sol_name".to_string(), Verifier::SolName);
        verifiers.insert("sol_age".to_string(), Verifier::SolAge);
        
        Self { verifiers }
    }
    
    pub fn get_verifier(&self, name: &str) -> Option<&Verifier> {
        self.verifiers.get(name)
    }
    
    #[allow(dead_code)]
    pub fn verify(&self, name: &str, user: &User, user_attached_sol_account: &AccountInfo) -> bool {
        match self.get_verifier(name) {
            Some(verifier) => verifier.verify(user, user_attached_sol_account),
            None => false,
        }
    }
}
