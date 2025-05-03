import type React from "react"
import type { Metadata } from "next"
import { Inter, Darker_Grotesque } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  variable: "--font-darker-grotesque",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "ASSAP | Solana Attestation Protocol",
  description: "Web3 interface for Solana-based attestation protocol",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${darkerGrotesque.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-black text-white">
            <Header />
            <main className="flex-1 p-6 md:p-8 overflow-auto max-w-7xl mx-auto w-full">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
