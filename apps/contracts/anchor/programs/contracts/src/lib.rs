#![allow(clippy::result_large_err)] // Compiler directive to allow large error types in Result

use anchor_lang::prelude::*; // Import Anchor framework features (similar to Solidity imports)

mod journal; // Import the journal module from a separate file (similar to importing another contract in Solidity)
use journal::*; // Import all items from journal module

declare_id!("4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e"); // Program ID on Solana (similar to contract address in Ethereum)

#[program] // Marks this module as containing instruction handlers (similar to public functions in Solidity)
pub mod contracts {
    use super::*;

  pub fn close(_ctx: Context<CloseContracts>) -> Result<()> {
    // Close the contract account and return funds (similar to selfdestruct in Solidity)
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    // Decrement counter with checked math (in Solidity: count = count - 1 with SafeMath)
    ctx.accounts.contracts.count = ctx.accounts.contracts.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    // Increment counter with checked math (in Solidity: count = count + 1 with SafeMath)
    ctx.accounts.contracts.count = ctx.accounts.contracts.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeContracts>) -> Result<()> {
    // Initialize the contract (similar to a Solidity constructor)
    // Account initialization happens in the #[account] attribute
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    // Set counter to specific value (in Solidity: count = value)
    // The clone() call is unnecessary but harmless (u8 implements Copy)
    ctx.accounts.contracts.count = value.clone();
    Ok(())
  }

  // Journal entry functions - these delegate to the journal module
  pub fn create_journal_entry(
    ctx: Context<CreateJournalEntry>,
    title: String,
    content: String,
  ) -> Result<()> {
    // Create a journal entry (in Solidity: mappings or arrays to store structs)
    journal::create_journal_entry(ctx, title, content)
  }

  pub fn update_journal_entry(
    ctx: Context<UpdateJournalEntry>,
    title: String,
    new_content: String,
  ) -> Result<()> {
    // Update a journal entry (in Solidity: update a struct in a mapping)
    journal::update_journal_entry(ctx, title, new_content)
  }

  pub fn delete_journal_entry(
    ctx: Context<DeleteJournalEntry>,
    title: String,
  ) -> Result<()> {
    // Delete a journal entry (in Solidity: delete mapping[key])
    journal::delete_journal_entry(ctx, title)
  }
}

#[derive(Accounts)] // Account validation struct for initialize instruction
pub struct InitializeContracts<'info> {
  #[account(mut)] // Account that can be modified
  pub payer: Signer<'info>, // Transaction signer (equivalent to msg.sender in Solidity)

  #[account(
  init, // Initialize a new account (no direct Solidity equivalent - storage is implicit)
  space = 8 + Contracts::INIT_SPACE, // Allocate space (8 bytes discriminator + data)
  payer = payer // Specify who pays for account creation (no Solidity equivalent - in Ethereum gas covers this)
  )]
  pub contracts: Account<'info, Contracts>, // The account storing our data
  pub system_program: Program<'info, System>, // Reference to system program (no Solidity equivalent)
}

#[derive(Accounts)] // Account validation struct for close instruction
pub struct CloseContracts<'info> {
  #[account(mut)]
  pub payer: Signer<'info>, // Transaction signer who receives refunded lamports

  #[account(
  mut,
  close = payer, // Close account and return lamports to payer (similar to selfdestruct(payable(address)) in Solidity)
  )]
  pub contracts: Account<'info, Contracts>, // The account to close
}

#[derive(Accounts)] // Account validation struct for update instructions
pub struct Update<'info> {
  #[account(mut)]
  pub contracts: Account<'info, Contracts>, // The account to update (in Solidity, state variables are updated directly)
}

#[account] // Marks this struct as an account data structure
#[derive(InitSpace)] // Automatically calculates required space for account
pub struct Contracts {
  count: u8, // State variable storing a counter (uint8 in Solidity)
}
