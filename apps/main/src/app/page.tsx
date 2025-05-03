"use client"

import Link from "next/link"
import { FileText, Users } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { DataTable } from "@/components/ui/data-table"

// Mock data
const attestations = [
  {
    uid: "att_01234567890123456789",
    schema: "Identity Verification",
    schemaUid: "sch_01234567890123456789",
    from: "0x1a2...3b4c",
    to: "0x5d6...7e8f",
    type: "KYC",
    created: "2023-04-15T14:30:00Z",
  },
  {
    uid: "att_23456789012345678901",
    schema: "Credit Score",
    schemaUid: "sch_23456789012345678901",
    from: "0x9g0...1h2i",
    to: "0x3j4...5k6l",
    type: "Financial",
    created: "2023-04-14T09:15:00Z",
  },
  {
    uid: "att_34567890123456789012",
    schema: "DAO Membership",
    schemaUid: "sch_34567890123456789012",
    from: "0x7m8...9n0o",
    to: "0x1p2...3q4r",
    type: "Governance",
    created: "2023-04-13T16:45:00Z",
  },
  {
    uid: "att_45678901234567890123",
    schema: "NFT Ownership",
    schemaUid: "sch_45678901234567890123",
    from: "0x5s6...7t8u",
    to: "0x9v0...1w2x",
    type: "Asset",
    created: "2023-04-12T11:20:00Z",
  },
  {
    uid: "att_56789012345678901234",
    schema: "Developer Reputation",
    schemaUid: "sch_56789012345678901234",
    from: "0x3y4...5z6a",
    to: "0x7b8...9c0d",
    type: "Professional",
    created: "2023-04-11T13:50:00Z",
  },
  {
    uid: "att_67890123456789012345",
    schema: "Event Attendance",
    schemaUid: "sch_67890123456789012345",
    from: "0x1e2...3f4g",
    to: "0x5h6...7i8j",
    type: "Social",
    created: "2023-04-10T15:25:00Z",
  },
  {
    uid: "att_78901234567890123456",
    schema: "Content Creation",
    schemaUid: "sch_78901234567890123456",
    from: "0x9k0...1l2m",
    to: "0x3n4...5o6p",
    type: "Creative",
    created: "2023-04-09T10:10:00Z",
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
  {
    key: "schema",
    title: "Schema",
    render: (value: string, row: any) => (
      <Link href={`/schema/${row.schemaUid || "sch_default"}`} className="text-blue-400 hover:underline">
        {value}
      </Link>
    ),
  },
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
  {
    key: "created",
    title: "Created",
    render: (value: string) => <span>{new Date(value).toLocaleString()}</span>,
  },
]

export default function AttestationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tighter">Attestations</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard title="Total Attestations" value="1,234" icon={<FileText className="h-5 w-5" />} />
        <StatsCard title="Unique Attestors" value="567" icon={<Users className="h-5 w-5" />} />
      </div>

      <DataTable columns={columns} data={attestations} onRowClick={(row) => console.log(row)} searchKey="uid" />
    </div>
  )
}
