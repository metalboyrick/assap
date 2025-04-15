#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

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
