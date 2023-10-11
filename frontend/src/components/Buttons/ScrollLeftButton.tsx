import { ArrowBigLeft } from "lucide-react";
import { MutableRefObject, useRef, useState } from "react";

interface ScrollLeftButtonProps {
  scrolling: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export const ScrollLeftButton = ({
  scrolling,
  containerRef,
}: ScrollLeftButtonProps) => {
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300; // Adjust the scroll distance as needed
    }
  };
  return (
    <div>
      {scrolling > 0 && (
        <button
          className="flex absolute top-[40%] left-0 items-center justify-center rounded-full bg-white border-2 border-black rouded-full w-10 h-10 animate-bounce-horizontal2"
          onClick={scrollLeft}
        >
          <ArrowBigLeft />
        </button>
      )}
    </div>
  );
};
