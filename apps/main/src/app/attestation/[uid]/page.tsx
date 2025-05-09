"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const columns = [
  {
    key: "attestation_uid",
    title: "UID",
    render: (value: string) => (
      <Link href={`/attestation/${value}`} className="text-blue-400 hover:underline font-mono text-sm">
        {value}
      </Link>
    ),
  },
  { key: "schema_uid", title: "Schema" },
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
    key: "creation_date",
    title: "Created",
    render: (value: string) => <span>{new Date(value).toLocaleString()}</span>,
  },
]

export default function AttestationDetailPage({ params }: { params: { uid: string } }) {
  const [attestation, setAttestation] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchAttestation = async () => {
      try {
        const res = await fetch(`/api/attestations/${params.uid}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        setAttestation(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchAttestation()
  }, [params.uid])

  if (loading) return <p className="text-zinc-400">Loading attestation...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>
  if (!attestation) return <p className="text-zinc-400">No attestation found.</p>

  const schemaProperties = attestation.attestation_data?.properties || {}

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
                <span className="font-mono text-sm truncate max-w-[250px]" title={attestation.created_by}>
                  {attestation.created_by}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Transaction ID</span>
                <Link
                  href={`https://explorer.solana.com/tx/${attestation.transaction_id}`}
                  target="_blank"
                  className="font-mono text-sm text-blue-400 hover:underline flex items-center"
                >
                  {attestation.transaction_id ? `${attestation.transaction_id.substring(0, 10)}...` : "N/A"}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Schema</span>
                <Link href={`/schema/${attestation.schema_uid}`} className="text-blue-400 hover:underline">
                  {attestation.schema}
                </Link>
              </div>
            </div>
          </div>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Attestation Schema</CardTitle>
              <CardDescription>Field definitions for this attestation type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="text-zinc-400 w-1/4">Field</TableHead>
                      <TableHead className="text-zinc-400 w-1/4">Type</TableHead>
                      <TableHead className="text-zinc-400 w-1/2">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(schemaProperties).map(([fieldName, fieldData]: [string, any]) => (
                      <TableRow key={fieldName} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-mono font-medium">{fieldName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "bg-zinc-800 border-zinc-700",
                              fieldData.type === "string" && "bg-blue-900/20 border-blue-800 text-blue-400",
                              fieldData.type === "integer" && "bg-purple-900/20 border-purple-800 text-purple-400",
                              fieldData.type === "boolean" && "bg-green-900/20 border-green-800 text-green-400",
                              fieldData.type === "array" && "bg-amber-900/20 border-amber-800 text-amber-400",
                            )}
                          >
                            {fieldData.type}
                            {fieldData.format ? ` (${fieldData.format})` : ""}
                            {fieldData.enum ? " (enum)" : ""}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-zinc-300">{fieldData.description || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Attestations Using Same Schema</h2>
          <DataTable columns={columns} data={[]} onRowClick={(row) => console.log(row)} />
        </div>
      </div>
    </div>
  )
}
