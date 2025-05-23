"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Users } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

export default function AttestationsPage() {
  const [attestations, setAttestations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch attestations from the API
  useEffect(() => {
    const fetchAttestations = async () => {
      try {
        const response = await fetch("/api/attestations");
        const data = await response.json();
        setAttestations(data);
      } catch (error) {
        console.error("Error fetching attestations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttestations();
  }, []);

  // Define columns based on the data structure from your API
  const columns = [
    {
      key: "attestation_uid",
      title: "UID",
      render: (value: string) => (
        <Link
          href={`/attestation/${value}`}
          className="text-blue-400 hover:underline font-mono text-sm"
        >
          {`${value.slice(0, 5)}...${value.slice(-5)}`}
        </Link>
      ),
    },
    {
      key: "schema_uid", // Assuming schema_name exists in the data
      title: "Schema",
      render: (value: string, row: any) => (
        <Link
          href={`/schema/${row.schema_uid || "sch_default"}`}
          className="text-blue-400 hover:underline font-mono text-sm"
        >
          {`${value.slice(0, 5)}...${value.slice(-5)}`}
        </Link>
      ),
    },
    // {
    //   key: "attestee_uid",
    //   title: "Attestee",
    //   render: (value: string) => (
    //     <span className="font-mono text-sm">{value}</span>
    //   ),
    // },
    {
      key: "attestor_uid",
      title: "Attestor",
      render: (value: string) => (
        <span className="font-mono text-sm">
          {`${value.slice(0, 5)}...${value.slice(-5)}`}
        </span>
      ),
    },
    {
      key: "creation_date", // Assuming created_at exists in the data
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
        <h1 className="text-4xl font-bold tracking-tighter">Attestations</h1>
      </div>

      {/* Skeleton Loader for Stats Card */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Skeleton className="h-12 w-1/2" />
        ) : (
          <StatsCard
            title="Total Attestations"
            value={attestations.length.toString()}
            icon={<FileText className="h-5 w-5" />}
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
          data={[...attestations].sort(
            (a, b) =>
              new Date(b.creation_date).getTime() -
              new Date(a.creation_date).getTime(),
          )}
          onRowClick={(row) => console.log(row)}
          searchKey="attestation_uid"
        />
      )}
    </div>
  );
}
