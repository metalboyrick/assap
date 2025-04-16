use anchor_lang::prelude::*;
// ^ Imports all necessary Anchor modules and traits
// Solidity equivalent: import statements like "import "@openzeppelin/contracts/..."

// Define the journal entry structure - similar to a struct in Solidity 
#[account] // Marks this struct as an account that can be stored on-chain - no direct Solidity equivalent
#[derive(InitSpace)] // Auto-calculates space required - in Solidity, storage doesn't need explicit sizing
pub struct JournalEntry {
    pub author: Pubkey, // Author's public key - similar to "address author" in Solidity
    #[max_len(100)] // Sets max length - Solidity strings don't need explicit sizing
    pub title: String, // Title string - "string public title" in Solidity
    #[max_len(500)] // Sets max length - Solidity strings don't need explicit sizing
    pub content: String, // Content string - "string public content" in Solidity
    pub timestamp: i64, // Timestamp - "uint256 timestamp" in Solidity
    // Adding a bump for PDA derivation - no Solidity equivalent (Solana-specific)
    pub bump: u8,
}

// Context for creating a journal entry - in Solidity, this would just be function parameters
#[derive(Accounts)]
#[instruction(title: String, content: String)]
pub struct CreateJournalEntry<'info> {
    #[account(mut)]
    pub author: Signer<'info>, // Transaction signer - "msg.sender" in Solidity
    
    #[account(
        init, // Initialize new account - in Solidity, would create struct in storage
        payer = author, // Author pays for account - in Ethereum, caller pays gas but not storage directly
        space = 8 + JournalEntry::INIT_SPACE, // Allocate space - no Solidity equivalent
        seeds = [ // Program Derived Address seeds from which addresses would be created - similar to using keccak256 for deterministic addresses
            b"journal-entry", 
            author.key().as_ref(),
            title.as_bytes(),
        ],
        bump // Bump to ensure PDA is off curve - no direct Solidity equivalent
    )]
    pub journal_entry: Account<'info, JournalEntry>, // The account to create
    
    pub system_program: Program<'info, System>, // System program reference - no Solidity equivalent needed
}

// Context for updating a journal entry
#[derive(Accounts)]
#[instruction(title: String, new_content: String)]
pub struct UpdateJournalEntry<'info> {
    #[account(mut)]
    pub author: Signer<'info>, // Transaction signer - "msg.sender" in Solidity
    
    #[account(
        mut, // Mark as mutable - in Solidity, state is automatically mutable
        seeds = [ // Seeds to find the right PDA - in Solidity, would use mapping key
            b"journal-entry",
            author.key().as_ref(),
            title.as_bytes(),
        ],
        bump = journal_entry.bump, // Use stored bump - no direct Solidity equivalent
        constraint = journal_entry.author == author.key() @ ErrorCode::NotAuthorized // Auth check
        // Solidity: require(entry.author == msg.sender, "Not authorized");
    )]
    pub journal_entry: Account<'info, JournalEntry>, // The account to update
}

// Context for reading a journal entry
// In Solidity, view functions don't need special contexts
#[derive(Accounts)]
pub struct ReadJournalEntry<'info> {
    // The account can be fetched directly - in Solidity, would just read from mapping
    pub journal_entry: Account<'info, JournalEntry>,
}

// Context for deleting a journal entry
#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteJournalEntry<'info> {
    #[account(mut)]
    pub author: Signer<'info>, // Transaction signer - "msg.sender" in Solidity
    
    #[account(
        mut,
        seeds = [
            b"journal-entry",
            author.key().as_ref(),
            title.as_bytes(),
        ],
        bump = journal_entry.bump,
        constraint = journal_entry.author == author.key() @ ErrorCode::NotAuthorized, // Auth check
        close = author // Close account and return funds - similar to selfdestruct(payable(msg.sender))
    )]
    pub journal_entry: Account<'info, JournalEntry>, // The account to delete
}

// Error codes for the journal program
// Solidity equivalent: custom errors or revert strings
#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action")]
    NotAuthorized, // Solidity: error NotAuthorized();
    #[msg("Title cannot be empty")]
    EmptyTitle, // Solidity: error EmptyTitle();
    #[msg("Content cannot be empty")]
    EmptyContent, // Solidity: error EmptyContent();
}

// Function to create a journal entry
pub fn create_journal_entry(
    ctx: Context<CreateJournalEntry>,
    title: String,
    content: String,
) -> Result<()> {
    // Validate inputs - similar to require() in Solidity
    require!(!title.is_empty(), ErrorCode::EmptyTitle); // Solidity: require(bytes(title).length > 0, "Title empty");
    require!(!content.is_empty(), ErrorCode::EmptyContent);

    let journal_entry = &mut ctx.accounts.journal_entry; // Get a mutable reference
    journal_entry.author = ctx.accounts.author.key(); // Set author - Solidity: entry.author = msg.sender;
    journal_entry.title = title; // Set title
    journal_entry.content = content; // Set content
    journal_entry.timestamp = Clock::get()?.unix_timestamp; // Current time - Solidity: block.timestamp
    journal_entry.bump = ctx.bumps.journal_entry; // Store bump for future use - no Solidity equivalent

    Ok(()) // Return success - in Solidity this would be implicit
}

// Function to update a journal entry
pub fn update_journal_entry(
    ctx: Context<UpdateJournalEntry>,
    _title: String, // Used in the constraints but not here
    new_content: String,
) -> Result<()> {
    // Validate input
    require!(!new_content.is_empty(), ErrorCode::EmptyContent);

    let journal_entry = &mut ctx.accounts.journal_entry; // Get a mutable reference
    journal_entry.content = new_content; // Update content
    journal_entry.timestamp = Clock::get()?.unix_timestamp; // Update timestamp

    Ok(())
}

// Function to delete a journal entry
pub fn delete_journal_entry(_ctx: Context<DeleteJournalEntry>, _title: String) -> Result<()> {
    // No need to do anything here as the account will be closed automatically by the constraint
    // In Solidity: delete journalEntries[id]; or selfdestruct(payable(msg.sender));
    Ok(())
}