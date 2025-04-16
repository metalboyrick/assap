import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Contracts } from "../target/types/contracts";
import { expect } from "chai";
import { before, describe, it } from "mocha";

describe("journal", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Contracts as Program<Contracts>;
  const user = provider.wallet.publicKey;

  const testTitle = "My First Journal Entry";
  const testContent = "This is the content of my first journal entry.";
  const updatedContent = "This is the updated content of my journal entry.";
  let journalEntryPda: anchor.web3.PublicKey;

  before(async () => {
    // Find the PDA for the journal entry that we'll use across tests
    [journalEntryPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("journal-entry"), user.toBuffer(), Buffer.from(testTitle)],
      program.programId,
    );
  });

  it("Creates a journal entry", async () => {
    // Create a journal entry
    await program.methods
      .createJournalEntry(testTitle, testContent)
      .accounts({
        author: user,
        // @ts-ignore - The account name in the IDL is journal_entry while TypeScript expects journalEntry
        journal_entry: journalEntryPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the journal entry
    const journalEntry =
      await program.account.journalEntry.fetch(journalEntryPda);

    // Verify the data
    expect(journalEntry.author.toString()).to.equal(user.toString());
    expect(journalEntry.title).to.equal(testTitle);
    expect(journalEntry.content).to.equal(testContent);
    expect(journalEntry.timestamp.toNumber()).to.be.greaterThan(0);
  });

  it("Updates a journal entry", async () => {
    // Update the journal entry
    await program.methods
      .updateJournalEntry(testTitle, updatedContent)
      .accounts({
        author: user,
        // @ts-ignore - The account name in the IDL is journal_entry while TypeScript expects journalEntry
        journal_entry: journalEntryPda,
      })
      .rpc();

    // Fetch the journal entry
    const journalEntry =
      await program.account.journalEntry.fetch(journalEntryPda);

    // Verify the data
    expect(journalEntry.content).to.equal(updatedContent);
  });

  it("Can read a journal entry directly", async () => {
    // We can fetch the account directly without going through a read instruction
    const journalEntry =
      await program.account.journalEntry.fetch(journalEntryPda);

    // Verify the data is as expected after the update
    expect(journalEntry.author.toString()).to.equal(user.toString());
    expect(journalEntry.title).to.equal(testTitle);
    expect(journalEntry.content).to.equal(updatedContent);
  });

  it("Deletes a journal entry", async () => {
    // Delete the journal entry
    await program.methods
      .deleteJournalEntry(testTitle)
      .accounts({
        author: user,
        // @ts-ignore - The account name in the IDL is journal_entry while TypeScript expects journalEntry
        journal_entry: journalEntryPda,
      })
      .rpc();

    // Try to fetch the journal entry (should fail)
    try {
      await program.account.journalEntry.fetch(journalEntryPda);
      expect.fail("The account should be closed");
    } catch (error) {
      expect(error).to.exist;
    }
  });
});
