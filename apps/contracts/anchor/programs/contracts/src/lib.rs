#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

mod journal;
use journal::*;

declare_id!("4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e");

#[program]
pub mod contracts {
    use super::*;

  pub fn close(_ctx: Context<CloseContracts>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.contracts.count = ctx.accounts.contracts.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.contracts.count = ctx.accounts.contracts.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeContracts>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.contracts.count = value.clone();
    Ok(())
  }

  // Journal entry functions
  pub fn create_journal_entry(
    ctx: Context<CreateJournalEntry>,
    title: String,
    content: String,
  ) -> Result<()> {
    journal::create_journal_entry(ctx, title, content)
  }

  pub fn update_journal_entry(
    ctx: Context<UpdateJournalEntry>,
    title: String,
    new_content: String,
  ) -> Result<()> {
    journal::update_journal_entry(ctx, title, new_content)
  }

  pub fn delete_journal_entry(
    ctx: Context<DeleteJournalEntry>,
    title: String,
  ) -> Result<()> {
    journal::delete_journal_entry(ctx, title)
  }
}

#[derive(Accounts)]
pub struct InitializeContracts<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Contracts::INIT_SPACE,
  payer = payer
  )]
  pub contracts: Account<'info, Contracts>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseContracts<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub contracts: Account<'info, Contracts>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub contracts: Account<'info, Contracts>,
}

#[account]
#[derive(InitSpace)]
pub struct Contracts {
  count: u8,
}
