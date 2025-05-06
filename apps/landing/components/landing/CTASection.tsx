import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function CTASection() {
  return (
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
  );
}
