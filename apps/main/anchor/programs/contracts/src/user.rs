use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct User {

    pub created_at: u64,
    pub last_active: u64,
    pub sol_account: Pubkey,
    pub twitter_account: Pubkey,
    pub github_account: Pubkey,
    pub website_account: Pubkey,
    pub email_account: Pubkey,
    pub discord_account: Pubkey,
    pub human_verification: bool,

    /// points to additional data in IPFS
    /// TODO: might use this for non-solana accounts related data, this might be slightly hard to verify as we need offcain verification that is trustworthy.s
    #[max_len(256)]
    pub data_cid: String,
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    // DID will be siugner for now, we can use abstracted wallets
    #[account(init, payer = payer, space = 8 + User::INIT_SPACE, seeds = [b"user", payer.key().as_ref()], bump)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.created_at = Clock::get()?.unix_timestamp as u64;
    user.last_active = Clock::get()?.unix_timestamp as u64;
    Ok(())
}