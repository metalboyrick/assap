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
function getCreateSchemaSeedParams(signer: PublicKey, schema: string) {
  let hexString = crypto
    .createHash("sha256")
    .update(schema, "utf-8")
    .digest("hex");
  let schemaDataHashed = Uint8Array.from(Buffer.from(hexString, "hex"));
  return [Buffer.from("schema"), signer.toBuffer(), schemaDataHashed];
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
      [...getCreateSchemaSeedParams(provider.wallet.publicKey, schemaData)],
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
      [...getCreateSchemaSeedParams(provider.wallet.publicKey, schemaData)],
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

    await program.methods
      .createAttestation(
        schemaRegistryPda,
        attestData,
        provider.wallet.publicKey,
      )
      .accountsPartial({
        payer: provider.wallet.publicKey,
        schemaRegistry: schemaRegistryPda,
        attestation: attestationPda,
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
      [Buffer.from("user"), Buffer.from("testdid")],
      contractAddress,
    );

    await program.methods
      .createUser("testdid")
      .accountsPartial({
        payer: provider.wallet.publicKey,
        user: userPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const userAccount = await program.account.user.fetch(userPda);

    expect(userAccount.did).toEqual("testdid");
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
});
