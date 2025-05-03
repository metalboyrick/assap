"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface DataTableProps<TData> {
  columns: {
    key: string
    title: string
    render?: (value: any, row: TData) => React.ReactNode
  }[]
  data: TData[]
  onRowClick?: (row: TData) => void
  searchKey?: string
}

export function DataTable<TData>({ columns, data, onRowClick, searchKey }: DataTableProps<TData>) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData =
    searchKey && searchQuery
      ? data.filter((row) =>
          String((row as any)[searchKey])
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : data

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white"
          />
        </div>
      )}
      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="text-zinc-400 font-medium">
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? "cursor-pointer hover:bg-zinc-900" : ""}
                >
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {column.render ? column.render((row as any)[column.key], row) : (row as any)[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
