import { Building, ChevronRight, Code, Wallet } from "lucide-react";

export function UseCasesSection() {
  return (
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
  );
}
