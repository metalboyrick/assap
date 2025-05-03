use anchor_lang::prelude::*;

#[event]
pub struct UserCreated {
    pub did: Pubkey,
    pub created_at: u64,
}

#[event]
pub struct UserUpdated {
    pub did: Pubkey,
    pub created_at: u64,
    pub last_active: u64,
    pub sol_account: Pubkey,
    pub twitter_account: bool,
    pub email_account: bool,
    pub human_verification: bool,
    pub sol_name: bool,
    pub data_cid: String,
    pub updated_at: u64,
}

#[account]
#[derive(InitSpace)]
pub struct User {

    pub did: Pubkey,

    pub created_at: u64,
    pub last_active: u64,
    pub sol_account: Pubkey,
    pub twitter_account: bool,
    pub email_account: bool,
    pub human_verification: bool,
    pub sol_name: bool,

    /// points to additional data in IPFS
    /// TODO: might use this for non-solana accounts related data, this might be slightly hard to verify as we need offcain verification that is trustworthy.s
    #[max_len(256)]
    pub data_cid: String,
}

// CHECK: DID will be `payer` for now (Civic Auth), we can use abstracted wallets
#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    // DID will be signer for now, we can use abstracted wallets
    #[account(init, payer = payer, space = 8 + User::INIT_SPACE, seeds = [b"user", payer.key().as_ref()], bump)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.did = ctx.accounts.payer.key();
    user.created_at = Clock::get()?.unix_timestamp as u64;
    user.last_active = Clock::get()?.unix_timestamp as u64;

    // Initialize with default values
    user.sol_account = Pubkey::default();
    user.twitter_account = false;
    user.email_account = false;
    user.human_verification = false;
    user.sol_name = false;
    user.data_cid = String::new();

    emit!(UserCreated {
        did: user.did,
        created_at: user.created_at,
    });
    
    
    Ok(())
}

// CHECK: DIDs will be the embedded wallet address issued by Civic Auth for now.
#[event_cpi]
#[derive(Accounts)]
pub struct UpdateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut, constraint = user.sol_account == payer.key() || user.did == payer.key())]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn update_user(
    ctx: Context<UpdateUser>, 
    sol_account: Option<Pubkey>,
    twitter_account: Option<bool>, 
    email_account: Option<bool>, 
    human_verification: Option<bool>,
    sol_name: Option<bool>
) -> Result<()> {
    let user = &mut ctx.accounts.user;

    if let Some(sol_account) = sol_account {
        user.sol_account = sol_account;
    }

    if let Some(twitter) = twitter_account {
        user.twitter_account = twitter;
    }
    
    if let Some(email) = email_account {
        user.email_account = email;
    }
    
    
    if let Some(human) = human_verification {
        user.human_verification = human;
    }

    if let Some(sol_name) = sol_name {
        user.sol_name = sol_name;
    }
    
    user.last_active = Clock::get()?.unix_timestamp as u64;

    emit_cpi!(UserUpdated {
        did: user.did,
        created_at: user.created_at,
        last_active: user.last_active,
        sol_account: user.sol_account,
        twitter_account: user.twitter_account,
        email_account: user.email_account,
        human_verification: user.human_verification,
        sol_name: user.sol_name,
        data_cid: user.data_cid.clone(),
        updated_at: user.last_active,
    });

    Ok(())
}
