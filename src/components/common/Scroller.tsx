import React, { ReactNode, useEffect, useRef } from "react";

interface ScrollerProps {
  children: ReactNode;
  move?: "left" | "right";
  baseSpeed?: number;
  direction?: "row" | "column";
  onHoverStop?: boolean;
}

const Scroller: React.FC<ScrollerProps> = ({
  children,
  move = "left",
  baseSpeed = 4,
  direction = "row",
  onHoverStop = false,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(
        ".scroller__inner"
      ) as HTMLDivElement;
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

        if (onHoverStop) {
          const handleMouseEnter = () => {
            scrollerInner.style.animationPlayState = "paused";
          };

          const handleMouseLeave = () => {
            scrollerInner.style.animationPlayState = "running";
          };

          scroller.addEventListener("mouseenter", handleMouseEnter);
          scroller.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            scroller.removeEventListener("mouseenter", handleMouseEnter);
            scroller.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      }
    }
  }, [baseSpeed, onHoverStop]);

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
