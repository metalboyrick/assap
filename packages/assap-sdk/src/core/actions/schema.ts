import { PublicKey, SystemProgram, Cluster } from "@solana/web3.js";
import { AnchorProvider, BN } from "@coral-xyz/anchor";
import crypto from "crypto";
import { getContractsProgram, getContractsProgramId } from "@/lib/contracts";
import * as walrus from "@/lib/walrus";

export enum IdentityVerifier {
  SolBalance = "sol_balance",
  SolMinTx = "sol_min_tx",
  SolName = "sol_name",
  Twitter = "twitter",
  Email = "email",
  Human = "human",
}

export enum SchemaType {
  Boolean = "boolean",
  String = "string",
  Number = "number",
  BooleanArray = "boolean[]",
  StringArray = "string[]",
  NumberArray = "number[]",
}

export interface SchemaData {
  type: SchemaType;
  name: string;
  data: boolean | string | number | boolean[] | string[] | number[];
}

// Schema registry account data structure
export interface SchemaRegistry {
  uid: BN;
  schema: string;
  schemaName: string;
  issuerVerifiers: string[];
  attesteeVerifiers: string[];
  timestamp: BN;
  creator: PublicKey;
  attestCount: BN;
}

// We have to hash the long strings to avoid max seed string length exceeded error
export function getCreateSchemaSeedParams(schema: string) {
  const hexString = crypto
    .createHash("sha256")
    .update(schema, "utf-8")
    .digest("hex");
  const schemaDataHashed = Uint8Array.from(Buffer.from(hexString, "hex"));
  return [Buffer.from("schema"), schemaDataHashed];
}

function validateHumanMessage(humanMessage: string, schemaName: string[]) {
  const schemaNameRegex = new RegExp(`\\{${schemaName.join("|")}\\}`);
  return schemaNameRegex.test(humanMessage);
}

/**
 * Register a new schema on the Solana blockchain
 * @param cluster The Solana cluster to use
 * @param payer The public key of the payer account
 * @param schemaBlobId The schema blob ID (content of the schema)
 * @param schemaName The human-readable name of the schema
 * @param issuerVerifiers Array of verifiers required for the issuer
 * @param attesteeVerifiers Array of verifiers required for the attestee
 * @returns Transaction signature
 */
export async function registerSchema(
  cluster: Cluster,
  payer: PublicKey,
  schemaData: SchemaData[],
  schemaName: string,
  issuerVerifiers: IdentityVerifier[] = [],
  attesteeVerifiers: IdentityVerifier[] = [],
  provider: AnchorProvider,
  humanMessage?: string,
): Promise<string> {
  // Get the program ID from the program
  const programId = getContractsProgramId(cluster);
  const program = getContractsProgram(provider, programId);

  // if human message is provided, validate that it contains some or all schema name wrapped in curly brackets.
  if (humanMessage && !validateHumanMessage(humanMessage, [schemaName])) {
    throw new Error(
      "Human message must contain some or all schema name wrapped in curly brackets.",
    );
  }

  // store schema data and human message into walrus
  const schemaBlobId = await walrus.storeData({
    schemaData,
    humanMessage,
  });

  // Find the schema registry PDA
  const [schemaRegistryPda] = PublicKey.findProgramAddressSync(
    [...getCreateSchemaSeedParams(schemaBlobId)],
    new PublicKey(programId),
  );

  // Call the register_schema instruction
  return program.methods
    .registerSchema(
      schemaBlobId,
      schemaName,
      issuerVerifiers,
      attesteeVerifiers,
    )
    .accountsPartial({
      payer,
      schemaRegistry: schemaRegistryPda,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

export async function getSchemaDataFromBlobId(
  blobId: string,
): Promise<{ humanMessage: string; schemaData: SchemaData[] }> {
  const data = await walrus.getData(blobId);

  return {
    humanMessage: data.humanMessage,
    schemaData: data.schemaData,
  };
}
