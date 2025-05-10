import { NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/auth";
import {
  HeliusWebhookResponseItem,
  type HeliusWebhookResponse,
} from "@/lib/helius-webhook";
import * as anchor from "@coral-xyz/anchor";
import { CONTRACTS_PROGRAM_ID, ContractsIDL } from "@project/anchor";
import { Idl, Program, Provider } from "@coral-xyz/anchor";
import {
  AttestationCreatedEvent,
  getCreateAttestationSeedParams,
  getCreateSchemaSeedParams,
  SchemaRegisteredEvent,
} from "@/lib/contracts";
import { Attestation, Schema, supabaseAdmin } from "@/lib/supabase";
import { PublicKey } from "@solana/web3.js";

const SAMPLE_SCHEMA_CREATION_TXN = [
  {
    blockTime: 1746808512,
    indexWithinBlock: 4,
    meta: {
      err: null,
      fee: 5000,
      innerInstructions: [
        {
          index: 1,
          instructions: [
            {
              accounts: [0, 1],
              data: "111112CxbPAA4bV3v6wsejqYsenjjNQHYmDESHVo14dPBc7NktbSAJPQGqrMsWQFnA5arz",
              programIdIndex: 2,
            },
            {
              accounts: [5],
              data: "DjRuqDRQjw1Q879kYQ9pTZ7VsFughdE374o3TMdbnhjKxui9KJiDBQZdJVLLimGe9s1N89y9qUoxo8orgCUS8UqdEunFMgF5VKK1k8XmJv64s4yAap2gZo5hdKcue9e5JohrmT7cDVycrYDQUtbZCdCJDHG2qThxLi3bUvqHEHewSx71yDmNuai6r7P6DeuBA4CHD",
              programIdIndex: 3,
            },
          ],
        },
      ],
      loadedAddresses: { readonly: [], writable: [] },
      logMessages: [
        "Program ComputeBudget111111111111111111111111111111 invoke [1]",
        "Program ComputeBudget111111111111111111111111111111 success",
        "Program 4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e invoke [1]",
        "Program log: Instruction: RegisterSchema",
        "Program 11111111111111111111111111111111 invoke [2]",
        "Program 11111111111111111111111111111111 success",
        "Program 4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e invoke [2]",
        "Program 4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e consumed 3501 of 9737 compute units",
        "Program 4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e success",
        "Program 4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e consumed 25124 of 30359 compute units",
        "Program 4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e success",
      ],
      postBalances: [10423569760, 19042560, 1, 1141440, 1, 0],
      postTokenBalances: [],
      preBalances: [10442617320, 0, 1, 1141440, 1, 0],
      preTokenBalances: [],
      rewards: [],
    },
    slot: 379750092,
    transaction: {
      message: {
        accountKeys: [
          "3yfEkerzEcDvn1rMmuT3JZ5FbbCzYnbBma8Y1knHEUiT",
          "7CQk1Z9GPt58zddYw1v1niSVk8mew7RUaftf5AcmTTnS",
          "11111111111111111111111111111111",
          "4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e",
          "ComputeBudget111111111111111111111111111111",
          "HCpJbM8nEWqHo8TxtuYWW5F6Mazevgj8DKs5Bht7U3H3",
        ],
        addressTableLookups: null,
        header: {
          numReadonlySignedAccounts: 0,
          numReadonlyUnsignedAccounts: 4,
          numRequiredSignatures: 1,
        },
        instructions: [
          { accounts: [], data: "FFU5Gs", programIdIndex: 4 },
          {
            accounts: [0, 1, 2, 5, 3],
            data: "2S3pKm4U2Htn8K25opYtSZNHNAQMs14555Q4MWgpYnrp4t9ZSosktVtu4aw2Etb2FbULfgCwzRjqxUjgGz8tnJnnFLntEgWC8zP8cvN6AQ2yNYk9enbedDChd",
            programIdIndex: 3,
          },
        ],
        recentBlockhash: "AVrwoEBrSnswLK3x2doJxfjaJ1WMYRExLRkWHzL9BXxM",
      },
      signatures: [
        "2HiGytzpZKnGU6aF2Af2rTUYHmMFmg3JqVXGLAZpDa5hUR5tPb3Q8Q3JTquJg7tKfzs3Rn4wiJz5ZuHowWwfEH2k",
      ],
    },
    version: "legacy",
  },
];

function getSchemaCreationTxn(txns: HeliusWebhookResponse) {
  return txns.filter((txn) => {
    return txn.meta?.logMessages.some((logMessage) =>
      logMessage.includes("RegisterSchema"),
    );
  });
}

function getAttestationCreationTxn(txns: HeliusWebhookResponse) {
  return txns.filter((txn) => {
    return txn.meta?.logMessages.some((logMessage) =>
      logMessage.includes("CreateAttestation"),
    );
  });
}

async function streamSchemaCreation(
  schemaCreationTxns: HeliusWebhookResponseItem[],
) {
  // define CONTRACTS program, needed to help decode the events
  const program = new Program(ContractsIDL as Idl, {} as Provider);

  // stream schema creation txns to database
  for (const txn of schemaCreationTxns) {
    // 2. Extract the CPI (inner instruction) that contains the event data
    const eventIx = txn.meta?.innerInstructions?.[0]?.instructions?.[1];

    if (eventIx && eventIx.data) {
      try {
        // 3. Decode the event data
        const rawData = anchor.utils.bytes.bs58.decode(eventIx.data);
        const base64Data = anchor.utils.bytes.base64.encode(
          rawData.subarray(8),
        );
        const event = program.coder.events.decode(
          base64Data,
        ) as SchemaRegisteredEvent;

        // Find the schema registry PDA
        const [schemaRegistryPda] = PublicKey.findProgramAddressSync(
          getCreateSchemaSeedParams(event.data.schema),
          CONTRACTS_PROGRAM_ID,
        );

        // put in data of the event into the database
        const newSchema: Schema = {
          schema_uid: schemaRegistryPda.toString(), // Solana address-like identifier for the schema
          creation_transaction_id: txn.transaction.signatures[0],
          creator_uid: event.data.creator.toString(),
          creation_timestamp: new Date(event.data.timestamp.toNumber()),
          schema_name: event.data.schemaName,
          schema_data: event.data.schema,
          creation_cost: txn.meta.fee + txn.meta.postBalances[1],
          verification_requirements: {
            issuer_verifiers: event.data.issuerVerifiers,
            attestee_verifiers: event.data.attesteeVerifiers,
          },
        };

        const { error } = await supabaseAdmin.from("schemas").insert(newSchema);

        if (!!error) throw new Error(error.message);
      } catch (error) {
        console.error("Error decoding event data:", error);
      }
    } else {
      console.warn("No event instruction data found in transaction");
    }
  }
}

async function streamAttestCreation(
  attestationTxns: HeliusWebhookResponseItem[],
) {
  // define CONTRACTS program, needed to help decode the events
  const program = new Program(ContractsIDL as Idl, {} as Provider);

  // stream attestation creation txns to database
  for (const txn of attestationTxns) {
    const attestationCreationTxn = txn.meta?.logMessages.find((logMessage) =>
      logMessage.includes("CreateAttestation"),
    );

    // stream schema creation txns to database
    for (const txn of attestationTxns) {
      // 2. Extract the CPI (inner instruction) that contains the event data
      const eventIx = txn.meta?.innerInstructions?.[0]?.instructions?.[1];

      if (eventIx && eventIx.data) {
        try {
          // 3. Decode the event data
          const rawData = anchor.utils.bytes.bs58.decode(eventIx.data);
          const base64Data = anchor.utils.bytes.base64.encode(
            rawData.subarray(8),
          );
          const event = program.coder.events.decode(
            base64Data,
          ) as AttestationCreatedEvent;

          const { issuer, schemaAccount, attestIndex, receiver } = event.data;

          // Find the attestation PDA
          const [attestationPda] = PublicKey.findProgramAddressSync(
            getCreateAttestationSeedParams(
              issuer,
              schemaAccount,
              attestIndex.toNumber(),
            ),
            CONTRACTS_PROGRAM_ID,
          );

          // put in data of the event into the database
          const newAttestation: Attestation = {
            attestation_uid: attestationPda.toString(),
            schema_uid: schemaAccount.toString(),
            attestee_uid: receiver.toString(),
            attestor_uid: issuer.toString(),
            creation_date: new Date(event.data.timestamp.toNumber()),
            attestation_data: event.data.attestData,
          };

          const { error } = await supabaseAdmin
            .from("attestations")
            .insert(newAttestation);

          if (!!error) throw new Error(error.message);
        } catch (error) {
          console.error("Error decoding event data:", error);
        }
      } else {
        console.warn("No event instruction data found in transaction");
      }
    }
  }
}

// POST (create new schema)
// TODO: implement webhook logic here
export async function POST(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const webhookResponse: HeliusWebhookResponse = await request.json();

    // console.dir(webhookResponse, { depth: null });

    // classify the txns
    const schemaCreationTxns = getSchemaCreationTxn(webhookResponse);
    const attestationTxns = getAttestationCreationTxn(webhookResponse);

    // stream schema creation txns
    const promises = [
      streamSchemaCreation(schemaCreationTxns),
      streamAttestCreation(attestationTxns),
    ];

    await Promise.all(promises);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}
