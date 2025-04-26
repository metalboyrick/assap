/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/contracts.json`.
 */
export type Contracts = {
  "address": "4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e",
  "metadata": {
    "name": "contracts",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createAttestation",
      "discriminator": [
        49,
        24,
        67,
        80,
        12,
        249,
        96,
        239
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "schemaRegistry",
          "writable": true
        },
        {
          "name": "attestation",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "schemaAccount",
          "type": "pubkey"
        },
        {
          "name": "attestData",
          "type": "string"
        },
        {
          "name": "receiver",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createUser",
      "discriminator": [
        108,
        227,
        130,
        130,
        252,
        109,
        75,
        218
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "did"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "did",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerSchema",
      "discriminator": [
        177,
        252,
        118,
        252,
        113,
        195,
        220,
        14
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "schemaRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  99,
                  104,
                  101,
                  109,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "arg",
                "path": "schema"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "schema",
          "type": "string"
        },
        {
          "name": "schemaName",
          "type": "string"
        },
        {
          "name": "issuerVerifiers",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "attesteeVerifiers",
          "type": {
            "vec": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "attestation",
      "discriminator": [
        152,
        125,
        183,
        86,
        36,
        146,
        121,
        73
      ]
    },
    {
      "name": "schemaRegistry",
      "discriminator": [
        67,
        184,
        244,
        100,
        7,
        70,
        92,
        51
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidSchemaAccount",
      "msg": "The provided schema account does not match the expected account"
    },
    {
      "code": 6001,
      "name": "invalidUserAccount",
      "msg": "The provided user account does not match the expected account"
    },
    {
      "code": 6002,
      "name": "invalidAttestationAccount",
      "msg": "The provided attestation account does not match the expected account"
    },
    {
      "code": 6003,
      "name": "invalidAttestData",
      "msg": "The provided attest data is invalid"
    }
  ],
  "types": [
    {
      "name": "attestation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uid",
            "type": "u64"
          },
          {
            "name": "schemaAccount",
            "type": "pubkey"
          },
          {
            "name": "issuer",
            "type": "pubkey"
          },
          {
            "name": "receiver",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "attestData",
            "type": "string"
          },
          {
            "name": "attestIndex",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "schemaRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uid",
            "type": "u64"
          },
          {
            "name": "schema",
            "type": "string"
          },
          {
            "name": "schemaName",
            "type": "string"
          },
          {
            "name": "issuerVerifiers",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "attesteeVerifiers",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "attestCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "did",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "u64"
          },
          {
            "name": "lastActive",
            "type": "u64"
          },
          {
            "name": "solAccount",
            "type": "pubkey"
          },
          {
            "name": "twitterAccount",
            "type": "pubkey"
          },
          {
            "name": "githubAccount",
            "type": "pubkey"
          },
          {
            "name": "websiteAccount",
            "type": "pubkey"
          },
          {
            "name": "emailAccount",
            "type": "pubkey"
          },
          {
            "name": "discordAccount",
            "type": "pubkey"
          },
          {
            "name": "humanVerification",
            "type": "bool"
          },
          {
            "name": "dataCid",
            "docs": [
              "points to additional data in IPFS"
            ],
            "type": "string"
          }
        ]
      }
    }
  ]
};
