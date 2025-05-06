import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
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
              Empowering Solana with secure, decentralized identity verification
              and attestations.
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
                    <span className="text-xs font-bold text-white">{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400">
                <span className="font-bold text-white">+1,200</span> verified
                users
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
  );
}
