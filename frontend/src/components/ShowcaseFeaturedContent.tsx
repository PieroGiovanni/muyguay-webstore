import { useRef, useState } from "react";
import { ProductPropsFragment } from "../graphql/generated/graphql";
import { ShowCaseProduct } from "./ShowCaseProduct";
import { ScrollLeftButton } from "./Buttons/ScrollLeftButton";
import { ScrollRightButton } from "./Buttons/ScrollRightButton";

interface ShowcaseFeaturedContentProps {
  products: readonly ProductPropsFragment[];
}

export const ShowcaseFeaturedContent = ({
  products,
}: ShowcaseFeaturedContentProps) => {
  const [scrolling, setScrolling] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="w-full relative">
      <div
        className="flex flex-row gap-x-2 md:overflow-x-hidden overflow-x-auto overflow-y-hidden scroll-smooth"
        ref={containerRef}
        onScroll={() => setScrolling(containerRef.current?.scrollLeft || 0)}
      >
        {products
          ?.filter((p) => p.isFeatured)
          .map((p) => (
            <ShowCaseProduct key={p.id} product={p} />
          ))}
      </div>
      <ScrollLeftButton scrolling={scrolling} containerRef={containerRef} />
      <ScrollRightButton scrolling={scrolling} containerRef={containerRef} />
    </div>
  );
};
