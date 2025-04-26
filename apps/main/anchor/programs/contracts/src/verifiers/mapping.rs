use std::collections::HashMap;
use crate::verifiers::base_verifier::BaseVerifier;
use crate::verifiers::solbalance::verifier::SolBalanceVerifier;
use crate::verifiers::solmintx::verifier::SolMinTxVerifier;
use crate::verifiers::solname::verifier::SolNameVerifier;

pub struct VerifierMapping {
    verifiers: HashMap<String, Box<dyn BaseVerifier>>,
}

impl VerifierMapping {
    pub fn new() -> Self {
        let mut verifiers = HashMap::new();
        
        // Register all verifiers
        verifiers.insert("sol_balance".to_string(), Box::new(SolBalanceVerifier) as Box<dyn BaseVerifier>);
        verifiers.insert("sol_min_tx".to_string(), Box::new(SolMinTxVerifier) as Box<dyn BaseVerifier>);
        verifiers.insert("sol_name".to_string(), Box::new(SolNameVerifier) as Box<dyn BaseVerifier>);
        
        Self { verifiers }
    }
    
    pub fn get_verifier(&self, name: &str) -> Option<&Box<dyn BaseVerifier>> {
        self.verifiers.get(name)
    }
    
    pub fn verify(&self, name: &str, did: &str) -> bool {
        match self.get_verifier(name) {
            Some(verifier) => verifier.verify(did),
            None => false,
        }
    }
}
