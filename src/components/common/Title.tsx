import React from "react";
import AnimateOnce from "./AnimateOnce";

interface TitleProps {
  size?: "H1" | "H2";
  className?: string;
  text: string;
  noAnimate?: boolean;
}

const Title: React.FC<TitleProps> = ({
  size = "H1",
  className = "",
  text,
  noAnimate = false,
}) => {
  const TitleContent =
    size === "H1" ? (
      <h1
        className={`text-black text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${className}`}
      >
        {text}
      </h1>
    ) : (
      <h1 className={`text-3xl lg:text-4xl mb-4 font-bold ${className}`}>
        {text}
      </h1>
    );

  return !noAnimate ? <AnimateOnce>{TitleContent}</AnimateOnce> : TitleContent;
};

export default Title;
