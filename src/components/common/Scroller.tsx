import React, { ReactNode, useEffect, useRef } from "react";

interface ScrollerProps {
  children: ReactNode;
  move?: "left" | "right";
  baseSpeed?: number;
  direction?: "row" | "column";
}

const Scroller: React.FC<ScrollerProps> = ({
  children,
  move = "left",
  baseSpeed = 4,
  direction = "row",
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (scrollerInner) {
        const scrollerItems = scrollerInner.children;
        const itemCount = scrollerItems.length;

        const duration = `${itemCount * baseSpeed}s`;
        scroller.style.setProperty("--_animation-duration", duration);

        Array.from(scrollerItems).forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, [baseSpeed]);

  return (
    <div
      ref={scrollerRef}
      className="scroller"
      data-direction={move}
      data-flex-direction={direction}
    >
      <div className="scroller__inner">{children}</div>
    </div>
  );
};

export default Scroller;
