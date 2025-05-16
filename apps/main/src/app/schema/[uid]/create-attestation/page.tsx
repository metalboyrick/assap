"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getSchemaDataFromBlobId,
  SchemaData,
  AttestationData,
  useAssapAttest,
  IdentityVerifier,
} from "@assap-xyz/assap-sdk";
import { useCluster } from "@/components/cluster/cluster-data-access";
import toast from "react-hot-toast";

// Define types for schema and field
interface Field {
  name: string;
  type: string;
}

// Custom type for our extended schema field
interface ExtendedSchemaField {
  name: string;
  type: string;
  data: any;
}

interface SchemaMetadata {
  schema_uid: string;
  schema_name: string;
  creation_timestamp: string;
  creation_cost: string;
  creator_uid: string;
  creation_transaction_id: string;
  transactionId: string;
  schema_data: string;
  human_message_template: string;
  verification_requirements: {
    issuer_verifiers: IdentityVerifier[];
    attester_verifiers: IdentityVerifier[];
  };
}

interface SchemaDataset {
  humanMessage: string;
  schemaData: SchemaData[];
}

export default function CreateAttestationFromSchemaPage(props: {
  params: Promise<{ uid: string }>;
}) {
  const params = use(props.params);
  const { cluster } = useCluster();

  const [schema, setSchema] = useState<SchemaMetadata | null>(null);
  const [schemaDataset, setSchemaDataset] = useState<SchemaDataset | null>(
    null,
  );
  const [schemaFields, setSchemaFields] = useState<ExtendedSchemaField[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [showHumanMessage, setShowHumanMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null);

  const { initiateAttestation } = useAssapAttest({
    schemaId: params.uid,
    onAttestComplete: (txnHash: string) => {
      setIsSubmitting(false);
      setTransactionSignature(txnHash);
      setIsSuccess(true);
    },
    cluster: "devnet",
  });

  // Fetch schema data from the backend
  useEffect(() => {
    async function fetchSchema() {
      const res = await fetch(`/api/schemas/${params.uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as SchemaMetadata;

      const _schemaDataset = await getSchemaDataFromBlobId(data.schema_data);

      // Create extended schema fields
      const _schemaFields = _schemaDataset.schemaData.map(
        (field: SchemaData) => ({
          name: field.name,
          type: field.type,
          data: field.data,
        }),
      );

      setSchema(data);
      setSchemaDataset(_schemaDataset);
      setSchemaFields(_schemaFields);
    }
    fetchSchema();
  }, [params.uid]);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowHumanMessage(true);
  };

  const handleCreateAttestation = async () => {
    // if (!wallet.publicKey || !schema) {
    //   toast.error("Wallet not connected or schema not loaded");
    //   return;
    // }

    try {
      setIsSubmitting(true);

      // Prepare attestation data
      const attestData: AttestationData = {};

      // Add each field from the form to the attestation data
      schemaFields.forEach((field) => {
        attestData[field.name] = formValues[field.name] || "";
      });

      // Create attestation on-chain
      // const schemaRegistryPublicKey = new PublicKey(schema.schema_uid);

      // Using wallet.publicKey which we've already confirmed is not null above
      // const payer = wallet.publicKey;
      // const issuerAttachedSolAccount = wallet.publicKey;
      // const attesteeAttachedSolAccount = wallet.publicKey;
      // const receiver = wallet.publicKey;

      // const signature = await createAttestation.mutateAsync({
      //   payer,
      //   schemaRegistry: schemaRegistryPublicKey,
      //   attestData,
      //   receiver,
      //   issuerAttachedSolAccount,
      //   attesteeAttachedSolAccount,
      // });

      initiateAttestation({
        attestData,
      });
    } catch (error) {
      console.error("Error creating attestation:", error);
      toast.error("Failed to create attestation");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if all fields are filled
  const allFieldsFilled =
    schemaFields.every(
      (field) => formValues[field.name] && formValues[field.name].trim() !== "",
    ) || false;

  const renderHumanMessage = () => {
    if (!schemaDataset) return "";
    let message = schemaDataset.humanMessage;
    Object.entries(formValues).forEach(([key, value]) => {
      if (message.includes(`{${key}}`)) {
        message = message.replace(`{${key}}`, value);
      }
    });
    return message;
  };

  if (!schema || !schemaDataset) {
    return <div className="text-white">Loading schema...</div>;
  }

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl">
              Attestation Created Successfully
            </CardTitle>
            <CardDescription>
              Your attestation has been recorded on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-900/20 border-green-800 text-green-100">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your attestation has been created and is now being processed on
                the Solana blockchain.
              </AlertDescription>
            </Alert>
            {transactionSignature && (
              <div className="p-4 bg-zinc-800 rounded-md">
                <h3 className="font-medium mb-2">Transaction Signature</h3>
                <p className="text-xs overflow-x-auto whitespace-nowrap">
                  {transactionSignature}
                </p>
                <a
                  href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=${cluster.network}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm hover:underline mt-2 inline-block"
                >
                  View on Solana Explorer
                </a>
              </div>
            )}
            <div className="p-4 bg-zinc-800 rounded-md">
              <h3 className="font-medium mb-2">Human Message</h3>
              <p className="text-lg">{renderHumanMessage()}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/schema/${params.uid}`}>
              <Button variant="outline" className="border-zinc-700">
                Back to Schema
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
                View All Attestations
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Link
          href={`/schema/${params.uid}`}
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schema
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter">
          Create Attestation
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3">
          <div className="flex flex-col p-3 border border-zinc-700 rounded-md bg-zinc-900/50">
            <p className="text-zinc-400">{schema.schema_name}</p>
            <p className="text-xs text-zinc-500">{params.uid}</p>
          </div>
          {/* <Badge className="bg-green-900/20 text-green-400 border-green-800 md:ml-2">
            Cost: 0.01 SOL
          </Badge> */}
        </div>
      </div>

      {/* Wallet connection check */}
      {/* {!wallet.connected && (
        <Alert className="bg-amber-900/20 border-amber-800 text-amber-100">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            You need to connect your Solana wallet to create an attestation.
          </AlertDescription>
        </Alert>
      )} */}

      {!showHumanMessage ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Fill Attestation Details</CardTitle>
            <CardDescription>
              Complete all fields to create an attestation using this schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemaFields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="flex items-center gap-1"
                    >
                      {field.name}
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 text-xs",
                          field.type.toLowerCase().includes("string")
                            ? "bg-blue-900/20 border-blue-800 text-blue-400"
                            : "",
                          field.type.toLowerCase().includes("number") ||
                            field.type.toLowerCase().includes("integer")
                            ? "bg-purple-900/20 border-purple-800 text-purple-400"
                            : "",
                          field.type.toLowerCase().includes("boolean")
                            ? "bg-green-900/20 border-green-800 text-green-400"
                            : "",
                        )}
                      >
                        {field.type}
                      </Badge>
                    </Label>
                    {field.type.toLowerCase().includes("string") && (
                      <Input
                        id={field.name}
                        value={formValues[field.name] || ""}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={`Enter ${field.name}`}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    )}
                    {(field.type.toLowerCase().includes("number") ||
                      field.type.toLowerCase().includes("integer")) && (
                      <Input
                        id={field.name}
                        type="number"
                        value={formValues[field.name] || ""}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={`Enter ${field.name}`}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    )}
                    {field.type.toLowerCase().includes("boolean") && (
                      <Select
                        value={formValues[field.name] || ""}
                        onValueChange={(value) =>
                          handleInputChange(field.name, value)
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          className="bg-zinc-900 border-zinc-800"
                        >
                          <SelectValue placeholder={`Select ${field.name}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          <SelectItem value="true" className="text-white">
                            True
                          </SelectItem>
                          <SelectItem value="false" className="text-white">
                            False
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>

              <Alert className="bg-zinc-800 border-zinc-700">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  By creating this attestation, you are confirming that all
                  provided information is accurate and can be verified on the
                  Solana blockchain.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                  disabled={!allFieldsFilled}
                >
                  Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Confirm Attestation</CardTitle>
            <CardDescription>
              Review the human-readable message before creating the attestation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-zinc-800 rounded-md border border-zinc-700">
              <h2 className="text-xl font-medium mb-4">Human Message</h2>
              <p className="text-xl">{renderHumanMessage()}</p>
            </div>

            <Alert className="bg-zinc-800 border-zinc-700">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Blockchain attestation</AlertTitle>
              <AlertDescription>
                Creating this attestation will store it permanently on the
                Solana blockchain.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => setShowHumanMessage(false)}
              variant="outline"
              className="border-zinc-700"
            >
              Edit Fields
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
              onClick={handleCreateAttestation}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Attestation"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
}
