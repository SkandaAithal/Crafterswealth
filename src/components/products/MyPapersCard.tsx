import React from "react";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { formatToIndianNumberingSystem } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { twMerge } from "tailwind-merge";
import { IoTriangle } from "react-icons/io5";
import AnimateOnce from "../common/AnimateOnce";
interface MyPapersCardsProps {
  name: string;
  pdfLink: string;
  stockName: string;
  stockSymbol: string;
  buyPrice: number;
  target: number;
  marketPrice: number;
  isLoading: boolean;
}
const MyPapersCard: React.FC<MyPapersCardsProps> = ({
  buyPrice,
  target,
  name,
  pdfLink,
  stockName,
  stockSymbol,
  marketPrice = 0,
  isLoading = false,
}) => {
  const potential = marketPrice
    ? ((target - marketPrice) / marketPrice) * 100
    : 0;

  const isPositive = potential >= 0;
  return (
    <AnimateOnce>
      <div className="space-y-4 rounded-2xl p-5 w-full md:w-[600px] bg-accent">
        <h1 className="text-2xl font-bold text-wrap">
          {stockName} ({stockSymbol})
        </h1>
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Link
            href={pdfLink}
            target="_blank"
            className="text-red-800 flex text-base items-center gap-3"
          >
            View Paper <FaFilePdf size={35} />
          </Link>
        </div>

        <Separator />
        <div className="flex justify-between items-center">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">
              Buy Price: &nbsp;
              <span className="font-bold text-xl">
                ₹ {formatToIndianNumberingSystem(buyPrice)}
              </span>
            </h3>
            <h3 className="text-lg font-semibold">
              Target: &nbsp;
              <span className="font-bold text-xl">
                ₹ {formatToIndianNumberingSystem(target)}
              </span>
            </h3>
          </div>

          <div className="">
            <h1>Potential now</h1>

            {isLoading ? (
              <Skeleton className="h-10 w-28" />
            ) : (
              <div
                className={twMerge(
                  "font-bold text-3xl flex gap-1 mt-2 items-center justify-center",
                  isPositive ? "text-green-400" : "text-red-500"
                )}
              >
                <IoTriangle
                  size={20}
                  className={twMerge(isPositive ? "" : "rotate-180")}
                />
                {potential.toFixed(2)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimateOnce>
  );
};

export default MyPapersCard;
