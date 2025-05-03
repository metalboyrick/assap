"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Data types available for schema fields
const dataTypes = ["string", "integer", "boolean", "string[]", "integer[]", "boolean[]"]

interface SchemaField {
  name: string
  type: string
  required: boolean
}

export default function CreateSchemaPage() {
  const [schemaName, setSchemaName] = useState("")
  const [humanMessage, setHumanMessage] = useState("")
  const [costEstimate, setCostEstimate] = useState("")
  const [fields, setFields] = useState<SchemaField[]>([{ name: "", type: "", required: true }])
  const [selectedVerifications, setSelectedVerifications] = useState<string[]>([])

  const verificationOptions = [
    { id: "email", label: "Email" },
    { id: "human", label: "Human Verifier" },
    { id: "solana_balance", label: "Solana Balance" },
    { id: "solana_transactions", label: "Solana Minimum Transactions" },
    { id: "solana_name", label: "Solana Name" },
    { id: "twitter", label: "Twitter" },
  ]

  const addField = () => {
    setFields([...fields, { name: "", type: "", required: true }])
  }

  const removeField = (index: number) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  const updateField = (index: number, field: Partial<SchemaField>) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], ...field }
    setFields(newFields)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating schema:", {
      name: schemaName,
      humanMessage,
      costEstimate,
      fields,
      verifications: selectedVerifications,
    })
    // In a real app, you would submit this to your API
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Link href="/schemas" className="inline-flex items-center text-zinc-400 hover:text-white mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schemas
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter">Create Schema</h1>
        <p className="text-zinc-400 mt-1">Define a new schema for attestations</p>
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

          <div className="space-y-2">
            <Label htmlFor="human-message">Human Message Template</Label>
            <Textarea
              id="human-message"
              value={humanMessage}
              onChange={(e) => setHumanMessage(e.target.value)}
              placeholder="{var} declare that {var} is approved by {var}"
              className="bg-zinc-900 border-zinc-800 h-24"
              required
            />
            <p className="text-xs text-zinc-400">
              Use &#123;var&#125; to define variables that will be replaced with field values.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost-estimate">Cost Estimate (SOL)</Label>
            <Input
              id="cost-estimate"
              type="number"
              step="0.001"
              value={costEstimate}
              onChange={(e) => setCostEstimate(e.target.value)}
              placeholder="e.g., 0.01"
              className="bg-zinc-900 border-zinc-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Verification Requirements</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-zinc-800 rounded-md bg-zinc-900">
              {verificationOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedVerifications.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedVerifications([...selectedVerifications, option.id])
                      } else {
                        setSelectedVerifications(selectedVerifications.filter((id) => id !== option.id))
                      }
                    }}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Schema Fields</h2>
          </div>

          {fields.map((field, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-zinc-800 rounded-md bg-zinc-900"
            >
              <div className="space-y-2">
                <Label htmlFor={`field-name-${index}`}>Field Name</Label>
                <Input
                  id={`field-name-${index}`}
                  value={field.name}
                  onChange={(e) => updateField(index, { name: e.target.value })}
                  placeholder="e.g., fullName"
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`field-type-${index}`}>Data Type</Label>
                <Select value={field.type} onValueChange={(value) => updateField(index, { type: value })}>
                  <SelectTrigger id={`field-type-${index}`} className="bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {dataTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-required-${index}`}
                    checked={field.required}
                    onCheckedChange={(checked) => updateField(index, { required: !!checked })}
                  />
                  <Label htmlFor={`field-required-${index}`}>Required</Label>
                </div>

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

        <Button
          type="submit"
          className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
          disabled={!schemaName || fields.some((f) => !f.name || !f.type)}
        >
          Create Schema
        </Button>
      </form>
    </div>
  )
}
