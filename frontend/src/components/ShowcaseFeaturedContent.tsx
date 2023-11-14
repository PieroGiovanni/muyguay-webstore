import { useRef, useState } from "react";
import { ProductPropsFragment } from "../graphql/generated/graphql";
import { ScrollLeftButton } from "./Buttons/ScrollLeftButton";
import { ScrollRightButton } from "./Buttons/ScrollRightButton";
import { Product } from "./Product";

interface ShowcaseFeaturedContentProps {
  products: readonly ProductPropsFragment[];
}

export const ShowcaseFeaturedContent = ({
  products,
}: ShowcaseFeaturedContentProps) => {
  const [scrolling, setScrolling] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  return products ? (
    <div className="w-full relative">
      <div
        className="flex  gap-x-2 md:overflow-x-hidden overflow-x-auto overflow-y-hidden scroll-smooth"
        ref={containerRef}
        onScroll={() => setScrolling(containerRef.current?.scrollLeft || 0)}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="flex shrink-0 w-[50vw] md:w-[25vw] sm:w-[33vw]"
          >
            <Product product={p} />
          </div>
        ))}
      </div>
      <ScrollLeftButton scrolling={scrolling} containerRef={containerRef} />
      <ScrollRightButton scrolling={scrolling} containerRef={containerRef} />
    </div>
  ) : null;
};
