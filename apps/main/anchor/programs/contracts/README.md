# ASSAP Contract Documentation

## Overview

ASSAP (Anti-Sybil Attestation Protocol) is a Solana-based protocol for creating and managing attestations. This documentation is designed to help front-end engineers integrate with the ASSAP smart contracts.

## Program ID (This will change from time to time)

```
coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF
```

## Smart Contract Modules

The ASSAP protocol consists of two main modules:

1. **Schema Registry** - Defines and stores schemas for attestations
2. **Attestations** - Creates and manages attestations based on registered schemas

## Schema Registry

### Description

The Schema Registry allows users to register schemas that define the structure of attestations. Each schema includes validation requirements for both issuers and receivers.

### Account Structure

```rust
pub struct SchemaRegistry {
    pub uid: u64,                          // Unique identifier for the schema
    pub schema: String,                    // Schema definition (e.g., 'string name, number age')
    pub schema_name: String,               // Name of the schema (e.g., 'Person')
    pub issuer_min_score: u64,             // Minimum trust score required for issuers
    pub issuer_scoring_program: Pubkey,    // Program that validates issuer scores
    pub receiver_min_score: u64,           // Minimum trust score required for receivers
    pub receiver_scoring_program: Pubkey,  // Program that validates receiver scores
    pub timestamp: u64,                    // Creation timestamp
    pub creator: Pubkey,                   // Creator of the schema
    pub attest_count: u64,                 // Count of attestations using this schema
}
```

### Function: Register Schema

Registers a new schema in the protocol.

#### Parameters

| Parameter                | Type   | Description                                   |
| ------------------------ | ------ | --------------------------------------------- |
| schema                   | String | Schema definition string                      |
| schema_name              | String | Human-readable name for the schema            |
| issuer_min_score         | u64    | Minimum trust score issuers must have         |
| receiver_min_score       | u64    | Minimum trust score receivers must have       |
| issuer_scoring_program   | Pubkey | Program address that verifies issuer scores   |
| receiver_scoring_program | Pubkey | Program address that verifies receiver scores |

#### Required Accounts

| Account         | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| payer           | Signer  | User paying for the transaction and creating the schema |
| schema_registry | Account | PDA that will store the schema information              |
| system_program  | Program | Solana System Program                                   |

#### PDA Seed Derivation

The Schema Registry account is a PDA (Program Derived Address) derived using:

```javascript
// JavaScript implementation
import { PublicKey } from "@solana/web3.js";
import { createHash } from "crypto";

function getSchemaRegistryPDA(programId, payer, schema) {
  // Hash the schema string
  const schemaHash = createHash("sha256").update(schema).digest();

  // Find PDA
  const [pda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("schema"), payer.toBuffer(), schemaHash],
    programId,
  );

  return { pda, bump };
}
```

## Attestations

### Description

Attestations are statements made by issuers about receivers according to a specific schema.

### Account Structure

```rust
pub struct Attestation {
    pub uid: u64,                 // Unique identifier for the attestation
    pub schema_account: Pubkey,   // Reference to the schema this attestation follows
    pub issuer: Pubkey,           // Account that issued the attestation
    pub receiver: Pubkey,         // Account that received the attestation
    pub timestamp: u64,           // Creation timestamp
    pub attest_data: String,      // Attestation data (must conform to schema)
    pub attest_index: u64,        // Index of this attestation within the schema
}
```

### Function: Create Attestation

Creates a new attestation following a registered schema.

#### Parameters

| Parameter      | Type   | Description                                     |
| -------------- | ------ | ----------------------------------------------- |
| schema_account | Pubkey | Public key of the schema registry account       |
| attest_data    | String | Attestation data that follows the schema format |
| receiver       | Pubkey | Public key of the attestation receiver          |

#### Required Accounts

| Account         | Type    | Description                                                 |
| --------------- | ------- | ----------------------------------------------------------- |
| payer           | Signer  | User paying for the transaction and issuing the attestation |
| schema_registry | Account | The schema account this attestation follows                 |
| attestation     | Account | PDA that will store the attestation information             |
| system_program  | Program | Solana System Program                                       |

#### PDA Seed Derivation

The Attestation account is a PDA (Program Derived Address) derived using:

```javascript
// JavaScript implementation
import { PublicKey } from "@solana/web3.js";

function getAttestationPDA(programId, payer, attestCount) {
  // Convert attestCount + 1 to a little-endian byte array
  const countBuffer = Buffer.alloc(8);
  countBuffer.writeBigUInt64LE(BigInt(attestCount + 1));

  // Find PDA
  const [pda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("attestation"), payer.toBuffer(), countBuffer],
    programId,
  );

  return { pda, bump };
}
```

## Error Handling

The contract defines the following errors:

| Error                | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| InvalidSchemaAccount | The provided schema account does not match the expected account |

## Integration Example

Here's a complete example of how to interact with the ASSAP contracts:

```typescript
import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction
} from '@solana/web3.js';
import {
  Program,
  AnchorProvider,
  web3,
  BN
} from '@project-serum/anchor';
import { createHash } from 'crypto';

// Initialize connection and provider
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const wallet = /* your wallet implementation */;
const provider = new AnchorProvider(connection, wallet, {});

// Program ID
const programId = new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF');
const program = /* load Program using IDL */;

// 1. Register a Schema
async function registerSchema() {
  // Schema definition
  const schema = 'string name, number age, boolean is_verified';
  const schemaName = 'UserProfile';
  const issuerMinScore = new BN(80); // 0.8 * 100
  const receiverMinScore = new BN(60); // 0.6 * 100
  const issuerScoringProgram = new PublicKey('...'); // Your scoring program
  const receiverScoringProgram = new PublicKey('...'); // Your scoring program

  // Hash the schema for PDA derivation
  const schemaHash = Buffer.from(createHash('sha256').update(schema).digest());

  // Derive the schema registry PDA
  const [schemaRegistryPda, _] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('schema'),
      wallet.publicKey.toBuffer(),
      schemaHash
    ],
    programId
  );

  // Register the schema
  await program.methods
    .registerSchema(
      schema,
      schemaName,
      issuerMinScore,
      receiverMinScore,
      issuerScoringProgram,
      receiverScoringProgram
    )
    .accounts({
      payer: wallet.publicKey,
      schemaRegistry: schemaRegistryPda,
      systemProgram: SystemProgram.programId
    })
    .rpc();

  console.log('Schema registered with address:', schemaRegistryPda.toString());
  return schemaRegistryPda;
}

// 2. Create an Attestation
async function createAttestation(schemaRegistryPda, receiverPubkey) {
  // Get the current attest count from the schema registry
  const schemaAccount = await program.account.schemaRegistry.fetch(schemaRegistryPda);
  const attestCount = schemaAccount.attestCount;

  // Attestation data (must conform to the schema format)
  const attestData = JSON.stringify({
    name: "John Doe",
    age: 30,
    is_verified: true
  });

  // Derive the attestation PDA
  const countBuffer = Buffer.alloc(8);
  countBuffer.writeBigUInt64LE(BigInt(attestCount + 1));

  const [attestationPda, _] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('attestation'),
      wallet.publicKey.toBuffer(),
      countBuffer
    ],
    programId
  );

  // Create the attestation
  await program.methods
    .createAttestation(
      schemaRegistryPda,
      attestData,
      receiverPubkey
    )
    .accounts({
      payer: wallet.publicKey,
      schemaRegistry: schemaRegistryPda,
      attestation: attestationPda,
      systemProgram: SystemProgram.programId
    })
    .rpc();

  console.log('Attestation created with address:', attestationPda.toString());
  return attestationPda;
}

// Usage
(async () => {
  try {
    // First register a schema
    const schemaAccount = await registerSchema();

    // Then create an attestation using that schema
    const receiverPubkey = new PublicKey('...'); // The recipient of the attestation
    const attestation = await createAttestation(schemaAccount, receiverPubkey);

    console.log('Successfully created attestation');
  } catch (err) {
    console.error('Error:', err);
  }
})();
```

## Best Practices

1. **Schema Validation**: Validate that the attestation data conforms to the schema format before submitting to the contract.
2. **Error Handling**: Implement robust error handling to gracefully manage validation failures or other errors.
3. **Account Caching**: Cache schema accounts to reduce RPC calls when creating multiple attestations.
4. **Testing**: Test your integration thoroughly on a Solana testnet before moving to mainnet.
5. **Security**: Never expose private keys in your front-end code. Use a wallet adapter for transaction signing.

## Useful Resources

- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Program Security Guidelines](https://docs.solana.com/developing/programming-model/overview)
