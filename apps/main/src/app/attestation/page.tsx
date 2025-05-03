"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { JsonViewer } from "@/components/json-viewer"
import { DataTable } from "@/components/ui/data-table"

// Mock data
const attestationDetail = {
  uid: "att_01234567890123456789",
  schema: "Identity Verification",
  schemaUid: "sch_01234567890123456789",
  from: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  to: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a0",
  type: "KYC",
  created: "2023-04-15T14:30:00Z",
  createdBy: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  transactionId: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t",
  rawSchema: {
    name: "Identity Verification",
    description: "Verifies the identity of an individual",
    properties: {
      fullName: {
        type: "string",
        description: "Full legal name",
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        description: "Date of birth",
      },
      nationality: {
        type: "string",
        description: "Country of citizenship",
      },
      idType: {
        type: "string",
        enum: ["passport", "national_id", "drivers_license"],
        description: "Type of identification document",
      },
      idNumber: {
        type: "string",
        description: "Identification document number",
      },
      verificationLevel: {
        type: "integer",
        minimum: 1,
        maximum: 3,
        description: "Level of verification (1-3)",
      },
    },
    required: ["fullName", "dateOfBirth", "nationality", "idType", "idNumber"],
  },
}

// Mock related attestations
const relatedAttestations = [
  {
    uid: "att_23456789012345678901",
    schema: "Identity Verification",
    from: "0x9g0...1h2i",
    to: "0x3j4...5k6l",
    type: "KYC",
    created: "2023-04-14T09:15:00Z",
  },
  {
    uid: "att_34567890123456789012",
    schema: "Identity Verification",
    from: "0x7m8...9n0o",
    to: "0x1p2...3q4r",
    type: "KYC",
    created: "2023-04-13T16:45:00Z",
  },
  {
    uid: "att_45678901234567890123",
    schema: "Identity Verification",
    from: "0x5s6...7t8u",
    to: "0x9v0...1w2x",
    type: "KYC",
    created: "2023-04-12T11:20:00Z",
  },
]

const columns = [
  {
    key: "uid",
    title: "UID",
    render: (value: string) => (
      <Link href={`/attestation/${value}`} className="text-blue-400 hover:underline font-mono text-sm">
        {value}
      </Link>
    ),
  },
  { key: "schema", title: "Schema" },
  {
    key: "from",
    title: "From",
    render: (value: string) => <span className="font-mono text-sm">{value}</span>,
  },
  {
    key: "to",
    title: "To",
    render: (value: string) => <span className="font-mono text-sm">{value}</span>,
  },
  { key: "type", title: "Type" },
  {
    key: "created",
    title: "Created",
    render: (value: string) => <span>{new Date(value).toLocaleString()}</span>,
  },
]

export default function AttestationDetailPage({ params }: { params: { uid: string } }) {
  // In a real app, you would fetch the attestation data using the UID
  const attestation = attestationDetail

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Attestations
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter">Attestation Details</h1>
        <p className="text-zinc-400 mt-1 font-mono">{params.uid}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="gradient-border bg-zinc-900 p-4">
            <h2 className="text-xl font-bold mb-4">Attestation Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Created</span>
                <span>{new Date(attestation.created).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Creator</span>
                <span className="font-mono text-sm truncate max-w-[250px]" title={attestation.createdBy}>
                  {attestation.createdBy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Transaction ID</span>
                <Link
                  href={`https://explorer.solana.com/tx/${attestation.transactionId}`}
                  target="_blank"
                  className="font-mono text-sm text-blue-400 hover:underline flex items-center"
                >
                  {attestation.transactionId.substring(0, 10)}...
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Schema</span>
                <Link href={`/schema/${attestation.schemaUid}`} className="text-blue-400 hover:underline">
                  {attestation.schema}
                </Link>
              </div>
            </div>
          </div>

          <div className="gradient-border bg-zinc-900 p-4">
            <h2 className="text-xl font-bold mb-4">Raw Schema</h2>
            <JsonViewer data={attestation.rawSchema} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Attestations Using Same Schema</h2>
          <DataTable columns={columns} data={relatedAttestations} onRowClick={(row) => console.log(row)} />
        </div>
      </div>
    </div>
  )
}
