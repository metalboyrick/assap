"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Database, Users, Plus } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // You can use a Skeleton component from your UI library or create a custom one

export default function SchemasPage() {
  const [schemas, setSchemas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch schemas from the API
  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await axios.get("/api/schemas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }); // Replace with your actual API endpoint
        setSchemas(response.data);
      } catch (error) {
        console.error("Error fetching schemas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemas();
  }, []);

  // Define columns based on the data structure from your API
  const columns = [
    {
      key: "schema_uid",
      title: "UID",
      render: (value: string) => (
        <Link
          href={`/schema/${value}`}
          className="text-blue-400 hover:underline font-mono text-sm"
        >
          {value.length > 8
            ? `${value.substring(0, 5)}...${value.substring(value.length - 5)}`
            : value}
        </Link>
      ),
    },
    {
      key: "schema_name", // Assuming schema_name exists in the data
      title: "Schema Name",
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: "creator_uid",
      title: "Creator",
      render: (value: string) => (
        <span className="font-mono text-sm">
          {value.length > 8
            ? `${value.substring(0, 5)}...${value.substring(value.length - 5)}`
            : value}
        </span>
      ),
    },
    // {
    //   key: "human_message_template",
    //   title: "Attestation Message",
    //   render: (value: number) => <span>{value}</span>,
    // },
    // {
    //   key: "creation_cost",
    //   title: "Cost",
    //   render: (value: string) => <span>{value}</span>,
    // },
    {
      key: "creation_timestamp", // Assuming creation_date exists in the data
      title: "Created",
      render: (value: string) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return <span>Invalid Date</span>;
        }

        // Custom date formatting: yyyy-mm-dd hh:mm:ss
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

        return <span>{formattedDate}</span>;
      },
    },
  ];

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

      {/* Skeleton Loader for Stats Card */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Skeleton className="h-12 w-1/2" />
        ) : (
          <StatsCard
            title="Total Schemas"
            value={schemas.length.toString()}
            icon={<Database className="h-5 w-5" />}
          />
        )}
      </div>

      {/* Skeleton Loader for Data Table */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={[...schemas].sort(
            (a, b) =>
              new Date(b.creation_timestamp).getTime() -
              new Date(a.creation_timestamp).getTime(),
          )}
          onRowClick={(row) => console.log(row)}
          searchKey="schema_name"
        />
      )}
    </div>
  );
}
