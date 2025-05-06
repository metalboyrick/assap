import { Shield, Zap, Code } from "lucide-react";

export function AboutSection() {
  return (
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
                <p className="text-lg text-zinc-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
