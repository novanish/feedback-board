"use client";

import { Logo } from "@/components/navbar/logo";
import { MobileMenu, navLinks } from "@/components/navbar/mobile-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((p) => !p);

  return (
    <nav className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button size="sm" asChild>
              <Link href="/feedback/create">Get Started</Link>
            </Button>
          </div>

          <button
            onClick={toggleMenu}
            className="text-foreground hover:bg-muted rounded-lg p-2 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen ? <MobileMenu setIsOpen={setIsOpen} /> : null}
      </div>
    </nav>
  );
}
