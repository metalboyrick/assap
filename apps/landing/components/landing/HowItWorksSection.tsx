import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
                requirements and verification score thresholds tailored to your
                use case.
              </p>
              <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div className="text-sm font-mono text-zinc-400">
                  <span className="text-[#4A90E2]">schema</span>: &#123;
                  <br />
                  &nbsp;&nbsp;<span className="text-[#C00000]">name</span>:{" "}
                  <span className="text-zinc-300">Identity Verification</span>
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
              <h3 className="text-2xl font-bold mb-4">Sybil Verification</h3>
              <p className="text-lg text-zinc-300">
                When attestation is requested, ASSAP contracts automatically
                verify the anti-sybil scores of both the attester and recipient.
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
                  <span className="text-zinc-300">eligible ? true : false</span>
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
              <h3 className="text-2xl font-bold mb-4">Attestation Creation</h3>
              <p className="text-lg text-zinc-300">
                Eligible participants can then create the attestation, which is
                securely stored on the Solana blockchain with cryptographic
                verification.
              </p>
              <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div className="text-sm font-mono text-zinc-400">
                  <span className="text-[#4A90E2]">createAttestation</span>
                  (data, schema, signatures) &#123;
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-zinc-300"></span>
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
                Every step of the attestation process is secured by
                Solana&apos;s high-speed blockchain, ensuring data integrity and
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
  );
}
