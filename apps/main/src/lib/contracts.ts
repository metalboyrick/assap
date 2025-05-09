import crypto from "crypto";

// we have to hash the long strings to avoid max seed string length exceeded error
export function getCreateSchemaSeedParams(schema: string) {
  let hexString = crypto
    .createHash("sha256")
    .update(schema, "utf-8")
    .digest("hex");
  let schemaDataHashed = Uint8Array.from(Buffer.from(hexString, "hex"));
  return [Buffer.from("schema"), schemaDataHashed];
}
