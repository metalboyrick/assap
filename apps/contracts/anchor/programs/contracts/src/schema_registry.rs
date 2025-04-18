use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash::hash;

pub trait StringExt {
    fn to_hashed_bytes(&self) -> [u8; 32];
}

impl StringExt for String {
    fn to_hashed_bytes(&self) -> [u8; 32] {
        let hash = hash(self.as_bytes());
        hash.to_bytes()
    }
}

// Schema Registry account structure
#[account]
#[derive(InitSpace)]
pub struct SchemaRegistry {
    pub uid: u64, //1
    #[max_len(1024)]
    pub schema: String,  // 'string name, number age, boolean is_married'
    #[max_len(1024)]
    pub schema_name: String, // 'Person'
    pub issuer_min_score: u64, // 0.8
    pub issuer_scoring_program: Pubkey, // '6JqPXhYgG92x8ZyZ8ZyZ8ZyZ8ZyZ8ZyZ8ZyZ8Z'
    pub receiver_min_score: u64, // 0.6
    pub receiver_scoring_program: Pubkey, // '6JqPXhYgG92x8ZyZ8ZyZ8ZyZ8ZyZ8ZyZ8ZyZ8Z'
    pub timestamp: u64, // 1713379200
    pub creator: Pubkey, // '6JqPXhYgG92x8ZyZ8ZyZ8ZyZ8ZyZ8ZyZ8ZyZ8Z'
    pub attest_count: u64, // 0
}

// Instruction context for registering a schema
#[derive(Accounts)]
#[instruction(
    schema: String, 
    schema_name: String,
    issuer_min_score: u64, 
    receiver_min_score: u64,
    issuer_scoring_program: Pubkey,
    receiver_scoring_program: Pubkey)]
pub struct RegisterSchema<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    
    #[account(
        init, 
        payer = payer, 
        space = 8 + SchemaRegistry::INIT_SPACE,
        // TODO: incorporate schema name into seeds
        // TODO: possibly need to hash the schema name
        seeds = [b"schema", payer.key().as_ref(), schema.to_hashed_bytes().as_ref()],
        bump
    )]
    pub schema_registry: Account<'info, SchemaRegistry>,
    
    pub system_program: Program<'info, System>,
}

// Implementation of the register_schema instruction
pub fn register_schema(
    ctx: Context<RegisterSchema>, 
    schema: String, 
    schema_name: String,
    issuer_min_score: u64, 
    receiver_min_score: u64,
    issuer_scoring_program: Pubkey,
    receiver_scoring_program: Pubkey,
) -> Result<()> {
    let schema_registry = &mut ctx.accounts.schema_registry;
    let clock = Clock::get()?;

    // Set the other fields
    schema_registry.schema = schema;
    schema_registry.schema_name = schema_name;
    schema_registry.issuer_min_score = issuer_min_score;
    schema_registry.receiver_min_score = receiver_min_score;
    schema_registry.timestamp = clock.unix_timestamp as u64;
    schema_registry.creator = ctx.accounts.payer.key(); 
    schema_registry.issuer_scoring_program = issuer_scoring_program;
    schema_registry.receiver_scoring_program = receiver_scoring_program;

    // Generate a unique ID by hashing the schema, schema_name, and timestamp
    let mut hasher = std::collections::hash_map::DefaultHasher::new();
    use std::hash::{Hash, Hasher};
    
    // Hash the key fields to create a unique identifier
    schema_registry.schema.hash(&mut hasher);
    schema_registry.schema_name.hash(&mut hasher);
    schema_registry.timestamp.hash(&mut hasher);
    schema_registry.issuer_min_score.hash(&mut hasher);
    schema_registry.receiver_min_score.hash(&mut hasher);
    schema_registry.creator.hash(&mut hasher);
    schema_registry.issuer_scoring_program.hash(&mut hasher);
    schema_registry.receiver_scoring_program.hash(&mut hasher);
    
    // Set the UID from the hash
    schema_registry.uid = hasher.finish();

    // Increment the attest count
    schema_registry.attest_count = 0;
    
    Ok(())
}