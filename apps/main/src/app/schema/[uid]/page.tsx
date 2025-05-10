"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText, Calendar, Shield, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define types for schema and field
interface Field {
  name: string
  type: string
  required: boolean
}

interface Schema {
  name: string
  creation_timestamp: string
  creation_cost: string
  creator_uid: string
  transactionId: string
  schema_data: {
    fields: Field[]
  }
  human_message_template: string
  verification_requirements: {
    required: string[]
  }
}

export default function SchemaDetailPage({ params }: { params: { uid: string } }) {
  const [schema, setSchema] = useState<Schema | null>(null)

  useEffect(() => {
    async function fetchSchema() {
      const res = await fetch(`/api/schemas/${params.uid}`)
      const data = await res.json()
      setSchema(data)
    }
    fetchSchema()
  }, [params.uid])

  if (!schema) return <div className="text-white">Loading schema...</div>

  return (
    <div className="space-y-8">
      <div>
        <Link href="/schemas" className="inline-flex items-center text-zinc-400 hover:text-white mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schemas
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">{schema.name}</h1>
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
                <FileText className="mr-2 h-5 w-5 text-zinc-400" /> Schema Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Created</h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-zinc-500 mr-2" />
                    <span>{new Date(schema.creation_timestamp).toISOString().slice(0, 16).replace("T", " ")}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Cost</h3>
                  <div className="flex items-center mt-1">
                    <Tag className="h-4 w-4 text-zinc-500 mr-2" />
                    <span className="font-medium text-green-400">{schema.creation_cost}</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-zinc-400">Creator</h3>
                  <div className="flex items-center mt-1">
                    <span className="font-mono text-sm truncate" title={schema.creator_uid}>
                      {schema.creator_uid}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-zinc-400">Transaction ID</h3>
                  <div className="flex items-center mt-1">
                    <Link
                      href={`https://explorer.solana.com/tx/${schema.transactionId}`}
                      target="_blank"
                      className="font-mono text-sm text-blue-400 hover:underline flex items-center"
                    >
                      {schema.transactionId}
                      <ExternalLink className="ml-1 h-3 w-3" />
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
                      <TableHead className="text-zinc-400 w-1/3">Field Name</TableHead>
                      <TableHead className="text-zinc-400 w-1/3">Data Type</TableHead>
                      <TableHead className="text-zinc-400 w-1/3">Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schema.schema_data.fields.map((field: Field, index: number) => (
                      <TableRow key={index} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-mono">{field.name}</TableCell>
                        <TableCell>
                        <Badge
                            variant="outline"
                            className={cn(
                              "bg-zinc-800 border-zinc-700",
                              field.type.includes("string") ? "bg-blue-900/20 border-blue-800 text-blue-400" : "",
                              field.type.includes("integer") ? "bg-purple-900/20 border-purple-800 text-purple-400" : "",
                              field.type.includes("boolean") ? "bg-green-900/20 border-green-800 text-green-400" : ""
                            )}
                          >
                            {field.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {field.required ? (
                            <Badge className="bg-red-900/20 text-red-400 border-red-800">Required</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-zinc-800 text-zinc-400 border-zinc-700">
                              Optional
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Additional Information */}
        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Human Message Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-zinc-800 rounded-md font-mono text-sm border border-zinc-700">
                {schema.human_message_template}
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Variables in curly braces will be replaced with field values during attestation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Shield className="mr-2 h-5 w-5 text-zinc-400" /> Verification Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {schema.verification_requirements?.required?.map((verification: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-zinc-800 text-white border-zinc-700 px-3 py-1">
                    {verification}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <Link href={`/schema/${params.uid}/create-attestation`} className="w-full">
                <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
                  Create Attestation Using This Schema
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }
}
