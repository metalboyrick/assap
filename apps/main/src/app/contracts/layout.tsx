"use client";

import { AssapProvider } from "@assap/assap-sdk";

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssapProvider>{children}</AssapProvider>;
}
