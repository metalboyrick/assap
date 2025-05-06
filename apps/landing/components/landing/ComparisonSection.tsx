import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 lg:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C00000]/30 to-transparent"></div>
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-[#C00000] mr-2"></span>
            Competitive Edge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
            Competitive Analysis
          </h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25"></div>
          <div className="relative bg-black/80 p-8 rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-zinc-800">
                    <TableHead className="w-[200px] text-xl font-bold text-white">
                      Features
                    </TableHead>
                    <TableHead className="text-center text-xl font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                        ASSAP
                      </span>
                    </TableHead>
                    <TableHead className="text-center text-lg text-zinc-300">
                      Gitcoin Passport
                    </TableHead>
                    <TableHead className="text-center text-lg text-zinc-300">
                      EAS
                    </TableHead>
                    <TableHead className="text-center text-lg text-zinc-300">
                      Sign Protocol
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-zinc-800">
                    <TableCell className="font-medium text-lg text-white">
                      Sybil Resistance
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#C00000]/20 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-[#C00000]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-zinc-800">
                    <TableCell className="font-medium text-lg text-white">
                      Customizability
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#C00000]/20 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-[#C00000]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-zinc-800">
                    <TableCell className="font-medium text-lg text-white">
                      Human Readability
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#C00000]/20 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-[#C00000]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg text-white">
                      Chain Support
                    </TableCell>
                    <TableCell className="text-center font-bold text-xl">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                        Solana Native
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-zinc-300">
                      Multi-chain
                    </TableCell>
                    <TableCell className="text-center text-zinc-300">
                      Ethereum
                    </TableCell>
                    <TableCell className="text-center text-zinc-300">
                      Ethereum
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
