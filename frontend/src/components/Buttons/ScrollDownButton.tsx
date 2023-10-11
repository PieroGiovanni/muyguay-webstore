"use client";

import { ArrowBigDown } from "lucide-react";
import { useRef } from "react";

interface ScrollDownButtonProps {}

export const ScrollDownButton = ({}: ScrollDownButtonProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollDown = () => {
    window.scrollBy({ top: 537, behavior: "smooth" });
    // const nextSection = document.getElementById("showcase");

    // if (nextSection) {
    //   nextSection.scrollIntoView({ behavior: "smooth" });
    // }
  };
  return (
    <button
      className="flex place-items-center justify-center rounded-full bg-white border-2 border-black rouded-full w-10 h-10 animate-bounce"
      onClick={scrollDown}
    >
      <ArrowBigDown />
    </button>
  );
};
