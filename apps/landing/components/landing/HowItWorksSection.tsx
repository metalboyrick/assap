export function HowItWorksSection() {
  return (
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
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
                requirements and verification requirements tailored to your use
                case.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#4A90E2]/20 to-[#4A90E2]/5 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-[#4A90E2]">2</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Sybil Verification</h3>
              <p className="text-lg text-zinc-300">
                When attestation is requested, ASSAP contracts automatically
                verify the criteria of both the attester and recipient.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C00000]/20 to-[#C00000]/5 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-[#C00000]">3</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Attest</h3>
              <p className="text-lg text-zinc-300">
                Eligible participants can then create the attestation, which is
                securely stored on the Solana blockchain with cryptographic
                verification.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#4A90E2]/20 to-[#4A90E2]/5 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-[#4A90E2]">4</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">View Receipt</h3>
              <p className="text-lg text-zinc-300">
                You can share the receipt with the recipient or use it as proof
                via our dedicated Explorer Page.
              </p>
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
                Every step of the attestation process is secured by
                Solana&apos;s high-speed blockchain, ensuring data integrity and
                tamper-proof verification that scales with your needs.
              </p>
              {/* <div className="mt-8 flex justify-center">
                <Button className="bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none px-8 py-6 text-lg">
                  <span className="flex items-center">
                    Learn More
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
