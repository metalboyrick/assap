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
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed -top-[30vh] -left-[30vw] w-[80vw] h-[80vh] bg-[#C00000] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="fixed -bottom-[30vh] -right-[30vw] w-[80vw] h-[80vh] bg-[#4A90E2] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-[0.02] pointer-events-none"></div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-md opacity-80"></div>
              <div className="relative z-10 text-white font-bold text-xl">
                A
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
              ASSAP
            </span>
          </div>

          <nav className="hidden md:flex gap-8">
            {[
              "About",
              "Problems",
              "Solution",
              "Comparison",
              "How It Works",
              "Use Cases",
            ].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-base font-medium text-zinc-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none">
              <span className="flex items-center">
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
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#4A90E2 0.5px, transparent 0.5px), linear-gradient(to right, #4A90E2 0.5px, transparent 0.5px)",
              backgroundSize: "50px 50px",
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-radial from-[#4A90E2]/10 via-transparent to-transparent opacity-70"></div>

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#C00000] mr-2"></span>
                  Built on Solana for speed and security
                </div>

                <h1 className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                  <span className="block">Anti-Sybil</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                    Attestation Protocol
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-300 max-w-xl leading-relaxed">
                  Empowering Solana with secure, decentralized identity
                  verification and attestations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-all text-white border-none h-14 px-8 text-lg rounded-lg">
                    <span className="flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:border-[#4A90E2] bg-black/40 text-white hover:bg-black/60 transition-all h-14 px-8 text-lg rounded-lg"
                  >
                    Learn More
                  </Button>
                </div>

                <div className="flex items-center gap-x-6 pt-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center bg-gradient-to-br ${
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
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur-sm opacity-50"></div>
                <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>

                  {/* Glowing orb */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-gradient-radial from-[#4A90E2]/40 to-transparent blur-xl animate-pulse"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    {/* Logo/Icon */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#C00000] to-[#4A90E2] flex items-center justify-center shadow-lg">
                      <svg
                        className="w-12 h-12 text-white"
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

                    <div className="mt-8 text-center">
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
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
        <section id="about" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#4A90E2] mr-2"></span>
                Core Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Redefining Trust On-Chain
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-7 w-7 text-[#C00000]" />,
                  title: "Sybil-resistant verification",
                  description:
                    "Multiple verification methods ensure one person, one identity.",
                },
                {
                  icon: <Zap className="h-7 w-7 text-[#C00000]" />,
                  title: "Human-readable",
                  description:
                    "Attestations that make sense to both users and machines.",
                },
                {
                  icon: <Code className="h-7 w-7 text-[#C00000]" />,
                  title: "Native for Solana",
                  description:
                    "Optimized for speed, low cost, and seamless integration.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-lg text-zinc-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems & Solutions Section */}
        <section id="problems" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute -inset-0.5 bg-[#C00000] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10">
                  <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#C00000]">
                    Today&apos;s Problems
                  </h2>
                  <ul className="space-y-8">
                    {[
                      {
                        title: "Fragmented KYC standards",
                        description:
                          "Users repeat verification processes across platforms, wasting time and exposing data.",
                      },
                      {
                        title: "Poor readability of attestations",
                        description:
                          "Current attestations lack context and human readability, limiting their usefulness.",
                      },
                      {
                        title: "Weak identity proofs",
                        description:
                          "Existing solutions fail to provide strong guarantees against Sybil attacks.",
                      },
                    ].map((problem, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <AlertCircle className="h-6 w-6 text-[#C00000]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {problem.title}
                          </h3>
                          <p className="text-lg text-zinc-300">
                            {problem.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                id="solution"
                className="relative rounded-2xl overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-[#4A90E2] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10">
                  <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#4A90E2]">
                    How ASSAP Fixes It
                  </h2>
                  <ul className="space-y-8">
                    {[
                      {
                        icon: <Shield className="h-6 w-6 text-[#4A90E2]" />,
                        title: "Modular sybil protection",
                        description:
                          "Flexible verification methods that can be combined for stronger identity assurance.",
                      },
                      {
                        icon: <Zap className="h-6 w-6 text-[#4A90E2]" />,
                        title: "zk integrations & flexible schemas",
                        description:
                          "Privacy-preserving verification that protects user data while ensuring trust.",
                      },
                      {
                        icon: <Code className="h-6 w-6 text-[#4A90E2]" />,
                        title: "Developer-friendly tooling",
                        description:
                          "Simple APIs and SDKs that make integration seamless for any organization.",
                      },
                    ].map((solution, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2]/30 to-[#4A90E2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                          {solution.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {solution.title}
                          </h3>
                          <p className="text-lg text-zinc-300">
                            {solution.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#C00000] mr-2"></span>
                Competitive Edge
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Competitive Analysis
              </h2>
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
              <div className="relative bg-black/80 p-8 rounded-2xl border border-white/10">
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="border-b border-zinc-800">
                        <TableHead className="w-[200px] text-xl font-bold text-white">
                          Features
                        </TableHead>
                        <TableHead className="text-center text-xl font-bold">
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
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#C00000]/20 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-[#C00000]" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-zinc-800">
                        <TableCell className="font-medium text-lg text-white">
                          Customizability
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#C00000]/20 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-[#C00000]" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-zinc-800">
                        <TableCell className="font-medium text-lg text-white">
                          Human Readability
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#C00000]/20 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-[#C00000]" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-zinc-500" />
                            </div>
                          </div>
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
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#4A90E2] mr-2"></span>
                Process Flow
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Step 1 */}
              <div className="relative rounded-2xl overflow-hidden group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                    <div className="text-2xl font-bold text-[#C00000]">1</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Schema Creation</h3>
                  <p className="text-lg text-zinc-300">
                    Define custom attestation schemas with specific data
                    requirements and verification score thresholds tailored to
                    your use case.
                  </p>
                  <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div className="text-sm font-mono text-zinc-400">
                      <span className="text-[#4A90E2]">schema</span>: &#123;
                      <br />
                      &nbsp;&nbsp;<span className="text-[#C00000]">
                        name
                      </span>:{" "}
                      <span className="text-zinc-300">
                        Identity Verification
                      </span>
                      ,<br />
                      &nbsp;&nbsp;
                      <span className="text-[#C00000]">minScore</span>:{" "}
                      <span className="text-zinc-300">75</span>,<br />
                      &nbsp;&nbsp;<span className="text-[#C00000]">fields</span>
                      : [ ... ]<br />
                      &#125;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl overflow-hidden group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#4A90E2]/20 to-[#4A90E2]/5 flex items-center justify-center mb-6">
                    <div className="text-2xl font-bold text-[#4A90E2]">2</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Sybil Verification
                  </h3>
                  <p className="text-lg text-zinc-300">
                    When attestation is requested, ASSAP contracts automatically
                    verify the anti-sybil scores of both the attester and
                    recipient.
                  </p>
                  <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div className="text-sm font-mono text-zinc-400">
                      <span className="text-[#4A90E2]">verifyParticipants</span>
                      (attester, recipient) &#123;
                      <br />
                      &nbsp;&nbsp;
                      <span className="text-zinc-300"></span>
                      <br />
                      &nbsp;&nbsp;<span className="text-[#C00000]">
                        return
                      </span>{" "}
                      <span className="text-zinc-300">
                        eligible ? true : false
                      </span>
                      <br />
                      &#125;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl overflow-hidden group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                    <div className="text-2xl font-bold text-[#C00000]">3</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Attestation Creation
                  </h3>
                  <p className="text-lg text-zinc-300">
                    Eligible participants can then create the attestation, which
                    is securely stored on the Solana blockchain with
                    cryptographic verification.
                  </p>
                  <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div className="text-sm font-mono text-zinc-400">
                      <span className="text-[#4A90E2]">createAttestation</span>
                      (data, schema, signatures) &#123;
                      <br />
                      &nbsp;&nbsp;
                      <span className="text-zinc-300">
                        // Store on-chain with timestamps
                      </span>
                      <br />
                      &nbsp;&nbsp;<span className="text-[#C00000]">
                        return
                      </span>{" "}
                      <span className="text-zinc-300">attestationId</span>
                      <br />
                      &#125;
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/80 p-8 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    End-to-End Integrity
                  </h3>
                  <p className="text-lg text-zinc-300 text-center">
                    Every step of the attestation process is secured by Solana's
                    high-speed blockchain, ensuring data integrity and
                    tamper-proof verification that scales with your needs.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button className="bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none px-8 py-6 text-lg">
                      <span className="flex items-center">
                        Learn More
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#C00000] mr-2"></span>
                Applications
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Use Cases
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {/* Solana Users */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/80 rounded-2xl border border-white/10 overflow-hidden">
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
                        {[
                          {
                            title: "Secure governance voting",
                            description:
                              "Ensure one-person-one-vote with verified identities for fair governance.",
                          },
                          {
                            title: "Verified delegations",
                            description:
                              "Safely delegate permissions with identity verification.",
                          },
                          {
                            title: "Sybil-resistant airdrops",
                            description:
                              "Distribute tokens fairly with verified unique identities.",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                              <ChevronRight className="h-5 w-5 text-[#C00000]" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-white">
                                {item.title}
                              </h4>
                              <p className="text-base text-zinc-300">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutions */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/80 rounded-2xl border border-white/10 overflow-hidden">
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
                        {[
                          {
                            title: "Digital certificates",
                            description:
                              "Issue verifiable credentials with tamper-proof security.",
                          },
                          {
                            title: "Legal document verification",
                            description:
                              "Verify and store legal documents with cryptographic proofs.",
                          },
                          {
                            title: "Compliance automation",
                            description:
                              "Streamline compliance processes with verified attestations.",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                              <ChevronRight className="h-5 w-5 text-[#C00000]" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-white">
                                {item.title}
                              </h4>
                              <p className="text-base text-zinc-300">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developers */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/80 rounded-2xl border border-white/10 overflow-hidden">
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
                        {[
                          {
                            title: "Easy API integrations",
                            description:
                              "Integrate attestations with simple API calls and SDKs.",
                          },
                          {
                            title: "Custom verification flows",
                            description:
                              "Build tailored verification processes for your applications.",
                          },
                          {
                            title: "Composable attestation schemas",
                            description:
                              "Create custom schemas that fit your specific needs.",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-black/30 rounded-lg p-5 border border-zinc-800/50 hover:border-[#C00000]/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C00000]/20 to-[#C00000]/5 flex-shrink-0 flex items-center justify-center">
                              <ChevronRight className="h-5 w-5 text-[#C00000]" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-white">
                                {item.title}
                              </h4>
                              <p className="text-base text-zinc-300">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Model Section */}
        <section id="pricing" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent"></div>
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#4A90E2] mr-2"></span>
                Pricing
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Revenue Model
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {[
                {
                  title: "Cost per verification score",
                  description:
                    "Pay only for what you use with our simple per-verification pricing model.",
                  price: "$0.10 - $1.00",
                  unit: "per verification",
                  buttonText: "Get Started",
                },
                {
                  title: "Enterprise subscriptions",
                  description:
                    "Full customization options for large organizations with high-volume verification needs.",
                  price: "Custom",
                  unit: "contact for pricing",
                  buttonText: "Contact Sales",
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
                    <h3 className="text-2xl font-bold mb-6">{plan.title}</h3>
                    <p className="text-lg text-zinc-300 mb-8">
                      {plan.description}
                    </p>
                    <div className="mb-10">
                      <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                        {plan.price}
                      </p>
                      <p className="text-base text-zinc-500">{plan.unit}</p>
                    </div>
                    <Button className="w-full py-6 bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none text-lg mt-auto">
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Timeline Section */}
        <section id="vision" className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#C00000] mr-2"></span>
                Roadmap
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Our Vision
              </h2>
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
              <div className="relative bg-black/80 p-8 rounded-2xl border border-white/10">
                <div className="max-w-3xl mx-auto">
                  {[
                    {
                      title: "Now: Onchain attestations",
                      description:
                        "Launching our core platform with Solana-native attestations and basic Sybil resistance.",
                      gradient: "from-[#C00000] to-[#4A90E2]",
                      dotColor: "bg-[#C00000]",
                    },
                    {
                      title: "Near Future: Offchain privacy attestations",
                      description:
                        "Expanding our platform with offchain capabilities and integrating with additional identity providers for stronger verification.",
                      gradient: "from-[#4A90E2]/80 to-[#4A90E2]/30",
                      dotColor: "bg-[#4A90E2]",
                    },
                    {
                      title:
                        "Future: Global standards for real-world notarization",
                      description:
                        "Building a comprehensive Sybil resistance framework with real-world notarization capabilities and global identity scoring.",
                      gradient: "from-[#4A90E2]/30 to-transparent",
                      dotColor: "bg-[#4A90E2]",
                      isLast: true,
                    },
                  ].map((phase, index, array) => (
                    <div
                      key={index}
                      className={`relative pl-10 ${index !== array.length - 1 ? "pb-16" : ""} group`}
                    >
                      <div
                        className={`absolute left-0 top-0 ${!phase.isLast ? "bottom-0" : "h-16"} w-1 bg-gradient-to-b ${phase.gradient}`}
                      ></div>
                      <div
                        className={`absolute left-[-7px] top-2 w-4 h-4 rounded-full ${phase.dotColor} group-hover:scale-125 transition-all duration-300`}
                      ></div>
                      <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                      <p className="text-lg text-zinc-300 pb-4">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 lg:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C00000]/5 to-[#4A90E2]/5"></div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C00000] to-[#4A90E2]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4A90E2] to-[#C00000]"></div>
          <div className="absolute top-1/3 left-0 w-[60vw] h-[60vh] bg-[#C00000] rounded-full filter blur-[150px] opacity-[0.03]"></div>
          <div className="absolute bottom-1/3 right-0 w-[60vw] h-[60vh] bg-[#4A90E2] rounded-full filter blur-[150px] opacity-[0.03]"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                Ready to get started?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-12">
              Join the next generation of attestation technology and build trust
              into your applications.
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none text-xl px-10 py-7 rounded-lg shadow-lg"
            >
              <span className="flex items-center">
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#C00000] to-[#4A90E2] rounded-md opacity-80"></div>
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
