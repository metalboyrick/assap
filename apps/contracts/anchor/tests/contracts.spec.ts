import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Contracts } from '../target/types/contracts'

describe('contracts', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Contracts as Program<Contracts>

  const contractsKeypair = Keypair.generate()

  it('Initialize Contracts', async () => {
    await program.methods
      .initialize()
      .accounts({
        contracts: contractsKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([contractsKeypair])
      .rpc()

    const currentCount = await program.account.contracts.fetch(contractsKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Contracts', async () => {
    await program.methods.increment().accounts({ contracts: contractsKeypair.publicKey }).rpc()

    const currentCount = await program.account.contracts.fetch(contractsKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Contracts Again', async () => {
    await program.methods.increment().accounts({ contracts: contractsKeypair.publicKey }).rpc()

    const currentCount = await program.account.contracts.fetch(contractsKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Contracts', async () => {
    await program.methods.decrement().accounts({ contracts: contractsKeypair.publicKey }).rpc()

    const currentCount = await program.account.contracts.fetch(contractsKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set contracts value', async () => {
    await program.methods.set(42).accounts({ contracts: contractsKeypair.publicKey }).rpc()

    const currentCount = await program.account.contracts.fetch(contractsKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the contracts account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        contracts: contractsKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.contracts.fetchNullable(contractsKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
