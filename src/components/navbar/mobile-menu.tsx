import { Button } from "@/components/ui/button";
import Link from "next/link";

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Feedback", href: "/feedback" },
  { label: "Community", href: "#community" },
  { label: "Docs", href: "#docs" },
] satisfies Array<{
  label: string;
  href: React.ComponentProps<typeof Link>["href"];
}>;

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ setIsOpen }: Props) {
  return (
    <div className="border-border mt-4 space-y-3 border-t pt-4 md:hidden">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-muted-foreground hover:text-foreground block py-2 text-sm transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}

      <div className="flex gap-3 pt-3">
        <Button size="sm" className="flex-1" asChild>
          <Link href="/feedback/create">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
