import type React from "react";
import "@/app/globals.css";
import { Archivo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-providers";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "ASSAP - Anti Sybil Solana Attestation Protocol",
  description:
    "Real people. Real attestations. Anti-Sybil protection with human-readability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${archivo.className} font-sans bg-black text-white antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
