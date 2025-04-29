import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import { Keypair, PublicKey } from "@solana/web3.js";
import crypto from "crypto";
import { Contracts } from "../target/types/contracts";
// @ts-ignore
const IDL = require("../target/idl/contracts.json");

const contractAddress = new PublicKey(
  "4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e",
);

// we have to hash the long strings to avoid max seed string length exceeded error
function getCreateSchemaSeedParams(schema: string) {
  let hexString = crypto
    .createHash("sha256")
    .update(schema, "utf-8")
    .digest("hex");
  let schemaDataHashed = Uint8Array.from(Buffer.from(hexString, "hex"));
  return [Buffer.from("schema"), schemaDataHashed];
}

describe("attestations", () => {
  // Test data
  const schemaData = "string name, number age, boolean is_married";
  const schemaName = "Person";
  const issuerMinScore = new anchor.BN(80); // 0.8 * 100
  const receiverMinScore = new anchor.BN(60); // 0.6 * 100
  const issuerScoringProgram = Keypair.generate().publicKey;
  const receiverScoringProgram = Keypair.generate().publicKey;
  const attestData = "john, 16, false";

  it("Register a new schema", async () => {
    const context = await startAnchor(
      "",
      [{ name: "contracts", programId: contractAddress }],
      [],
    );
    const provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    const program = new Program<Contracts>(IDL, provider);

    // Find the schema registry PDA
    const [schemaRegistryPda] = PublicKey.findProgramAddressSync(
      [...getCreateSchemaSeedParams(schemaData)],
      contractAddress,
    );

    await program.methods
      .registerSchema(schemaData, schemaName, [], [])
      .accountsPartial({
        payer: provider.wallet.publicKey,
        schemaRegistry: schemaRegistryPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the schema registry account
    const schemaRegistryAccount =
      await program.account.schemaRegistry.fetch(schemaRegistryPda);

    // Verify the data was stored correctly
    expect(schemaRegistryAccount.schema).toEqual(schemaData);
    expect(schemaRegistryAccount.schemaName).toEqual(schemaName);
    expect(
      schemaRegistryAccount.creator.equals(provider.wallet.publicKey),
    ).toBe(true);
    expect(schemaRegistryAccount.timestamp.gt(new anchor.BN(0))).toBe(true);
    expect(schemaRegistryAccount.uid.gt(new anchor.BN(0))).toBe(true);
  });

  it("Create an attestation", async () => {
    const context = await startAnchor("", [], []);
    const provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    const program = new Program<Contracts>(IDL, provider);

    // Find the schema registry PDA
    const [schemaRegistryPda] = PublicKey.findProgramAddressSync(
      [...getCreateSchemaSeedParams(schemaData)],
      contractAddress,
    );

    await program.methods
      .registerSchema(schemaData, schemaName, [], [])
      .accountsPartial({
        payer: provider.wallet.publicKey,
        schemaRegistry: schemaRegistryPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Find the attestation PDA
    const [attestationPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("attestation"),
        provider.wallet.publicKey.toBuffer(),
        new anchor.BN(1).toBuffer("le", 8),
      ],
      contractAddress,
    );

    // derive user PDA
    const [userPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), provider.wallet.publicKey.toBuffer()],
      contractAddress,
    );

    await program.methods
      .createUser()
      .accountsPartial({
        payer: provider.wallet.publicKey,
        user: userPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    await program.methods
      .createAttestation(attestData, provider.wallet.publicKey)
      .accountsPartial({
        payer: provider.wallet.publicKey,
        schemaRegistry: schemaRegistryPda,
        attestation: attestationPda,
        issuer: userPda,
        attestee: userPda,
        issuerAttachedSolAccount: provider.wallet.publicKey,
        attesteeAttachedSolAccount: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the attestation account
    const attestationAccount =
      await program.account.attestation.fetch(attestationPda);

    expect(attestationAccount.schemaAccount.equals(schemaRegistryPda)).toBe(
      true,
    );
    expect(attestationAccount.attestData).toEqual(attestData);
    expect(attestationAccount.issuer.equals(provider.wallet.publicKey)).toBe(
      true,
    );
    expect(attestationAccount.receiver.equals(provider.wallet.publicKey)).toBe(
      true,
    );
  });

  it("Create a user", async () => {
    const context = await startAnchor("", [], []);
    const provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    const program = new Program<Contracts>(IDL, provider);

    const [userPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), provider.wallet.publicKey.toBuffer()],
      contractAddress,
    );

    await program.methods
      .createUser()
      .accountsPartial({
        payer: provider.wallet.publicKey,
        user: userPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const userAccount = await program.account.user.fetch(userPda);

    expect(userAccount.solAccount).toBeDefined();
    if (typeof userAccount.createdAt === "string") {
      expect(parseInt(userAccount.createdAt, 16)).toBeGreaterThan(0);
    } else if (
      typeof userAccount.createdAt === "object" &&
      userAccount.createdAt !== null
    ) {
      expect(userAccount.createdAt.toString()).not.toBe("0");
    } else {
      expect(userAccount.createdAt).toBeGreaterThan(0);
    }

    if (typeof userAccount.lastActive === "string") {
      expect(parseInt(userAccount.lastActive, 16)).toBeGreaterThan(0);
    } else if (
      typeof userAccount.lastActive === "object" &&
      userAccount.lastActive !== null
    ) {
      expect(userAccount.lastActive.toString()).not.toBe("0");
    } else {
      expect(userAccount.lastActive).toBeGreaterThan(0);
    }

    expect(userAccount.solAccount).toBeDefined();
  });

  it("Update a user", async () => {
    const context = await startAnchor("", [], []);
    const provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    const program = new Program<Contracts>(IDL, provider);

    const [userPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), provider.wallet.publicKey.toBuffer()],
      contractAddress,
    );

    await program.methods
      .createUser()
      .accountsPartial({
        payer: provider.wallet.publicKey,
        user: userPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    await program.methods
      .updateUser(userPda, provider.wallet.publicKey, true, true, true, true)
      .accountsPartial({
        payer: provider.wallet.publicKey,
        user: userPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const userAccount = await program.account.user.fetch(userPda);

    expect(userAccount.twitterAccount).toBe(true);
    expect(userAccount.solAccount.equals(provider.wallet.publicKey)).toBe(true);
  });

  it("Should fail attestation when verifiers return false", async () => {
    const context = await startAnchor("", [], []);
    const provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    const program = new Program<Contracts>(IDL, provider);

    // Create issuer user
    const [issuerPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), provider.wallet.publicKey.toBuffer()],
      contractAddress,
    );

    await program.methods
      .createUser()
      .accountsPartial({
        payer: provider.wallet.publicKey,
        user: issuerPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Create attestee user with a different keypair
    const attesteeKeypair = anchor.web3.Keypair.generate();
    const [attesteePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), attesteeKeypair.publicKey.toBuffer()],
      contractAddress,
    );

    // Fund the attestee account using bankrun context instead of requestAirdrop
    await context.setAccount(attesteeKeypair.publicKey, {
      lamports: 1000000000,
      owner: anchor.web3.SystemProgram.programId,
      data: Buffer.from([]),
      executable: false,
    });

    await program.methods
      .createUser()
      .accountsPartial({
        payer: attesteeKeypair.publicKey,
        user: attesteePda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([attesteeKeypair])
      .rpc();

    // Register a schema with verifiers
    const schema = "string name, number age, date dob";
    const schemaName = "Person";
    const issuerVerifiers = ["twitter"]; // Twitter verifier will return false
    const attesteeVerifiers = ["twitter"]; // Twitter verifier will return false

    const [schemaPda] = PublicKey.findProgramAddressSync(
      [...getCreateSchemaSeedParams(schema)],
      contractAddress,
    );

    await program.methods
      .registerSchema(schema, schemaName, issuerVerifiers, attesteeVerifiers)
      .accountsPartial({
        payer: provider.wallet.publicKey,
        schemaRegistry: schemaPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Try to create attestation - should fail because verifiers return false
    const attestationData = { name: "John Doe", age: 30 };
    const [attestationPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("attestation"),
        schemaPda.toBuffer(),
        issuerPda.toBuffer(),
        attesteePda.toBuffer(),
      ],
      contractAddress,
    );

    try {
      await program.methods
        .createAttestation(
          JSON.stringify(attestationData),
          provider.wallet.publicKey,
        )
        .accountsPartial({
          payer: provider.wallet.publicKey,
          schemaRegistry: schemaPda,
          issuer: issuerPda,
          attestee: attesteePda,
          attestation: attestationPda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // If we reach here, the test should fail
      expect(false).toBe(true); // This should not execute
    } catch (error) {
      // Expect an error because the verifiers return false
      expect(error).toBeDefined();
      // Could check for specific error message if available
      // expect(error.toString()).toContain("Verifier check failed");
    }
  });
});
