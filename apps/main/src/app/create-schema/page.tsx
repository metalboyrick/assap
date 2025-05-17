"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  IdentityVerifier,
  useSchemaProgram,
} from "@/data-access/schema-data-access";
import type { SchemaData } from "@assap-xyz/assap-sdk";
import { WalletButton } from "@/components/solana/solana-provider";

// Data types available for schema fields
const dataTypes = [
  "string",
  "integer",
  "boolean",
  "string[]",
  "integer[]",
  "boolean[]",
];

interface SchemaField {
  name: string;
  type: string;
}

export default function CreateSchemaPage() {
  const [schemaName, setSchemaName] = useState("");
  const [humanMessage, setHumanMessage] = useState("");
  const [fields, setFields] = useState<SchemaField[]>([{ name: "", type: "" }]);
  const [selectedVerifications, setSelectedVerifications] = useState<string[]>(
    [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { publicKey } = useWallet();
  const router = useRouter();
  const { registerSchema } = useSchemaProgram();

  const verificationOptions = [
    { id: IdentityVerifier.Email, label: "Email" },
    { id: IdentityVerifier.Human, label: "Human Verifier" },
    { id: IdentityVerifier.SolBalance, label: "Solana Balance" },
    { id: IdentityVerifier.SolMinTx, label: "Solana Minimum Transactions" },
    { id: IdentityVerifier.SolName, label: "Solana Name" },
    { id: IdentityVerifier.Twitter, label: "Twitter" },
  ];

  const addField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (index: number, field: Partial<SchemaField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      toast.error("Please connect your wallet to create a schema");
      return;
    }

    if (fields.some((f) => !f.name || !f.type)) {
      toast.error("Please fill in all field names and types");
      return;
    }

    try {
      setIsSubmitting(true);

      const schemaData = fields.map((field) => ({
        name: field.name,
        type: field.type,
        data: "",
      })) as SchemaData[];

      // Convert selected verifications to IdentityVerifier enum
      const verifiers = selectedVerifications as IdentityVerifier[];

      await registerSchema.mutateAsync({
        payer: publicKey,
        schemaData,
        schemaName,
        issuerVerifiers: verifiers,
        attesteeVerifiers: verifiers,
        humanMessage,
      });

      toast.success("Schema created successfully!");
      router.push("/schemas");
    } catch (error) {
      console.error("Error creating schema:", error);
      toast.error("Failed to create schema");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/schemas"
            className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schemas
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter">Create Schema</h1>
          <p className="text-zinc-400 mt-1">
            Define a new schema for attestations
          </p>
        </div>
        <WalletButton />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="schema-name">Schema Name</Label>
            <Input
              id="schema-name"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              placeholder="e.g., Identity Verification"
              className="bg-zinc-900 border-zinc-800"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Schema Fields</h2>
            </div>

            {fields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-zinc-800 rounded-md bg-zinc-900"
              >
                <div className="space-y-2">
                  <Label htmlFor={`field-name-${index}`}>Field Name</Label>
                  <Input
                    id={`field-name-${index}`}
                    value={field.name}
                    onChange={(e) =>
                      updateField(index, { name: e.target.value })
                    }
                    placeholder="e.g., fullName"
                    className="bg-zinc-900 border-zinc-800"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`field-type-${index}`}>Data Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateField(index, { type: value })
                    }
                  >
                    <SelectTrigger
                      id={`field-type-${index}`}
                      className="bg-zinc-900 border-zinc-800"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {dataTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-end">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeField(index)}
                      className="bg-red-900 hover:bg-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addField}
              className="w-full border-dashed border-zinc-700 bg-transparent hover:bg-zinc-900"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="human-message">Human Message Template</Label>
            <Textarea
              id="human-message"
              value={humanMessage}
              onChange={(e) => setHumanMessage(e.target.value)}
              placeholder="{var} declare that {var} is approved by {var}"
              className="bg-zinc-900 border-zinc-800 h-24"
            />
            <p className="text-xs text-zinc-400">
              Use &#123;var&#125; to define variables that will be replaced with
              field values.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Verification Requirements</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-zinc-800 rounded-md bg-zinc-900">
              {verificationOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedVerifications.includes(option.id)}
                    onCheckedChange={(checked: boolean | "indeterminate") => {
                      if (checked) {
                        setSelectedVerifications([
                          ...selectedVerifications,
                          option.id,
                        ]);
                      } else {
                        setSelectedVerifications(
                          selectedVerifications.filter(
                            (id) => id !== option.id,
                          ),
                        );
                      }
                    }}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
          disabled={
            isSubmitting ||
            !schemaName ||
            fields.some((f) => !f.name || !f.type) ||
            !publicKey
          }
        >
          {isSubmitting ? "Creating..." : "Create Schema"}
        </Button>
      </form>
    </div>
  );
}
