import { PAGES_TO_HIDE_HEADER } from "@/lib/routes";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

interface PageLoaderProps {
  className?: string;
  text?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  className = "",
  text = "",
}) => {
  const pathName = usePathname();

  const isHeaderHidden = PAGES_TO_HIDE_HEADER.includes(pathName);

  const characters = text
    .toUpperCase()
    .split("")
    .map((char) => (char === " " ? "\u00A0\u00A0" : char));

  return (
    <div
      className={twMerge(
        "w-screen  grid place-content-center gap-6",
        isHeaderHidden ? "h-screen" : "h-full min-h-[calc(100vh-100px)]",
        className
      )}
    >
      <div className="loading-wave mx-auto">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
      <div className="keyboard text-black font-bold space-x-1">
        {characters.map((char, index) => (
          <span
            key={index}
            className="key"
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PageLoader;
