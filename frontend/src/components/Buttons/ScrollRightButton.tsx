import { ArrowBigRight } from "lucide-react";
import { MutableRefObject } from "react";

interface ScrollRightButtonProps {
  scrolling: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export const ScrollRightButton = ({
  scrolling,
  containerRef,
}: ScrollRightButtonProps) => {
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300; // Adjust the scroll distance as needed
    }
  };
  return (
    <div>
      {(scrolling === 0 ||
        (scrolling <
          (containerRef.current?.scrollWidth || 0) -
            (containerRef.current?.clientWidth || 0) &&
          scrolling > 0)) && (
        <button
          className="flex absolute w-10 h-10 justify-center items-center bg-white border-2 border-black rounded-full top-[40%] right-0 animate-bounce-horizontal"
          onClick={scrollRight}
        >
          <ArrowBigRight />
        </button>
      )}
    </div>
  );
};
