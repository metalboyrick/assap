"use client";

import { default as NextLink } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, Database, User, Menu, X, LogIn } from "lucide-react";
import { Button as ButtonComponent } from "@/components/ui/button";
import { useState, type JSX } from "react";
import { useRouter } from "next/navigation";
import { WalletButton } from "@/components/solana/solana-provider";

// Use type assertions to fix compatibility issues
const Link = NextLink as any;
const IconFileText = FileText as any;
const IconDatabase = Database as any;
const IconUser = User as any;
const IconMenu = Menu as any;
const IconX = X as any;
const IconLogIn = LogIn as any;
const Button = ButtonComponent as any;

interface NavItem {
  name: string;
  href: string;
  icon: any; // Change type to any to avoid compatibility issues
}

export default function Header(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    {
      name: "Attestations",
      href: "/",
      icon: IconFileText,
    },
    {
      name: "Schemas",
      href: "/schemas",
      icon: IconDatabase,
    },
    // {
    //   name: "Profile",
    //   href: "/profile",
    //   icon: IconUser,
    // },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <div className="bg-gradient-to-r from-red-600 to-blue-600 w-8 h-8 rounded-md mr-3"></div>
            <h1 className="text-2xl font-bold font-heading tracking-tighter hidden md:block">
              ASSAP
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-white border-b-2 border-gradient-to-r from-red-500 to-blue-500 pb-1"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800">
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gradient-to-r from-red-950/40 to-blue-950/40 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
