import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Zap,
  Code,
  Building,
  Wallet,
  ChevronRight,
  Github,
  Twitter,
  ExternalLink,
  Menu,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-black text-white relative overflow-hidden">
      {/* Add global background gradient elements with animations */}
      <div className="fixed -top-[30vh] -left-[30vw] w-[80vw] h-[80vh] bg-[#C00000] rounded-full opacity-[0.03] blur-[120px] pointer-events-none animate-gradient-pulse"></div>
      <div className="fixed -bottom-[30vh] -right-[30vw] w-[80vw] h-[80vh] bg-[#4A90E2] rounded-full opacity-[0.03] blur-[120px] pointer-events-none animate-gradient-pulse"></div>
      <div className="fixed top-[20vh] right-[10vw] w-[40vw] h-[40vh] bg-[#C00000] rounded-full opacity-[0.02] blur-[100px] pointer-events-none animate-gradient-rotate"></div>
      <div className="fixed bottom-[30vh] left-[20vw] w-[30vw] h-[30vh] bg-[#4A90E2] rounded-full opacity-[0.02] blur-[100px] pointer-events-none animate-gradient-rotate"></div>
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#C00000]/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-md opacity-70 blur-[2px]"></div>
              <div className="relative z-10 text-white font-bold text-xl">A</div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              ASSAP
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#problems" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Problems
            </Link>
            <Link href="#solution" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Solution
            </Link>
            <Link href="#comparison" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Comparison
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#use-cases" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Use Cases
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
              <span className="relative z-10 flex items-center">
                Go to Explorer <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Button>
            <button className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
          <div className="absolute -top-40 -left-40 w-[60vw] h-[60vh] bg-[#C00000] rounded-full filter blur-[120px] opacity-[0.07]"></div>
          <div className="absolute -bottom-40 -right-40 w-[60vw] h-[60vh] bg-[#4A90E2] rounded-full filter blur-[120px] opacity-[0.07]"></div>
          <div className="absolute top-1/4 right-1/4 w-[20vw] h-[20vh] bg-[#C00000] rounded-full filter blur-[80px] opacity-[0.05] animate-pulse"></div>
          <div className="container flex flex-col items-center text-center relative z-10">
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-xl opacity-70 blur-[5px]"></div>
              <div className="relative z-10 text-white font-bold text-6xl">A</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Attestations, for the real
            </h1>
            <p className="max-w-[700px] text-xl text-zinc-400 mb-8">
              Real people. Real attestations. Anti-Sybil protection with human-readability.
            </p>
            <Button size="lg" className="relative overflow-hidden group text-lg px-8 py-6 rounded-md">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
              <span className="relative z-10 flex items-center">
                Go to Explorer <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/50 to-transparent"></div>
          <div className="absolute top-1/3 -left-20 w-[40vw] h-[40vh] bg-[#C00000] rounded-full filter blur-[100px] opacity-[0.04]"></div>
          <div className="absolute bottom-0 right-0 w-[30vw] h-[30vh] bg-[#4A90E2] rounded-full filter blur-[100px] opacity-[0.04]"></div>
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Redefining Trust On-Chain
            </h2>
            <div className="max-w-3xl mx-auto">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <li className="bg-black p-6 rounded-lg border border-transparent hover:border-[#4A90E2] transition-colors relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-[#C00000]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Sybil-resistant verification</h3>
                    <p className="text-zinc-400">Multiple verification methods to ensure one person, one identity.</p>
                  </div>
                </li>
                <li className="bg-black p-6 rounded-lg border border-transparent hover:border-[#4A90E2] transition-colors relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-[#C00000]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customizable, human-readable</h3>
                    <p className="text-zinc-400">Attestations that make sense to both users and machines.</p>
                  </div>
                </li>
                <li className="bg-black p-6 rounded-lg border border-transparent hover:border-[#4A90E2] transition-colors relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-4">
                      <Code className="h-6 w-6 text-[#C00000]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Built natively for Solana</h3>
                    <p className="text-zinc-400">Optimized for speed, low cost, and seamless integration.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Problems & Solutions Section */}
        <section id="problems" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/50 to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-[40vw] h-[40vh] bg-[#4A90E2] rounded-full filter blur-[100px] opacity-[0.04]"></div>
          <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vh] bg-[#C00000] rounded-full filter blur-[100px] opacity-[0.04]"></div>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#C00000]">
                  Today's Problems
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-[#C00000]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Fragmented KYC standards</h3>
                      <p className="text-zinc-400">
                        Users repeat verification processes across platforms, wasting time and exposing data.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-[#C00000]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Poor readability of attestations</h3>
                      <p className="text-zinc-400">
                        Current attestations lack context and human readability, limiting their usefulness.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-[#C00000]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Weak identity proofs</h3>
                      <p className="text-zinc-400">
                        Existing solutions fail to provide strong guarantees against Sybil attacks.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div id="solution">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#4A90E2]">
                  How ASSAP Fixes It
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-[#4A90E2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Modular sybil protection</h3>
                      <p className="text-zinc-400">
                        Flexible verification methods that can be combined for stronger identity assurance.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-[#4A90E2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">zk integrations and flexible schemas</h3>
                      <p className="text-zinc-400">
                        Privacy-preserving verification that protects user data while ensuring trust.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0">
                      <Code className="h-5 w-5 text-[#4A90E2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Enterprise and dev-friendly tooling</h3>
                      <p className="text-zinc-400">
                        Simple APIs and SDKs that make integration seamless for any organization.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/50 to-transparent"></div>
          <div className="absolute top-0 left-1/3 w-[40vw] h-[40vh] bg-[#C00000] rounded-full filter blur-[100px] opacity-[0.03]"></div>
          <div className="absolute bottom-0 right-1/3 w-[30vw] h-[30vh] bg-[#4A90E2] rounded-full filter blur-[100px] opacity-[0.03]"></div>
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Competitive Analysis
            </h2>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-[#C00000]/50 via-[#4A90E2]/50 to-[#C00000]/50">
                <Table className="rounded-lg overflow-hidden">
                  <TableHeader>
                    <TableRow className="border-b border-zinc-800">
                      <TableHead className="w-[200px] bg-black">Features</TableHead>
                      <TableHead className="text-center bg-gradient-to-r from-[#C00000]/20 to-[#4A90E2]/20 text-white">
                        ASSAP
                      </TableHead>
                      <TableHead className="text-center bg-black">Gitcoin Passport</TableHead>
                      <TableHead className="text-center bg-black">EAS</TableHead>
                      <TableHead className="text-center bg-black">Sign Protocol</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="font-medium bg-black">Sybil Resistance</TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-[#C00000] mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <XCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <XCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="font-medium bg-black">Customizability</TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-[#C00000] mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <XCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="font-medium bg-black">Human Readability</TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-[#C00000] mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <XCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <XCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center bg-black">
                        <CheckCircle className="h-5 w-5 text-zinc-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-black">Chain Support</TableCell>
                      <TableCell className="text-center bg-black">Solana Native</TableCell>
                      <TableCell className="text-center bg-black">Multi-chain</TableCell>
                      <TableCell className="text-center bg-black">Ethereum</TableCell>
                      <TableCell className="text-center bg-black">Ethereum</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/50 to-transparent"></div>
          <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vh] bg-[#4A90E2] rounded-full filter blur-[100px] opacity-[0.03]"></div>
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-[#C00000] rounded-full filter blur-[100px] opacity-[0.03]"></div>
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              How It Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000] to-[#C00000]/70 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="pt-20 text-center bg-black p-6 rounded-lg border border-transparent group hover:border-[#4A90E2] transition-colors h-full relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3">Select schema</h3>
                      <p className="text-zinc-400">
                        Choose from pre-built verification templates or create your own custom schema.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000] to-[#C00000]/70 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="pt-20 text-center bg-black p-6 rounded-lg border border-transparent group hover:border-[#4A90E2] transition-colors h-full relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3">Verify identity</h3>
                      <p className="text-zinc-400">
                        Complete the required verification steps through our simple, user-friendly interface.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000] to-[#C00000]/70 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="pt-20 text-center bg-black p-6 rounded-lg border border-transparent group hover:border-[#4A90E2] transition-colors h-full relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3">Create attestations</h3>
                      <p className="text-zinc-400">
                        Generate and store your attestation on Solana with minimal fees and maximum security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/50 to-transparent"></div>
          <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[#C00000] rounded-full filter blur-[100px] opacity-[0.03]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-[30vw] h-[30vh] bg-[#4A90E2] rounded-full filter blur-[100px] opacity-[0.03]"></div>
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-black border-transparent group hover:border-[#4A90E2] transition-colors relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center mb-2">
                    <Wallet className="h-6 w-6 text-[#4A90E2]" />
                  </div>
                  <CardTitle>Solana Users</CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-400 relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Secure governance voting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Verified delegations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Sybil-resistant airdrops</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-black border-transparent group hover:border-[#4A90E2] transition-colors relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-[#4A90E2]" />
                  </div>
                  <CardTitle>Institutions</CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-400 relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Digital certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Legal document verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Compliance automation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-black border-transparent group hover:border-[#4A90E2] transition-colors relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center mb-2">
                    <Code className="h-6 w-6 text-[#4A90E2]" />
                  </div>
                  <CardTitle>Developers</CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-400 relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Easy API integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Custom verification flows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#C00000] flex-shrink-0 mt-0.5" />
                      <span>Composable attestation schemas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Revenue Model Section */}
        <section id="pricing" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/50 to-transparent"></div>
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Revenue Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="bg-black border-transparent group hover:border-[#4A90E2] transition-colors relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Cost per verification score</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-zinc-400 mb-4">
                    Pay only for what you use with our simple per-verification pricing model.
                  </p>
                  <p className="text-3xl font-bold text-[#C00000]">$0.10 - $1.00</p>
                  <p className="text-sm text-zinc-500">per verification</p>
                  <Button className="w-full mt-6 relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-black border-transparent group hover:border-[#4A90E2] transition-colors relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Enterprise subscriptions</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-zinc-400 mb-4">
                    Full customization options for large organizations with high-volume verification needs.
                  </p>
                  <p className="text-3xl font-bold text-[#C00000]">Custom</p>
                  <p className="text-sm text-zinc-500">contact for pricing</p>
                  <Button className="w-full mt-6 relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
                    <span className="relative z-10">Contact Sales</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vision Timeline Section */}
        <section id="vision" className="py-20 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/50 to-transparent"></div>
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Our Vision
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative border-l-2 border-gradient-to-b from-[#C00000] to-[#4A90E2] pl-8 pb-12">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#C00000]"></div>
                <h3 className="text-xl font-bold mb-2">Now: Onchain attestations</h3>
                <p className="text-zinc-400">
                  Launching our core platform with Solana-native attestations and basic Sybil resistance.
                </p>
              </div>
              <div className="relative border-l-2 border-[#4A90E2] pl-8 pb-12">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#4A90E2]"></div>
                <h3 className="text-xl font-bold mb-2">Near Future: Offchain privacy attestations</h3>
                <p className="text-zinc-400">
                  Expanding our platform with offchain capabilities and integrating with additional identity providers
                  for stronger verification.
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#4A90E2]"></div>
                <h3 className="text-xl font-bold mb-2">Future: Global standards for real-world notarization</h3>
                <p className="text-zinc-400">
                  Building a comprehensive Sybil resistance framework with real-world notarization capabilities and
                  global identity scoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/10 to-[#4A90E2]/10"></div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4A90E2] to-[#C00000]"></div>
          <div className="absolute -top-40 -left-40 w-[80vw] h-[80vh] bg-[#C00000] rounded-full filter blur-[120px] opacity-[0.08]"></div>
          <div className="absolute -bottom-40 -right-40 w-[80vw] h-[80vh] bg-[#4A90E2] rounded-full filter blur-[120px] opacity-[0.08]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-gradient-to-br from-[#C00000]/5 to-[#4A90E2]/5 rounded-full filter blur-[80px]"></div>
          <div className="container text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Ready to get started?
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-8 text-white/90">
              Join the next generation of attestation technology and build trust into your applications.
            </p>
            <Button size="lg" className="relative overflow-hidden group text-lg px-8 py-6">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
              <span className="relative z-10 flex items-center">
                Go to Explorer <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-black border-t border-zinc-900 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#C00000]/30 via-[#4A90E2]/30 to-[#C00000]/30"></div>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-md opacity-70 blur-[2px]"></div>
                <div className="relative z-10 text-white font-bold text-xl">A</div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                ASSAP
              </span>
            </div>
            <div className="flex gap-6 mb-6 md:mb-0">
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors group">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C00000]/0 to-[#4A90E2]/0 group-hover:from-[#C00000]/20 group-hover:to-[#4A90E2]/20 rounded-full transition-all duration-300"></div>
                  <Github className="h-5 w-5 relative z-10" />
                </div>
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors group">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C00000]/0 to-[#4A90E2]/0 group-hover:from-[#C00000]/20 group-hover:to-[#4A90E2]/20 rounded-full transition-all duration-300"></div>
                  <Twitter className="h-5 w-5 relative z-10" />
                </div>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <div className="text-sm text-zinc-500">Built for the Solana Hackathon 2025</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
