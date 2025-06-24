import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ExternalLink } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/assap_favicon.png"
            alt="ASSAP"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-white">ASSAP</span>
        </div>

        <nav className="hidden md:flex gap-8">
          {[
            "About",
            "Problems",
            "Solution",
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

        <div className="flex items-center space-x-4">
          <Link
            href="https://explorer.assap.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none">
              <span className="flex items-center">
                Try out Explorer
                <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </Link>
          <button className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
