"use client";

import React, { useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js"; // Kept for potential display of public key
import { useWallet } from "@solana/wallet-adapter-react"; // Kept for publicKey
import {
  IdentityVerifier,
  useSchemaProgram,
} from "@/data-access/schema-data-access";
import toast from "react-hot-toast";
import { useAttestationProgram } from "@/data-access/attestations-data-access";

// Removed PROGRAM_ID, clientSideSha256, getCreateSchemaSeedParams

export default function ContractsPage() {
  const { publicKey } = useWallet();
  // Removed program and feedback states

  // Schema registration states - RETAINED
  const [schemaData, setSchemaData] = useState<string>(
    "string name, number age, boolean is_married",
  );
  const [schemaName, setSchemaName] = useState<string>("Person");
  const [issuerVerifiers, setIssuerVerifiers] = useState<IdentityVerifier[]>(
    [],
  );
  const [attesteeVerifiers, setAttesteeVerifiers] = useState<
    IdentityVerifier[]
  >([]);

  // Attestation creation states - RETAINED
  const [attestSchemaDataForAttestation, setAttestSchemaDataForAttestation] =
    useState<string>("string name, number age, boolean is_married");
  const [attestData, setAttestData] = useState<string>("john, 16, false");
  const [attesteePublicKeyStr, setAttesteePublicKeyStr] = useState<string>("");

  // User update states - RETAINED
  const [hasTwitter, setHasTwitter] = useState<boolean>(false);
  const [hasDiscord, setHasDiscord] = useState<boolean>(false);
  const [hasGithub, setHasGithub] = useState<boolean>(false);
  const [hasTelegram, setHasTelegram] = useState<boolean>(false);

  const { registerSchema } = useSchemaProgram();
  const { createAttestation } = useAttestationProgram();

  // Placeholder handlers for UI interaction
  const handleCreateUser = () => {
    console.log(
      "Create User button clicked. publicKey:",
      publicKey?.toBase58(),
    );
    // Logic removed
  };

  const handleRegisterSchema = () => {
    if (!publicKey) {
      toast.error("Please connect your wallet to register a schema");
      return;
    }

    console.log("Register Schema button clicked with data:", {
      schemaData,
      schemaName,
      issuerVerifiers,
      attesteeVerifiers,
    });

    registerSchema.mutateAsync({
      payer: publicKey,
      schemaBlobId: schemaData,
      schemaName: schemaName,
      issuerVerifiers: issuerVerifiers,
      attesteeVerifiers: attesteeVerifiers,
    });
  };

  const handleCreateAttestation = () => {
    if (!publicKey) {
      toast.error("Please connect your wallet to create an attestation");
      return;
    }

    console.log("Create Attestation button clicked with data:", {
      attestSchemaDataForAttestation,
      attestData,
      attesteePublicKeyStr,
    });

    // Logic removed
    createAttestation.mutateAsync({
      payer: publicKey,
      schemaRegistry: new PublicKey(attestSchemaDataForAttestation),
      attestData: attestData,
      receiver: new PublicKey(attesteePublicKeyStr),
      issuerAttachedSolAccount: publicKey,
      attesteeAttachedSolAccount: new PublicKey(attesteePublicKeyStr),
    });
  };

  const handleUpdateUser = () => {
    console.log("Update User button clicked with data:", {
      hasTwitter,
      hasDiscord,
      hasGithub,
      hasTelegram,
    });
    // Logic removed
  };

  if (!publicKey) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Solana Contracts Interaction</h2>
        <p>Please connect your wallet to see the UI.</p>
        {/* Ensure WalletMultiButton is rendered by your app's layout/provider setup */}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Solana Contracts Interaction</h2>
      <p>Connected: {publicKey.toBase58()}</p>
      {/* Feedback UI removed as feedback state is removed */}

      <hr style={{ margin: "20px 0" }} />

      <section>
        <h3>User Management</h3>
        <button
          onClick={handleCreateUser}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create/Ensure My User Account
        </button>

        <h4>Update My User Account</h4>
        <div>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={hasTwitter}
              onChange={(e) => setHasTwitter(e.target.checked)}
            />{" "}
            Has Twitter
          </label>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={hasDiscord}
              onChange={(e) => setHasDiscord(e.target.checked)}
            />{" "}
            Has Discord
          </label>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={hasGithub}
              onChange={(e) => setHasGithub(e.target.checked)}
            />{" "}
            Has GitHub
          </label>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={hasTelegram}
              onChange={(e) => setHasTelegram(e.target.checked)}
            />{" "}
            Has Telegram
          </label>
        </div>
        <button
          onClick={handleUpdateUser}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update My User Profile
        </button>
      </section>

      <hr style={{ margin: "20px 0" }} />

      <section>
        <h3>Schema Registry</h3>
        <div>
          <textarea
            placeholder="Schema Data (e.g., string name, number age)"
            value={schemaData}
            onChange={(e) => setSchemaData(e.target.value)}
            rows={3}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Schema Name (e.g., Person)"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h4>Issuer Verifiers:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Object.keys(IdentityVerifier).map((verifier) => (
              <label key={verifier} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={issuerVerifiers.includes(
                    IdentityVerifier[verifier as keyof typeof IdentityVerifier],
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIssuerVerifiers([
                        ...issuerVerifiers,
                        IdentityVerifier[
                          verifier as keyof typeof IdentityVerifier
                        ],
                      ]);
                    } else {
                      setIssuerVerifiers(
                        issuerVerifiers.filter(
                          (v) =>
                            v !==
                            IdentityVerifier[
                              verifier as keyof typeof IdentityVerifier
                            ],
                        ),
                      );
                    }
                  }}
                />{" "}
                {verifier}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h4>Attestee Verifiers:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Object.keys(IdentityVerifier).map((verifier) => (
              <label key={verifier} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={attesteeVerifiers.includes(
                    IdentityVerifier[verifier as keyof typeof IdentityVerifier],
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAttesteeVerifiers([
                        ...attesteeVerifiers,
                        IdentityVerifier[
                          verifier as keyof typeof IdentityVerifier
                        ],
                      ]);
                    } else {
                      setAttesteeVerifiers(
                        attesteeVerifiers.filter(
                          (v) =>
                            v !==
                            IdentityVerifier[
                              verifier as keyof typeof IdentityVerifier
                            ],
                        ),
                      );
                    }
                  }}
                />{" "}
                {verifier}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleRegisterSchema}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register Schema
        </button>
      </section>

      <hr style={{ margin: "20px 0" }} />

      <section>
        <h3>Attestations</h3>
        <div>
          <textarea
            placeholder="Schema Data for PDA lookup (must match a registered schema)"
            value={attestSchemaDataForAttestation}
            onChange={(e) => setAttestSchemaDataForAttestation(e.target.value)}
            rows={3}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            title="The exact schema string used when the schema was registered. This is needed to find the schema's PDA."
          />
        </div>
        <div>
          <textarea
            placeholder="Attestation Data (e.g., john, 16, false)"
            value={attestData}
            onChange={(e) => setAttestData(e.target.value)}
            rows={3}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Attestee (Receiver) Public Key"
            value={attesteePublicKeyStr}
            onChange={(e) => setAttesteePublicKeyStr(e.target.value)}
            style={{
              width: "calc(100% - 120px)",
              marginBottom: "10px",
              padding: "8px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={() => setAttesteePublicKeyStr(publicKey?.toBase58() ?? "")}
            style={{
              padding: "8px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            title="Fill with my public key"
          >
            Use My Wallet
          </button>
        </div>
        <button
          onClick={handleCreateAttestation}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Attestation
        </button>
      </section>
    </div>
  );
}
