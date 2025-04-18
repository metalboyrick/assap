/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/contracts.json`.
 */
export type Contracts = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "contracts",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
          "name": "issuerMinScore",
          "type": "u64"
        },
        {
          "name": "receiverMinScore",
          "type": "u64"
        },
        {
          "name": "issuerScoringProgram",
          "type": "pubkey"
        },
        {
          "name": "receiverScoringProgram",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
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
    }
  ],
  "types": [
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
            "name": "issuerMinScore",
            "type": "u64"
          },
          {
            "name": "issuerScoringProgram",
            "type": "pubkey"
          },
          {
            "name": "receiverMinScore",
            "type": "u64"
          },
          {
            "name": "receiverScoringProgram",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
