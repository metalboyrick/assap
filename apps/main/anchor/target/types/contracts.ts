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
          "name": "issuer",
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
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "attestee",
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
                "path": "receiver"
              }
            ]
          }
        },
        {
          "name": "issuerAttachedSolAccount",
          "docs": [
            "We're using AccountInfo because we're only checking its public key against the stored address."
          ]
        },
        {
          "name": "attesteeAttachedSolAccount",
          "docs": [
            "We're using AccountInfo because we're only checking its public key against the stored address."
          ]
        },
        {
          "name": "attestation",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
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
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
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
                "kind": "arg",
                "path": "schema"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
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
    },
    {
      "name": "updateUser",
      "discriminator": [
        9,
        2,
        160,
        169,
        118,
        12,
        207,
        84
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "solAccount",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "twitterAccount",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "emailAccount",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "humanVerification",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "solName",
          "type": {
            "option": "bool"
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
  "events": [
    {
      "name": "attestationCreated",
      "discriminator": [
        217,
        170,
        19,
        203,
        128,
        51,
        29,
        163
      ]
    },
    {
      "name": "schemaRegistered",
      "discriminator": [
        142,
        85,
        205,
        242,
        94,
        187,
        233,
        76
      ]
    },
    {
      "name": "userCreated",
      "discriminator": [
        145,
        177,
        42,
        214,
        0,
        65,
        40,
        69
      ]
    },
    {
      "name": "userUpdated",
      "discriminator": [
        61,
        217,
        252,
        178,
        176,
        29,
        219,
        145
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
    },
    {
      "code": 6004,
      "name": "invalidAttestee",
      "msg": "The provided attestee account does not match the expected account"
    },
    {
      "code": 6005,
      "name": "invalidIssuer",
      "msg": "The provided issuer account does not match the expected account"
    },
    {
      "code": 6006,
      "name": "invalidIssuerAttachedSolAccount",
      "msg": "The provided issuer attached sol account does not match the expected account"
    },
    {
      "code": 6007,
      "name": "invalidAttesteeAttachedSolAccount",
      "msg": "The provided attestee attached sol account does not match the expected account"
    },
    {
      "code": 6008,
      "name": "schemaAlreadyRegistered",
      "msg": "The provided schema is already registered"
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
      "name": "attestationCreated",
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
      "name": "schemaRegistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "schema",
            "type": "string"
          },
          {
            "name": "schemaName",
            "type": "string"
          },
          {
            "name": "uid",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
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
            "type": "pubkey"
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
            "type": "bool"
          },
          {
            "name": "emailAccount",
            "type": "bool"
          },
          {
            "name": "humanVerification",
            "type": "bool"
          },
          {
            "name": "solName",
            "type": "bool"
          },
          {
            "name": "dataCid",
            "docs": [
              "points to additional data in IPFS",
              "TODO: might use this for non-solana accounts related data, this might be slightly hard to verify as we need offcain verification that is trustworthy.s"
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "userCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "did",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "did",
            "type": "pubkey"
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
            "type": "bool"
          },
          {
            "name": "emailAccount",
            "type": "bool"
          },
          {
            "name": "humanVerification",
            "type": "bool"
          },
          {
            "name": "solName",
            "type": "bool"
          },
          {
            "name": "dataCid",
            "type": "string"
          },
          {
            "name": "updatedAt",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
