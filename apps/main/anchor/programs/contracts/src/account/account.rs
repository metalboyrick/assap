use anchor_lang::prelude::*;

#[account]
pub struct User {
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
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(init, payer = payer, space = 8 + User::INIT_SPACE)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn create_user(ctx: Context<CreateUser>, did: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.did = did;
    user.created_at = Clock::get()?.unix_timestamp;
    user.last_active = Clock::get()?.unix_timestamp;
    Ok(())
}