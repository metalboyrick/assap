"use client";

import React, { useState, useEffect } from "react";
import { Keypair, PublicKey } from "@solana/web3.js"; // Kept for potential display of public key
import { useWallet } from "@solana/wallet-adapter-react"; // Kept for publicKey
import {
  IdentityVerifier,
  useSchemaProgram,
} from "@/data-access/schema-data-access";
import toast from "react-hot-toast";
import { useAttestationProgram } from "@/data-access/attestations-data-access";
import { useUserProgram } from "@/data-access/user-data-access";
import { CONTRACTS_PROGRAM_ID } from "@project/anchor";
import {
  SchemaType,
  getSchemaDataFromBlobId,
  getSchemaById,
  useAssapAttest,
  type SchemaData,
} from "@assap/assap-sdk";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Removed PROGRAM_ID, clientSideSha256, getCreateSchemaSeedParams

export default function ContractsPage() {
  const { publicKey } = useWallet();
  // Removed program and feedback states

  // Schema registration states - UPDATED
  const [schemaData, setSchemaData] = useState<SchemaData[]>([
    { type: SchemaType.String, name: "name", data: "" },
    { type: SchemaType.Number, name: "age", data: 0 },
    { type: SchemaType.Boolean, name: "is_married", data: false },
  ]);
  const [schemaName, setSchemaName] = useState<string>("Person");
  const [issuerVerifiers, setIssuerVerifiers] = useState<IdentityVerifier[]>(
    [],
  );
  const [attesteeVerifiers, setAttesteeVerifiers] = useState<
    IdentityVerifier[]
  >([]);

  // Attestation creation states
  const [attestReceiver, setAttestReceiver] = useState("");
  const [attestSchemaDataForAttestation, setAttestSchemaDataForAttestation] =
    useState(""); // Keep for displaying raw fetched schema
  const [attestSchemaIdForAttestation, setAttestSchemaIdForAttestation] =
    useState("");
  const [parsedAttestationSchema, setParsedAttestationSchema] = useState<
    SchemaData[] | null
  >(null);
  const [attestationValues, setAttestationValues] = useState<
    Record<string, string | number | boolean>
  >({});
  const [attestIssuerAttachedSol, setAttestIssuerAttachedSol] = useState("");
  const [attestAttesteeAttachedSol, setAttestAttesteeAttachedSol] =
    useState("");

  // User update states - RETAINED
  const [hasTwitter, setHasTwitter] = useState<boolean>(false);
  const [hasDiscord, setHasDiscord] = useState<boolean>(false);
  const [hasGithub, setHasGithub] = useState<boolean>(false);
  const [hasTelegram, setHasTelegram] = useState<boolean>(false);

  const { registerSchema } = useSchemaProgram();
  const { createAttestation } = useAttestationProgram();
  const { createUser, updateUser } = useUserProgram();

  const [isLoadingSchemaData, setIsLoadingSchemaData] = useState(false);
  const [schemaDataError, setSchemaDataError] = useState<string | null>(null);

  // Effect to fetch schema data when attestSchemaIdForAttestation changes
  useEffect(() => {
    const fetchSchema = async () => {
      if (!attestSchemaIdForAttestation) {
        setAttestSchemaDataForAttestation(""); // Clear if ID is empty
        setParsedAttestationSchema(null); // Clear parsed schema
        setAttestationValues({}); // Clear values
        setSchemaDataError(null);
        return;
      }

      try {
        // Validate if it's a plausible public key string before fetching
        // Basic validation: non-empty, specific length (e.g., 32-44 chars for base58 a Solana PubKey)
        // A more robust validation would involve PublicKey.isOnCurve or trying to construct it.
        if (
          attestSchemaIdForAttestation.length < 32 ||
          attestSchemaIdForAttestation.length > 44
        ) {
          setSchemaDataError("Invalid Schema ID format.");
          setAttestSchemaDataForAttestation("");
          setParsedAttestationSchema(null);
          setAttestationValues({});
          return;
        }
        new PublicKey(attestSchemaIdForAttestation); // Attempt to construct PublicKey to validate

        setIsLoadingSchemaData(true);
        setSchemaDataError(null);
        const schema = await getSchemaById(attestSchemaIdForAttestation);
        if (schema && schema.schema_data) {
          // Use the schema_data directly from the indexer response
          setAttestSchemaDataForAttestation(schema.schema_data);
          console.log("Attempting to parse schema_data:", schema.schema_data); // Log the data before parsing
          try {
            // fetch from walrus
            const schemaData = await getSchemaDataFromBlobId(
              schema.schema_data,
            );

            const parsedSchema: SchemaData[] = schemaData.schemaData;
            console.log({ parsedSchema });
            setParsedAttestationSchema(parsedSchema);
            // Initialize attestationValues based on parsed schema
            const initialValues: Record<string, string | number | boolean> = {};
            parsedSchema.forEach((field) => {
              if (field.type === SchemaType.Number) {
                initialValues[field.name] = 0;
              } else if (field.type === SchemaType.Boolean) {
                initialValues[field.name] = false;
              } else {
                initialValues[field.name] = ""; // Default for string and others
              }
            });
            setAttestationValues(initialValues);
            setSchemaDataError(null); // Clear previous errors if parsing succeeds
          } catch (parseError) {
            console.error("Failed to parse schema_data:", parseError);
            setSchemaDataError("Failed to parse fetched schema data.");
            setParsedAttestationSchema(null);
            setAttestationValues({});
          }
        } else {
          setSchemaDataError("Schema not found or schema_data missing.");
          setAttestSchemaDataForAttestation("");
          setParsedAttestationSchema(null);
          setAttestationValues({});
        }
      } catch (error) {
        console.error("Failed to fetch schema data:", error);
        setSchemaDataError(
          error instanceof Error
            ? error.message
            : "Failed to fetch schema data",
        );
        setAttestSchemaDataForAttestation("");
        setParsedAttestationSchema(null); // Also clear parsed schema on fetch error
        setAttestationValues({}); // Clear values on fetch error
      }
      setIsLoadingSchemaData(false);
    };

    fetchSchema();
  }, [attestSchemaIdForAttestation]);

  const { initiateAttestation } = useAssapAttest({
    schemaId: attestSchemaIdForAttestation,
    cluster: "devnet",
    onAttestComplete: () => {
      console.log("Attestation complete");
    },
  });

  // Placeholder handlers for UI interaction
  const handleCreateUser = () => {
    if (!publicKey) {
      toast.error("Please connect your wallet to create a user account");
      return;
    }
    console.log(
      "Create User button clicked. publicKey:",
      publicKey?.toBase58(),
    );
    createUser.mutateAsync({ payer: publicKey });
  };

  const handleSchemaFieldChange = (
    idx: number,
    field: keyof SchemaData,
    value: any,
  ) => {
    setSchemaData((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    );
  };

  const handleAddSchemaField = () => {
    setSchemaData((prev) => [
      ...prev,
      { type: SchemaType.String, name: "", data: "" },
    ]);
  };

  const handleRemoveSchemaField = (idx: number) => {
    setSchemaData((prev) => prev.filter((_, i) => i !== idx));
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
      schemaData: schemaData,
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
      attestSchemaDataForAttestation, // Raw schema string
      attestationValues, // User-inputted values
      attestReceiver,
    });

    if (!parsedAttestationSchema) {
      toast.error("Schema not loaded or parsed. Cannot create attestation.");
      return;
    }

    // Validate that all schema fields have corresponding values
    const missingFields = parsedAttestationSchema.filter(
      (field) => attestationValues[field.name] === undefined,
    );
    if (missingFields.length > 0) {
      toast.error(
        `Missing data for fields: ${missingFields.map((f) => f.name).join(", ")}`,
      );
      console.error(
        "Missing attestation values:",
        missingFields.map((f) => f.name),
      );
      return;
    }

    // Log the data object being sent
    console.log("Sending Attestation Data Object:", attestationValues);

    // createAttestation.mutateAsync({
    //   payer: publicKey,
    //   schemaRegistry: new PublicKey(attestSchemaIdForAttestation),
    //   attestData: attestationValues, // Pass the object directly
    //   receiver: new PublicKey(attestReceiver),
    //   issuerAttachedSolAccount: publicKey, // Placeholder, adjust as needed
    //   attesteeAttachedSolAccount: new PublicKey(attestReceiver), // Placeholder, adjust as needed
    // });

    initiateAttestation({
      attestData: attestationValues,
      receiver: attestReceiver,
    });
  };

  const handleUpdateUser = () => {
    if (!publicKey) {
      toast.error("Please connect your wallet to update your user profile");
      return;
    }

    const [userPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), publicKey.toBuffer()],
      CONTRACTS_PROGRAM_ID,
    );

    console.log("Update User button clicked with data:", {
      userPda: userPda.toBase58(),
      hasTwitter,
      // hasDiscord, // Not directly mapped
      // hasGithub,  // Not directly mapped
      // hasTelegram // Not directly mapped
    });

    updateUser.mutateAsync({
      payer: publicKey,
      userAccount: userPda,
      twitterAccount: hasTwitter,
      // emailAccount, humanVerification, solName, solAccount are not set from current UI
    });
  };

  // if (!publicKey) {
  //   return (
  //     <div style={{ padding: "20px" }}>
  //       <h2>Solana Contracts Interaction</h2>
  //       <p>Please connect your wallet to see the UI.</p>
  //       <WalletMultiButton />
  //     </div>
  //   );
  // }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <section>
        <h3>Schema Registry</h3>
        <div style={{ marginBottom: "10px" }}>
          <h4>Schema Fields</h4>
          {schemaData.map((field, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <select
                value={field.type}
                onChange={(e) =>
                  handleSchemaFieldChange(
                    idx,
                    "type",
                    e.target.value as SchemaType,
                  )
                }
                style={{ padding: 4 }}
              >
                {Object.values(SchemaType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) =>
                  handleSchemaFieldChange(idx, "name", e.target.value)
                }
                style={{ padding: 4, width: 120 }}
              />
              {/* Data input adapts to type */}
              {field.type === SchemaType.Boolean ? (
                <select
                  value={String(field.data)}
                  onChange={(e) =>
                    handleSchemaFieldChange(
                      idx,
                      "data",
                      e.target.value === "true",
                    )
                  }
                  style={{ padding: 4 }}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : field.type === SchemaType.Number ? (
                <input
                  type="number"
                  value={field.data as number}
                  onChange={(e) =>
                    handleSchemaFieldChange(idx, "data", Number(e.target.value))
                  }
                  style={{ padding: 4, width: 80 }}
                />
              ) : (
                <input
                  type="text"
                  value={field.data as string}
                  onChange={(e) =>
                    handleSchemaFieldChange(idx, "data", e.target.value)
                  }
                  style={{ padding: 4, width: 120 }}
                />
              )}
              <button
                onClick={() => handleRemoveSchemaField(idx)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
                title="Remove field"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={handleAddSchemaField}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 4,
              padding: "4px 12px",
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            + Add Field
          </button>
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
          <input
            type="text"
            placeholder="Schema ID for Attestation (PublicKey)"
            value={attestSchemaIdForAttestation}
            onChange={(e) => setAttestSchemaIdForAttestation(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            title="Enter the Public Key of the schema to fetch its data for attestation."
          />
          {isLoadingSchemaData && <p>Loading schema data...</p>}
          {schemaDataError && (
            <p style={{ color: "red" }}>Error: {schemaDataError}</p>
          )}
        </div>

        {/* Remove attestData textarea and add dynamic fields */}
        {parsedAttestationSchema && (
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <h4>Attestation Data (based on schema):</h4>
            {parsedAttestationSchema.map((field, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  {field.name} ({field.type})
                </label>
                {field.type === SchemaType.Boolean ? (
                  <select
                    value={String(attestationValues[field.name] ?? false)}
                    onChange={(e) => {
                      setAttestationValues((prev) => ({
                        ...prev,
                        [field.name]: e.target.value === "true",
                      }));
                    }}
                    style={{ padding: "8px", width: "100%" }}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : field.type === SchemaType.Number ? (
                  <input
                    type="number"
                    value={String(attestationValues[field.name] ?? 0)}
                    onChange={(e) => {
                      setAttestationValues((prev) => ({
                        ...prev,
                        [field.name]: Number(e.target.value) || 0, // Handle NaN
                      }));
                    }}
                    style={{ padding: "8px", width: "100%" }}
                  />
                ) : (
                  // Default to text input for String and potentially others
                  <input
                    type="text"
                    value={String(attestationValues[field.name] ?? "")}
                    onChange={(e) => {
                      setAttestationValues((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }));
                    }}
                    style={{ padding: "8px", width: "100%" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Attestee (Receiver) Public Key"
            value={attestReceiver}
            onChange={(e) => setAttestReceiver(e.target.value)}
            style={{
              width: "calc(100% - 120px)",
              marginBottom: "10px",
              padding: "8px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={() => setAttestReceiver(publicKey?.toBase58() ?? "")}
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

      {/* <section>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => attest()}
        >
          Test One Click Attestation
        </button>
      </section> */}
    </div>
  );
}
