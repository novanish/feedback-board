"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function toggleVisibility() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return isVisible ? (
    <Button
      type="button"
      onClick={scrollToTop}
      className="animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 fixed right-8 bottom-8 z-40 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
    >
      <ChevronUp className="h-5 w-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  ) : null;
}
