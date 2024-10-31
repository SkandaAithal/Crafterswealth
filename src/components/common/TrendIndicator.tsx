import { IoTriangle } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

function TrendIndicator({
  number,
  className = "",
}: {
  number: number;
  className?: string;
}) {
  const isPositive = number >= 0;

  return (
    <div
      className={twMerge(
        "font-bold text-3xl flex gap-1 items-center justify-center w-fit",
        isPositive ? "text-green-400" : "text-red-500",
        className
      )}
    >
      <IoTriangle
        size={20}
        className={twMerge(isPositive ? "" : "rotate-180")}
      />
      {number.toFixed(2)}%
    </div>
  );
}

export default TrendIndicator;
