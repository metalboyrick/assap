export function VisionTimelineSection() {
  return (
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
                  title: "Future: Global standards for real-world notarization",
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
  );
}
