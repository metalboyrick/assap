"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Calendar,
  Shield,
  Tag,
  Wallet,
  Mail,
  Twitter as TwitterIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSchemaDataFromBlobId,
  SchemaData,
  IdentityVerifier,
} from "@assap/assap-sdk";
import { useCluster } from "@/components/cluster/cluster-data-access";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Define types for schema and field
interface Field {
  name: string;
  type: string;
  required: boolean;
}

interface SchemaMetadata {
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

// Helper to get display properties for verification methods
const getVerificationMethodDisplayProps = (method: IdentityVerifier) => {
  // The .toString() might produce something like "IdentityVerifier.Twitter" or just "Twitter"
  // We should try to get the core name.
  // const normalizedMethod = method.includes('.') ? method.split('.').pop() : method; // No longer needed as we pass IdentityVerifier directly

  switch (method) {
    case IdentityVerifier.SolBalance:
      return {
        Icon: Wallet,
        bgColor: "bg-purple-900/30",
        textColor: "text-purple-400",
        borderColor: "border-purple-800",
        label: "SOL Balance",
      };
    case IdentityVerifier.SolMinTx:
      return {
        Icon: Wallet,
        bgColor: "bg-purple-900/30",
        textColor: "text-purple-400",
        borderColor: "border-purple-800",
        label: "Min. SOL Transactions",
      };
    case IdentityVerifier.SolName:
      return {
        Icon: Wallet,
        bgColor: "bg-purple-900/30",
        textColor: "text-purple-400",
        borderColor: "border-purple-800",
        label: "SNS Name",
      };
    case IdentityVerifier.Twitter:
      return {
        Icon: TwitterIcon,
        bgColor: "bg-blue-900/30",
        textColor: "text-blue-400",
        borderColor: "border-blue-800",
        label: "Twitter",
      };
    case IdentityVerifier.Email:
      return {
        Icon: Mail,
        bgColor: "bg-red-900/30",
        textColor: "text-red-400",
        borderColor: "border-red-800",
        label: "Email",
      };
    default:
      // Attempt to get a string representation for unknown enum values
      const methodString = Object.keys(IdentityVerifier).find(
        (key) =>
          IdentityVerifier[key as keyof typeof IdentityVerifier] === method,
      );
      return {
        Icon: Shield, // Default icon
        bgColor: "bg-zinc-800",
        textColor: "text-white",
        borderColor: "border-zinc-700",
        label: methodString || "Unknown Method",
      };
  }
};

export default function SchemaDetailPage({
  params,
}: {
  params: { uid: string };
}) {
  const { cluster } = useCluster();

  const [schema, setSchema] = useState<SchemaMetadata | null>(null);
  const [schemaDataset, setSchemaDataset] = useState<SchemaDataset | null>(
    null,
  );

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

      setSchema(data);
      setSchemaDataset(_schemaDataset);
    }
    fetchSchema();
  }, [params.uid]);

  if (!schema) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/schemas"
            className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schemas
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="h-9 w-80 bg-zinc-800 animate-pulse rounded-md mb-2"></div>
              <div className="h-5 w-64 bg-zinc-800 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-zinc-400" />{" "}
                  <div className="h-6 w-36 bg-zinc-800 animate-pulse rounded-md"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">
                      Created
                    </h3>
                    <div className="mt-1">
                      <div className="h-5 w-36 bg-zinc-800 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-zinc-400">
                      Creator
                    </h3>
                    <div className="mt-1">
                      <div className="h-5 w-80 bg-zinc-800 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-zinc-400">
                      Transaction ID
                    </h3>
                    <div className="mt-1">
                      <div className="h-5 w-48 bg-zinc-800 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  <div className="h-6 w-32 bg-zinc-800 animate-pulse rounded-md"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="text-zinc-400 w-1/3">
                          Field Name
                        </TableHead>
                        <TableHead className="text-zinc-400 w-1/3">
                          Data Type
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow
                          key={index}
                          className="border-zinc-800 hover:bg-zinc-800/50"
                        >
                          <TableCell>
                            <div className="h-5 w-36 bg-zinc-800 animate-pulse rounded-md"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-6 w-24 bg-zinc-800 animate-pulse rounded-full"></div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column skeleton */}
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  <div className="h-6 w-48 bg-zinc-800 animate-pulse rounded-md"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-zinc-800 animate-pulse rounded-md"></div>
                <div className="h-4 w-3/4 bg-zinc-800 animate-pulse rounded-md mt-2"></div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-zinc-400" />{" "}
                  <div className="h-6 w-48 bg-zinc-800 animate-pulse rounded-md"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-8 w-28 bg-zinc-800 animate-pulse rounded-full"
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="h-10 bg-zinc-800 animate-pulse rounded-md"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/schemas"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schemas
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              {schema.schema_name}
            </h1>
            <p className="text-zinc-400 mt-1 font-mono">{params.uid}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Schema Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-zinc-400" /> Schema
                Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Created</h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-zinc-500 mr-2" />
                    <span>
                      {new Date(schema.creation_timestamp)
                        .toISOString()
                        .slice(0, 16)
                        .replace("T", " ")}
                    </span>
                  </div>
                </div>
                {/* <div>
                  <h3 className="text-sm font-medium text-zinc-400">Cost</h3>
                  <div className="flex items-center mt-1">
                    <Tag className="h-4 w-4 text-zinc-500 mr-2" />
                    <span className="font-medium text-green-400">
                      {schema.creation_cost}
                    </span>
                  </div>
                </div> */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-zinc-400">Creator</h3>
                  <div className="flex items-center mt-1">
                    <span
                      className="font-mono text-sm truncate"
                      title={schema.creator_uid}
                    >
                      {schema.creator_uid}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-zinc-400">
                    Transaction ID
                  </h3>
                  <div className="flex items-center mt-1">
                    <Link
                      href={`https://explorer.solana.com/tx/${schema.creation_transaction_id}?cluster=${cluster.name}`}
                      target="_blank"
                      className="font-mono text-sm text-blue-400 hover:underline flex items-center"
                    >
                      {schema.creation_transaction_id.length > 12
                        ? `${schema.creation_transaction_id.substring(0, 6)}...${schema.creation_transaction_id.substring(schema.creation_transaction_id.length - 6)}`
                        : schema.creation_transaction_id}
                      s <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Schema Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="text-zinc-400 w-1/3">
                        Field Name
                      </TableHead>
                      <TableHead className="text-zinc-400 w-1/3">
                        Data Type
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaDataset ? (
                      schemaDataset.schemaData.map(
                        (field: SchemaData, index: number) => (
                          <TableRow
                            key={index}
                            className="border-zinc-800 hover:bg-zinc-800/50"
                          >
                            <TableCell className="font-mono">
                              {field.name}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "border",
                                  field.type.toLowerCase().includes("string")
                                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                    : "",
                                  field.type.toLowerCase().includes("number") ||
                                    field.type.toLowerCase().includes("integer")
                                    ? "bg-green-900/30 text-green-400 border-green-800"
                                    : "",
                                  field.type.toLowerCase().includes("boolean")
                                    ? "bg-purple-900/30 text-purple-400 border-purple-800"
                                    : "",
                                  field.type.toLowerCase().includes("date")
                                    ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                    : "",
                                  field.type.toLowerCase().includes("array")
                                    ? "bg-red-900/30 text-red-400 border-red-800"
                                    : "",
                                  field.type.toLowerCase().includes("object")
                                    ? "bg-indigo-900/30 text-indigo-400 border-indigo-800"
                                    : "",
                                  !(
                                    field.type
                                      .toLowerCase()
                                      .includes("string") ||
                                    field.type
                                      .toLowerCase()
                                      .includes("number") ||
                                    field.type
                                      .toLowerCase()
                                      .includes("integer") ||
                                    field.type
                                      .toLowerCase()
                                      .includes("boolean") ||
                                    field.type.toLowerCase().includes("date") ||
                                    field.type
                                      .toLowerCase()
                                      .includes("array") ||
                                    field.type.toLowerCase().includes("object")
                                  )
                                    ? "bg-zinc-900/30 text-zinc-400 border-zinc-800"
                                    : "",
                                )}
                              >
                                {field.type}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ),
                      )
                    ) : (
                      <TableRow>
                        <TableCell>
                          <div className="h-5 w-36 bg-zinc-800 animate-pulse rounded-md"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-24 bg-zinc-800 animate-pulse rounded-full"></div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Additional Information */}
        <div className="space-y-6">
          {(schemaDataset?.humanMessage || "").length > 0 && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  Human Message Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-zinc-800 rounded-md font-mono text-sm border border-zinc-700">
                  {schemaDataset?.humanMessage}
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Variables in curly braces will be replaced with field values
                  during attestation.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Shield className="mr-2 h-5 w-5 text-zinc-400" /> Verification
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {schema.verification_requirements?.issuer_verifiers?.map(
                  (verification: IdentityVerifier, index: number) => {
                    const displayProps =
                      getVerificationMethodDisplayProps(verification);
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border", // Base styles for bigger badge
                          displayProps.bgColor,
                          displayProps.textColor,
                          displayProps.borderColor,
                        )}
                      >
                        <displayProps.Icon className="h-4 w-4" />
                        <span>{displayProps.label}</span>
                      </Badge>
                    );
                  },
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <Link
                href={`/schema/${params.uid}/create-attestation`}
                className="w-full"
              >
                <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
                  Create Attestation Using This Schema
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
