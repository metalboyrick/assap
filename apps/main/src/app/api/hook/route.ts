import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, Schema } from "@/lib/supabase";
import { verifyApiKey } from "@/lib/auth";
import { type HeliusWebhookResponse } from "@/lib/helius-webhook";
import * as anchor from "@coral-xyz/anchor";

// Define program ID for attestation program
const PROGRAM_ID = new anchor.web3.PublicKey(
  "4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e",
);

// Create a dummy program object with the necessary coder property
// In production, this would be properly initialized with connection and IDL
const program = {
  coder: {
    events: {
      decode: (data: string) => {
        // Decode base64 event data
        try {
          return JSON.parse(Buffer.from(data, "base64").toString());
        } catch (error) {
          console.error("Failed to decode event data:", error);
          return null;
        }
      },
    },
  },
};

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

    console.dir(webhookResponse, { depth: null });

    // classify the txns
    const schemaCreationTxns = getSchemaCreationTxn(webhookResponse);
    const attestationCreationTxns = getAttestationCreationTxn(webhookResponse);

    // stream schema creation txns to database
    for (const txn of schemaCreationTxns) {
      // 2. Extract the CPI (inner instruction) that contains the event data
      const eventIx = txn.meta?.innerInstructions?.[0]?.instructions?.[1];

      if (eventIx && eventIx.data) {
        try {
          // 3. Decode the event data
          const rawData = anchor.utils.bytes.bs58.decode(eventIx.data);
          const base64Data = anchor.utils.bytes.base64.encode(
            rawData.subarray(16),
          );
          const event = program.coder.events.decode(base64Data);
          console.dir(event, { depth: null });
        } catch (error) {
          console.error("Error decoding event data:", error);
        }
      } else {
        console.warn("No event instruction data found in transaction");
      }
    }

    // stream attestation creation txns to database
    for (const txn of attestationCreationTxns) {
      const attestationCreationTxn = txn.meta?.logMessages.find((logMessage) =>
        logMessage.includes("CreateAttestation"),
      );
      // Add proper handling for attestation creation transactions
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}
