import { Shield, Zap, Code, AlertCircle } from "lucide-react";

export function ProblemsSolutionsSection() {
  return (
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

          <div id="solution" className="relative rounded-2xl overflow-hidden">
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
  );
}
