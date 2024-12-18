import React from "react";
import Scroller from "../common/Scroller";
import { BsTriangleFill } from "react-icons/bs";
import Title from "../common/Title";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import AnimateOnce from "../common/AnimateOnce";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import { ACCOMPLISHMENTS } from "@/lib/routes";
import { formatToIndianNumberingSystem } from "@/lib/utils";
import Link from "next/link";
import { useApp } from "@/lib/provider/app-provider";
import { Skeleton } from "../ui/skeleton";

const TargetsReached = ({ onlyTargets = false }: { onlyTargets?: boolean }) => {
  const router = useRouter();
  const { achievements, isAchievementsLoading } = useApp();
  const allAchievements = Object.values(achievements).flat();
  return (
    <AnimateOnce>
      {!onlyTargets ? (
        <Title
          text="Recent Targets Achieved by CraftersWealth"
          size="H2"
          className="px-2"
        />
      ) : (
        <></>
      )}
      <div
        className={twMerge(
          "grid gap-4",
          onlyTargets ? "grid-cols-1" : "md:grid-cols-[auto,auto]"
        )}
      >
        {isAchievementsLoading ? (
          <Scroller move="left" baseSpeed={6}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className=" rounded-2xl overflow-hidden m-4 h-[260px] w-72 shadow-lg"
              />
            ))}
          </Scroller>
        ) : (
          <Scroller move="left" onHoverStop baseSpeed={6}>
            {allAchievements.map((item) => {
              return (
                <Link
                  key={item["Product Name"]}
                  href={item.PdfLink}
                  target="_blank"
                  className=" rounded-2xl overflow-hidden m-4 h-[260px] w-72 shadow-lg"
                >
                  <div className="p-6 bg-primary-blue-30 hover:bg-[#c5e0ff] transition-colors duration-300  h-full flex flex-col justify-between">
                    <h1 className="text-xl font-bold text-center mb-4">
                      <p className="line-clamp-2">{item["Stock Name"]}</p>
                      <p className="line-clamp-1">({item["Product Name"]})</p>
                    </h1>

                    <div className="flex justify-between mb-4">
                      <div className="text-left">
                        <p className="text-gray-700">Buy</p>
                        <p className="text-lg font-semibold">
                          ₹
                          {formatToIndianNumberingSystem(
                            Number(item["Pur. Price"])
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">Sell</p>
                        <p className="text-xl font-semibold">
                          ₹
                          {formatToIndianNumberingSystem(
                            Number(item["Target Price"])
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl font-bold text-green-400">
                      <BsTriangleFill className="mr-1" size={16} />+
                      {item.Profit}%
                    </div>
                  </div>
                </Link>
              );
            })}
            {allAchievements.map((item) => {
              return (
                <Link
                  key={item["Product Name"]}
                  href={item.PdfLink}
                  target="_blank"
                  className=" rounded-2xl overflow-hidden m-4 h-[260px] w-72 shadow-lg"
                >
                  <div className="p-6 bg-primary-blue-30 hover:bg-[#c5e0ff] transition-colors duration-300  h-full flex flex-col justify-between">
                    <h1 className="text-xl font-bold text-center mb-4">
                      <p className="line-clamp-2">{item["Stock Name"]}</p>
                      <p className="line-clamp-1">({item["Product Name"]})</p>
                    </h1>

                    <div className="flex justify-between mb-4">
                      <div className="text-left">
                        <p className="text-gray-700">Buy</p>
                        <p className="text-lg font-semibold">
                          ₹
                          {formatToIndianNumberingSystem(
                            Number(item["Pur. Price"])
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">Sell</p>
                        <p className="text-xl font-semibold">
                          ₹
                          {formatToIndianNumberingSystem(
                            Number(item["Target Price"])
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl font-bold text-green-400">
                      <BsTriangleFill className="mr-1" size={16} />+
                      {item.Profit}%
                    </div>
                  </div>
                </Link>
              );
            })}
          </Scroller>
        )}

        <div className="my-auto mx-8">
          <Button
            variant="transparent"
            className="text-center text-primary-blue"
            onClick={() => router.push(ACCOMPLISHMENTS)}
          >
            View all &nbsp;
            <FaArrowRightLong />
          </Button>
        </div>
      </div>
    </AnimateOnce>
  );
};

export default TargetsReached;
