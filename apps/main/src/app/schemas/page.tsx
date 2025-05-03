"use client"

import Link from "next/link"
import { Database, Users, Plus } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

// Mock data
const schemas = [
  {
    id: 1,
    uid: "sch_01234567890123456789",
    name: "Identity Verification",
    attestations: 156,
    cost: "0.01 SOL",
  },
  {
    id: 2,
    uid: "sch_23456789012345678901",
    name: "Credit Score",
    attestations: 89,
    cost: "0.02 SOL",
  },
  {
    id: 3,
    uid: "sch_34567890123456789012",
    name: "DAO Membership",
    attestations: 245,
    cost: "0.03 SOL",
  },
  {
    id: 4,
    uid: "sch_45678901234567890123",
    name: "NFT Ownership",
    attestations: 112,
    cost: "0.04 SOL",
  },
  {
    id: 5,
    uid: "sch_56789012345678901234",
    name: "Developer Reputation",
    attestations: 78,
    cost: "0.05 SOL",
  },
  {
    id: 6,
    uid: "sch_67890123456789012345",
    name: "Event Attendance",
    attestations: 203,
    cost: "0.06 SOL",
  },
  {
    id: 7,
    uid: "sch_78901234567890123456",
    name: "Content Creation",
    attestations: 67,
    cost: "0.07 SOL",
  },
]

const columns = [
  { key: "id", title: "#" },
  {
    key: "uid",
    title: "UID",
    render: (value: string) => (
      <Link href={`/schema/${value}`} className="text-blue-400 hover:underline font-mono text-sm">
        {value}
      </Link>
    ),
  },
  { key: "name", title: "Schema Name" },
  { key: "attestations", title: "# of Attestations" },
  {
    key: "cost",
    title: "Cost",
    render: (value: string) => <span>{value}</span>,
  },
]

export default function SchemasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tighter">Schemas</h1>
        <Link href="/create-schema">
          <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Schema
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard title="Total Schemas" value="42" icon={<Database className="h-5 w-5" />} />
        <StatsCard title="Unique Creators" value="28" icon={<Users className="h-5 w-5" />} />
      </div>

      <DataTable columns={columns} data={schemas} onRowClick={(row) => console.log(row)} searchKey="name" />
    </div>
  )
}
