import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-black text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed -top-[40vh] -left-[40vw] w-[100vw] h-[100vh] bg-[#C00000] rounded-full opacity-[0.02] blur-[150px] pointer-events-none"></div>
      <div className="fixed -bottom-[40vh] -right-[40vw] w-[100vw] h-[100vh] bg-[#4A90E2] rounded-full opacity-[0.02] blur-[150px] pointer-events-none"></div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#C00000]/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-md opacity-70 blur-[2px]"></div>
              <div className="relative z-10 text-white font-bold text-xl">
                A
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              ASSAP
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#about"
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#problems"
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Problems
            </Link>
            <Link
              href="#solution"
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Solution
            </Link>
            <Link
              href="#comparison"
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Comparison
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#use-cases"
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
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
        <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-gradient-to-b from-black to-zinc-900">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-[#4A90E2]/10 via-transparent to-transparent opacity-70"></div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4A90E2 0.5px, transparent 0.5px), linear-gradient(to right, #4A90E2 0.5px, transparent 0.5px)",
              backgroundSize: "50px 50px",
            }}
          ></div>

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Column - Content */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block">Anti-Sybil</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                    Attestation Protocol
                  </span>
                </h1>

                <p className="mt-6 text-xl md:text-2xl text-zinc-300 max-w-xl">
                  Empowering Solana with secure, decentralized identity
                  verification and attestations.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/app"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-[#C00000] to-[#4A90E2] text-white hover:opacity-90 transition-all shadow-lg shadow-[#4A90E2]/20"
                  >
                    <span>Get Started</span>
                    <svg
                      className="ml-2 -mr-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>

                  <a
                    href="#use-cases"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border border-zinc-700 bg-black/40 text-white hover:bg-black/60 hover:border-[#4A90E2] transition-all"
                  >
                    Learn More
                  </a>
                </div>

                <div className="mt-10 flex items-center gap-x-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-zinc-900 flex items-center justify-center bg-gradient-to-br ${
                          i % 2 === 0
                            ? "from-[#C00000] to-[#4A90E2]"
                            : "from-[#4A90E2] to-[#C00000]"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-zinc-400">
                    <span className="font-bold text-white">+1,200</span>{" "}
                    verified users
                  </p>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="relative lg:pl-10">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/60">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black animate-subtle-pulse"></div>

                  {/* Glowing orb */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-gradient-radial from-[#4A90E2]/40 to-transparent blur-xl animate-pulse"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    {/* Logo/Icon */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                        Secure Attestations
                      </h3>
                      <p className="mt-2 text-zinc-300">
                        Built on Solana for speed and affordability
                      </p>
                    </div>

                    {/* Animated rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div
                        className="absolute inset-0 border-2 border-[#4A90E2]/20 rounded-full animate-ping-slow"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="absolute inset-0 scale-[0.85] border-2 border-[#C00000]/20 rounded-full animate-ping-slow"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="absolute inset-0 scale-[0.7] border-2 border-[#4A90E2]/20 rounded-full animate-ping-slow"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Redefining Trust On-Chain
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              <div className="bg-black/50 p-8 rounded-xl border border-zinc-800 hover:border-[#4A90E2] transition-colors relative overflow-hidden group shadow-lg shadow-black/40 hover:shadow-[#4A90E2]/5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                    <Shield className="h-7 w-7 text-[#C00000]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Sybil-resistant verification
                  </h3>
                  <p className="text-lg text-zinc-300">
                    Multiple verification methods ensure one person, one
                    identity.
                  </p>
                </div>
              </div>

              <div className="bg-black/50 p-8 rounded-xl border border-zinc-800 hover:border-[#4A90E2] transition-colors relative overflow-hidden group shadow-lg shadow-black/40 hover:shadow-[#4A90E2]/5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                    <Zap className="h-7 w-7 text-[#C00000]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Human-readable</h3>
                  <p className="text-lg text-zinc-300">
                    Attestations that make sense to both users and machines.
                  </p>
                </div>
              </div>

              <div className="bg-black/50 p-8 rounded-xl border border-zinc-800 hover:border-[#4A90E2] transition-colors relative overflow-hidden group shadow-lg shadow-black/40 hover:shadow-[#4A90E2]/5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                    <Code className="h-7 w-7 text-[#C00000]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Native for Solana</h3>
                  <p className="text-lg text-zinc-300">
                    Optimized for speed, low cost, and seamless integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems & Solutions Section */}
        <section id="problems" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-black/50 p-8 rounded-xl border border-zinc-800">
                <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#C00000]">
                  Today&apos;s Problems
                </h2>
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertCircle className="h-6 w-6 text-[#C00000]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Fragmented KYC standards
                      </h3>
                      <p className="text-lg text-zinc-300">
                        Users repeat verification processes across platforms,
                        wasting time and exposing data.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertCircle className="h-6 w-6 text-[#C00000]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Poor readability of attestations
                      </h3>
                      <p className="text-lg text-zinc-300">
                        Current attestations lack context and human readability,
                        limiting their usefulness.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertCircle className="h-6 w-6 text-[#C00000]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Weak identity proofs
                      </h3>
                      <p className="text-lg text-zinc-300">
                        Existing solutions fail to provide strong guarantees
                        against Sybil attacks.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                id="solution"
                className="bg-black/50 p-8 rounded-xl border border-zinc-800"
              >
                <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#4A90E2]">
                  How ASSAP Fixes It
                </h2>
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="h-6 w-6 text-[#4A90E2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Modular sybil protection
                      </h3>
                      <p className="text-lg text-zinc-300">
                        Flexible verification methods that can be combined for
                        stronger identity assurance.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="h-6 w-6 text-[#4A90E2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        zk integrations & flexible schemas
                      </h3>
                      <p className="text-lg text-zinc-300">
                        Privacy-preserving verification that protects user data
                        while ensuring trust.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Code className="h-6 w-6 text-[#4A90E2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Developer-friendly tooling
                      </h3>
                      <p className="text-lg text-zinc-300">
                        Simple APIs and SDKs that make integration seamless for
                        any organization.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Competitive Analysis
            </h2>

            <div className="relative bg-black/50 p-6 md:p-8 rounded-xl border border-zinc-800 shadow-xl shadow-black/40">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="border-b border-zinc-800">
                      <TableHead className="w-[200px] text-xl font-bold text-white">
                        Features
                      </TableHead>
                      <TableHead className="text-center text-xl font-bold text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                          ASSAP
                        </span>
                      </TableHead>
                      <TableHead className="text-center text-lg text-zinc-300">
                        Gitcoin Passport
                      </TableHead>
                      <TableHead className="text-center text-lg text-zinc-300">
                        EAS
                      </TableHead>
                      <TableHead className="text-center text-lg text-zinc-300">
                        Sign Protocol
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="font-medium text-lg text-white">
                        Sybil Resistance
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-[#C00000] mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <XCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <XCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="font-medium text-lg text-white">
                        Customizability
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-[#C00000] mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <XCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="font-medium text-lg text-white">
                        Human Readability
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-[#C00000] mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <XCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <XCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle className="h-6 w-6 text-zinc-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-lg text-white">
                        Chain Support
                      </TableCell>
                      <TableCell className="text-center font-bold text-xl">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                          Solana Native
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-zinc-300">
                        Multi-chain
                      </TableCell>
                      <TableCell className="text-center text-zinc-300">
                        Ethereum
                      </TableCell>
                      <TableCell className="text-center text-zinc-300">
                        Ethereum
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent"></div>
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              How It Works
            </h2>

            <div className="bg-black/40 p-10 rounded-xl border border-zinc-800 shadow-lg shadow-black/40 relative">
              {/* Connecting Horizontal Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-[#C00000] via-[#4A90E2] to-[#C00000] transform -translate-y-1/2"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {/* Step 1 */}
                <div className="relative">
                  {/* Circle on the line */}
                  <div
                    className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full 
                       bg-gradient-to-r from-[#C00000] to-[#4A90E2] items-center justify-center z-10"
                  >
                    <span className="text-xl font-bold text-white">1</span>
                  </div>

                  {/* Visible circle on mobile */}
                  <div
                    className="md:hidden flex w-14 h-14 rounded-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] 
                       items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-xl font-bold text-white">1</span>
                  </div>

                  <div className="bg-black/30 rounded-xl border border-zinc-800 p-8 pt-12 md:pt-16 h-full">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      Select schema
                    </h3>
                    <p className="text-lg text-zinc-300 text-center">
                      Choose from pre-built verification templates or create
                      your own custom schema.
                    </p>

                    <div className="hidden md:flex items-center justify-center mt-6">
                      <svg
                        className="w-12 h-12 text-[#4A90E2]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  {/* Circle on the line */}
                  <div
                    className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full 
                       bg-gradient-to-r from-[#C00000] to-[#4A90E2] items-center justify-center z-10"
                  >
                    <span className="text-xl font-bold text-white">2</span>
                  </div>

                  {/* Visible circle on mobile */}
                  <div
                    className="md:hidden flex w-14 h-14 rounded-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] 
                       items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-xl font-bold text-white">2</span>
                  </div>

                  <div className="bg-black/30 rounded-xl border border-zinc-800 p-8 pt-12 md:pt-16 h-full">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      Verify identity
                    </h3>
                    <p className="text-lg text-zinc-300 text-center">
                      Complete the required verification steps through our
                      simple, user-friendly interface.
                    </p>

                    <div className="hidden md:flex items-center justify-center mt-6">
                      <svg
                        className="w-12 h-12 text-[#4A90E2]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  {/* Circle on the line */}
                  <div
                    className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full 
                       bg-gradient-to-r from-[#C00000] to-[#4A90E2] items-center justify-center z-10"
                  >
                    <span className="text-xl font-bold text-white">3</span>
                  </div>

                  {/* Visible circle on mobile */}
                  <div
                    className="md:hidden flex w-14 h-14 rounded-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] 
                       items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-xl font-bold text-white">3</span>
                  </div>

                  <div className="bg-black/30 rounded-xl border border-zinc-800 p-8 pt-12 md:pt-16 h-full">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      Create attestations
                    </h3>
                    <p className="text-lg text-zinc-300 text-center">
                      Generate and store your attestation on Solana with minimal
                      fees and maximum security.
                    </p>

                    <div className="hidden md:flex items-center justify-center mt-6">
                      <svg
                        className="w-12 h-12 text-[#4A90E2] opacity-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Use Cases
            </h2>

            <div className="grid grid-cols-1 gap-10">
              {/* Solana Users */}
              <div className="bg-black/40 rounded-xl border border-zinc-800 shadow-lg shadow-black/40 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                  {/* Left Column with Icon and Title */}
                  <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-black to-[#101114] flex flex-col items-center justify-center p-8 md:border-r border-zinc-800">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center mb-4">
                      <Wallet className="h-8 w-8 text-[#4A90E2]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
                      Solana Users
                    </h3>
                  </div>

                  {/* Right Column with Content */}
                  <div className="md:col-span-3 lg:col-span-4 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Secure governance voting
                          </h4>
                          <p className="text-base text-zinc-300">
                            Ensure one-person-one-vote with verified identities
                            for fair governance.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Verified delegations
                          </h4>
                          <p className="text-base text-zinc-300">
                            Safely delegate permissions with identity
                            verification.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Sybil-resistant airdrops
                          </h4>
                          <p className="text-base text-zinc-300">
                            Distribute tokens fairly with verified unique
                            identities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutions */}
              <div className="bg-black/40 rounded-xl border border-zinc-800 shadow-lg shadow-black/40 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                  {/* Left Column with Icon and Title */}
                  <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-black to-[#101114] flex flex-col items-center justify-center p-8 md:border-r border-zinc-800">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center mb-4">
                      <Building className="h-8 w-8 text-[#4A90E2]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
                      Institutions
                    </h3>
                  </div>

                  {/* Right Column with Content */}
                  <div className="md:col-span-3 lg:col-span-4 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Digital certificates
                          </h4>
                          <p className="text-base text-zinc-300">
                            Issue verifiable credentials with tamper-proof
                            security.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Legal document verification
                          </h4>
                          <p className="text-base text-zinc-300">
                            Verify and store legal documents with cryptographic
                            proofs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Compliance automation
                          </h4>
                          <p className="text-base text-zinc-300">
                            Streamline compliance processes with verified
                            attestations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developers */}
              <div className="bg-black/40 rounded-xl border border-zinc-800 shadow-lg shadow-black/40 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                  {/* Left Column with Icon and Title */}
                  <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-black to-[#101114] flex flex-col items-center justify-center p-8 md:border-r border-zinc-800">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center mb-4">
                      <Code className="h-8 w-8 text-[#4A90E2]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
                      Developers
                    </h3>
                  </div>

                  {/* Right Column with Content */}
                  <div className="md:col-span-3 lg:col-span-4 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Easy API integrations
                          </h4>
                          <p className="text-base text-zinc-300">
                            Integrate attestations with simple API calls and
                            SDKs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Custom verification flows
                          </h4>
                          <p className="text-base text-zinc-300">
                            Build tailored verification processes for your
                            applications.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-[#C00000]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            Composable attestation schemas
                          </h4>
                          <p className="text-base text-zinc-300">
                            Create custom schemas that fit your specific needs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Model Section */}
        <section id="pricing" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent"></div>
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Revenue Model
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              <div className="bg-black/50 p-8 rounded-xl border border-zinc-800 hover:border-[#4A90E2] transition-colors relative overflow-hidden group shadow-lg shadow-black/40 hover:shadow-[#4A90E2]/5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">
                    Cost per verification score
                  </h3>
                  <p className="text-lg text-zinc-300 mb-8">
                    Pay only for what you use with our simple per-verification
                    pricing model.
                  </p>
                  <div className="mb-10">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                      $0.10 - $1.00
                    </p>
                    <p className="text-base text-zinc-500">per verification</p>
                  </div>
                  <Button className="w-full py-6 relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
                    <span className="relative z-10 text-lg">Get Started</span>
                  </Button>
                </div>
              </div>

              <div className="bg-black/50 p-8 rounded-xl border border-zinc-800 hover:border-[#4A90E2] transition-colors relative overflow-hidden group shadow-lg shadow-black/40 hover:shadow-[#4A90E2]/5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">
                    Enterprise subscriptions
                  </h3>
                  <p className="text-lg text-zinc-300 mb-8">
                    Full customization options for large organizations with
                    high-volume verification needs.
                  </p>
                  <div className="mb-10">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                      Custom
                    </p>
                    <p className="text-base text-zinc-500">
                      contact for pricing
                    </p>
                  </div>
                  <Button className="w-full py-6 relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
                    <span className="relative z-10 text-lg">Contact Sales</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Timeline Section */}
        <section id="vision" className="py-20 lg:py-28 bg-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              Our Vision
            </h2>

            <div className="bg-black/50 p-8 rounded-xl border border-zinc-800 shadow-lg shadow-black/40 relative">
              <div className="max-w-3xl mx-auto">
                <div className="relative pl-10 pb-16 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C00000] to-[#4A90E2]"></div>
                  <div className="absolute left-[-7px] top-2 w-4 h-4 rounded-full bg-[#C00000] group-hover:scale-125 transition-all duration-300"></div>
                  <h3 className="text-2xl font-bold mb-4">
                    Now: Onchain attestations
                  </h3>
                  <p className="text-lg text-zinc-300">
                    Launching our core platform with Solana-native attestations
                    and basic Sybil resistance.
                  </p>
                </div>

                <div className="relative pl-10 pb-16 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4A90E2]"></div>
                  <div className="absolute left-[-7px] top-2 w-4 h-4 rounded-full bg-[#4A90E2] group-hover:scale-125 transition-all duration-300"></div>
                  <h3 className="text-2xl font-bold mb-4">
                    Near Future: Offchain privacy attestations
                  </h3>
                  <p className="text-lg text-zinc-300">
                    Expanding our platform with offchain capabilities and
                    integrating with additional identity providers for stronger
                    verification.
                  </p>
                </div>

                <div className="relative pl-10 group">
                  <div className="absolute left-[-7px] top-2 w-4 h-4 rounded-full bg-[#4A90E2] group-hover:scale-125 transition-all duration-300"></div>
                  <h3 className="text-2xl font-bold mb-4">
                    Future: Global standards for real-world notarization
                  </h3>
                  <p className="text-lg text-zinc-300">
                    Building a comprehensive Sybil resistance framework with
                    real-world notarization capabilities and global identity
                    scoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 lg:py-36 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5"></div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4A90E2] to-[#C00000]"></div>
          <div className="absolute top-1/3 left-0 w-[60vw] h-[60vh] bg-[#C00000] rounded-full filter blur-[150px] opacity-[0.03]"></div>
          <div className="absolute bottom-1/3 right-0 w-[60vw] h-[60vh] bg-[#4A90E2] rounded-full filter blur-[150px] opacity-[0.03]"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Ready to get started?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-12 animate-slide-up">
              Join the next generation of attestation technology and build trust
              into your applications.
            </p>

            <Button
              size="lg"
              className="relative overflow-hidden group text-lg px-10 py-7 rounded-md shadow-lg animate-fade-in"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:opacity-90 transition-opacity"></span>
              <span className="relative z-10 flex items-center text-xl">
                Go to Explorer <ExternalLink className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-16 bg-black border-t border-zinc-900 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#C00000]/30 via-[#4A90E2]/30 to-[#C00000]/30"></div>
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-8 md:mb-0">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-md opacity-70 blur-[2px]"></div>
                <div className="relative z-10 text-white font-bold text-2xl">
                  A
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                ASSAP
              </span>
            </div>

            <div className="flex gap-8 mb-8 md:mb-0">
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C00000]/0 to-[#4A90E2]/0 group-hover:from-[#C00000]/20 group-hover:to-[#4A90E2]/20 rounded-full transition-all duration-300"></div>
                  <Github className="h-6 w-6 relative z-10" />
                </div>
                <span className="sr-only">GitHub</span>
              </Link>

              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C00000]/0 to-[#4A90E2]/0 group-hover:from-[#C00000]/20 group-hover:to-[#4A90E2]/20 rounded-full transition-all duration-300"></div>
                  <Twitter className="h-6 w-6 relative z-10" />
                </div>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>

            <div className="text-base text-zinc-500">
              Built for the Solana Hackathon 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
