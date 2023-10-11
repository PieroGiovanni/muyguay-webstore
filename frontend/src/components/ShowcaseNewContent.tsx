import { useState, useRef } from "react";
import { ProductPropsFragment } from "../graphql/generated/graphql";
import { ScrollLeftButton } from "./Buttons/ScrollLeftButton";
import { ScrollRightButton } from "./Buttons/ScrollRightButton";
import { ShowCaseProduct } from "./ShowCaseProduct";

interface ShowcaseNewContentProps {
  products: readonly ProductPropsFragment[];
}

export const ShowcaseNewContent = ({ products }: ShowcaseNewContentProps) => {
  const [scrolling, setScrolling] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="w-full relative">
      <div
        className="flex flex-row gap-x-2 md:overflow-x-hidden overflow-x-auto overflow-y-hidden scroll-smooth"
        ref={containerRef}
        onScroll={() => setScrolling(containerRef.current?.scrollLeft || 0)}
      >
        {[...products]
          .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
          .slice(0, 5)
          .map((p) => (
            <ShowCaseProduct key={p.id} product={p} />
          ))}
      </div>
      <ScrollLeftButton scrolling={scrolling} containerRef={containerRef} />
      <ScrollRightButton scrolling={scrolling} containerRef={containerRef} />
    </div>
  );
};
