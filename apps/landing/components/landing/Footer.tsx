import Link from "next/link";
import TwitterXIcon from "./TwitterXIcon";

export function Footer() {
  return (
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

          <div className="flex flex-col items-center gap-2 mb-8 md:mb-0">
            <span className="text-zinc-400 text-sm">Find us on</span>
            <div className="flex gap-4">
              {/* <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C00000]/0 to-[#4A90E2]/0 group-hover:from-[#C00000]/20 group-hover:to-[#4A90E2]/20 rounded-full transition-all duration-300"></div>
                  <Github className="h-6 w-6 relative z-10" />
                </div>
                <span className="sr-only">GitHub</span>
              </Link> */}

              <Link
                href="https://x.com/assap_xyz"
                target="_blank"
                className="text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C00000]/0 to-[#4A90E2]/0 group-hover:from-[#C00000]/20 group-hover:to-[#4A90E2]/20 rounded-full transition-all duration-300"></div>
                  <TwitterXIcon className="h-6 w-6 relative z-10" />
                </div>
                <span className="sr-only">X</span>
              </Link>
            </div>
          </div>

          <div className="text-base text-zinc-500">
            Built for the Solana Breakout Hackathon 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
