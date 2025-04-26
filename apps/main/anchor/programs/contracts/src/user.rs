use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct User {
    #[max_len(256)]
    pub did: String,
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
    #[max_len(256)]
    pub data_cid: String,
}

#[derive(Accounts)]
#[instruction(did: String)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(init, payer = payer, space = 8 + User::INIT_SPACE, seeds = [b"user", did.as_bytes()], bump)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn create_user(ctx: Context<CreateUser>, did: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.did = did;
    user.created_at = Clock::get()?.unix_timestamp as u64;
    user.last_active = Clock::get()?.unix_timestamp as u64;
    Ok(())
}