"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AttestationData,
  getAttestationDataFromBlobId,
  getSchemaDataFromBlobId,
  getSchemaById,
} from "@assap/assap-sdk";

const columns = [
  {
    key: "attestation_uid",
    title: "Transaction ID",
    render: (value: string) => (
      <Link
        href={`/attestation/${value}`}
        className="hover:underline text-blue-400"
        target="_blank"
      >
        <span className="font-mono text-sm">
          {value.length > 10
            ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
            : value}
        </span>
      </Link>
    ),
  },
  // { key: "schema_uid", title: "Schema" },
  {
    key: "attestee_uid",
    title: "Creator",
    render: (value: string) => (
      <Link href={`/schema/${value}`} className="hover:underline">
        <span className="font-mono text-sm">
          {value.length > 10
            ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
            : value}
        </span>
      </Link>
    ),
  },
  // {
  //   key: "to",
  //   title: "To",
  //   render: (value: string) => <span className="font-mono text-sm">{value}</span>,
  // },
  // { key: "type", title: "Type" },
  {
    key: "creation_date",
    title: "Created",
    render: (value: string) => (
      <span>
        {new Date(value).toISOString().slice(0, 16).replace("T", " ")}
      </span>
    ),
  },
];

export default function AttestationDetailPage({
  params,
}: {
  params: { uid: string };
}) {
  const [attestation, setAttestation] = useState<any | null>(null);
  const [attestationData, setAttestationData] =
    useState<AttestationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<any | null>(null);
  const [humanReadableMessage, setHumanReadableMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchAttestation = async () => {
      try {
        const res = await fetch(`/api/attestations/${params.uid}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();

        const _attestationData = await getAttestationDataFromBlobId(
          data.attestation_data,
        );

        setAttestation(data);
        setAttestationData(_attestationData);

        // Fetch schema data
        if (data.schema_uid) {
          const schemaMetadata = await getSchemaById(data.schema_uid);
          const schemaData = await getSchemaDataFromBlobId(
            schemaMetadata.schema_data,
          );
          setSchema(schemaMetadata);

          // Generate human-readable message
          if (schemaMetadata && _attestationData && schemaData) {
            try {
              const messageTemplate =
                schemaData.humanMessage || "Attestation for ${schema.name}";
              let message = messageTemplate;

              // Replace variables in the template
              for (const [key, value] of Object.entries(_attestationData)) {
                message = message.replace(`{${key}}`, String(value));
              }

              setHumanReadableMessage(message);
            } catch (err) {
              console.error("Error generating human-readable message:", err);
              setHumanReadableMessage(
                `Attestation for ${schemaMetadata.name || "Unknown Schema"}`,
              );
            }
          }
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAttestation();
  }, [params.uid]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Attestations
          </Link>
          <div className="h-9 w-80 bg-zinc-800 animate-pulse rounded-md mb-2"></div>
          <div className="h-5 w-64 bg-zinc-800 animate-pulse rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="gradient-border bg-zinc-900 p-4">
              <h2 className="text-xl font-bold mb-4">
                Attestation Information
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Created</span>
                  <div className="h-5 w-36 bg-zinc-800 animate-pulse rounded-md"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Creator</span>
                  <div className="h-5 w-52 bg-zinc-800 animate-pulse rounded-md"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Transaction ID</span>
                  <div className="h-5 w-40 bg-zinc-800 animate-pulse rounded-md"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Schema Name</span>
                  <div className="h-5 w-28 bg-zinc-800 animate-pulse rounded-md"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Schema ID</span>
                  <div className="h-5 w-28 bg-zinc-800 animate-pulse rounded-md"></div>
                </div>
              </div>
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Attestation Schema</CardTitle>
                <CardDescription>
                  Field definitions for this attestation type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="text-zinc-400 w-1/4">
                          Field
                        </TableHead>
                        <TableHead className="text-zinc-400 w-1/2">
                          Description
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
                          <TableCell colSpan={2}>
                            <div className="h-5 w-full bg-zinc-800 animate-pulse rounded-md"></div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Recent Attestations Using Same Schema
            </h2>
            <div className="h-64 bg-zinc-800/40 animate-pulse rounded-md border border-zinc-700">
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-7 bg-zinc-800 animate-pulse rounded-md"></div>
                  <div className="h-7 bg-zinc-800 animate-pulse rounded-md"></div>
                  <div className="h-7 bg-zinc-800 animate-pulse rounded-md"></div>
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <div className="h-5 bg-zinc-900 animate-pulse rounded-md"></div>
                    <div className="h-5 bg-zinc-900 animate-pulse rounded-md"></div>
                    <div className="h-5 bg-zinc-900 animate-pulse rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!attestation)
    return <p className="text-zinc-400">No attestation found.</p>;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Attestations
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter">
          Attestation Details
        </h1>
        <p className="text-zinc-400 mt-1 font-mono">{params.uid}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="gradient-border bg-zinc-900 p-4">
            <h2 className="text-xl font-bold mb-4">Attestation Information</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Created</span>
                <span>
                  {new Date(attestation.creation_date)
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Creator</span>
                <span
                  className="font-mono text-sm truncate max-w-[250px]"
                  title={attestation.attestee_uid}
                >
                  {attestation.attestee_uid}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Transaction ID</span>
                <Link
                  href={`https://explorer.solana.com/tx/${attestation.attestation_uid}`}
                  target="_blank"
                  className="font-mono text-sm text-blue-400 hover:underline flex items-center"
                >
                  {attestation.attestation_uid
                    ? `${attestation.attestation_uid.substring(0, 10)}...`
                    : "N/A"}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Schema Name</span>
                <span className="font-mono text-sm truncate max-w-[250px]">
                  {schema?.schema_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Schema</span>
                <Link
                  href={`/schema/${attestation.schema_uid}`}
                  className="text-blue-400 hover:underline font-mono text-sm"
                >
                  {attestation.schema_uid.length > 10
                    ? `${attestation.schema_uid.substring(0, 4)}...${attestation.schema_uid.substring(attestation.schema_uid.length - 4)}`
                    : attestation.schema_uid}
                </Link>
              </div>
            </div>
          </div>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Attestation Data</CardTitle>
              <CardDescription>
                Data that was attested to by the creator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="text-zinc-400 w-1/4">
                        Field
                      </TableHead>
                      <TableHead className="text-zinc-400 w-1/2">
                        Description
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attestationData &&
                      Object.entries(attestationData).map(
                        ([fieldName, value]: [string, any]) => (
                          <TableRow
                            key={fieldName}
                            className="border-zinc-800 hover:bg-zinc-800/50"
                          >
                            <TableCell className="font-mono font-medium">
                              {fieldName}
                            </TableCell>
                            <TableCell colSpan={2} className="text-zinc-300">
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {humanReadableMessage && humanReadableMessage.trim().length > 0 && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  Human Readable Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-mono">{humanReadableMessage}</p>
              </CardContent>
            </Card>
          )}

          <h2 className="text-xl font-bold">
            Recent Attestations Using Same Schema
          </h2>
          <DataTable
            columns={columns}
            data={attestation.related_attestations || []}
            onRowClick={(row) => {
              const typedRow = row as { attestation_uid: string };
              router.push(`/attestation/${typedRow.attestation_uid}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
