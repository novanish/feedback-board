import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <React.Fragment>
      <section className="from-background to-card border-border/50 relative grid min-h-[500px] place-content-center border-b bg-linear-to-br">
        <div className="max-w-3xl space-y-4 px-7">
          <h1 className="text-center text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
            Create and Share Your Feedback Easily
          </h1>
          <p className="text-muted-foreground text-center text-lg leading-relaxed md:text-xl">
            Create a feedback board in minutes.
          </p>
        </div>

        <div className="mt-3 flex justify-center">
          <Button asChild>
            <Link href="/feedback/create">Give Feedback</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}
