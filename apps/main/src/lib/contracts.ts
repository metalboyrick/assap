import crypto from "crypto";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

// we have to hash the long strings to avoid max seed string length exceeded error
export function getCreateSchemaSeedParams(schema: string) {
  let hexString = crypto
    .createHash("sha256")
    .update(schema, "utf-8")
    .digest("hex");
  let schemaDataHashed = Uint8Array.from(Buffer.from(hexString, "hex"));
  return [Buffer.from("schema"), schemaDataHashed];
}

export type SchemaRegisteredEvent = {
  data: {
    schema: string;
    schemaName: string;
    uid: BN;
    creator: PublicKey;
    timestamp: BN;
    issuerVerifiers: string[];
    attesteeVerifiers: string[];
  };
  name: "schemaRegistered";
};
