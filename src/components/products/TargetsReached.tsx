import React from "react";
import { TARGETS_REACHED_ITEMS } from "@/lib/constants";
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

const TargetsReached = ({ onlyTargets = false }: { onlyTargets?: boolean }) => {
  const router = useRouter();
  return (
    <AnimateOnce>
      {!onlyTargets ? (
        <Title text="Recent Targets Achieved by CraftersWealth" size="H2" />
      ) : (
        <></>
      )}
      <div
        className={twMerge(
          "grid  gap-4",
          onlyTargets ? "grid-cols-1" : "md:grid-cols-[auto,auto]"
        )}
      >
        <Scroller move="left" onHoverStop baseSpeed={6}>
          {TARGETS_REACHED_ITEMS.map((item) => {
            const percentGain = (
              ((item.sell - item.buy) / item.buy) *
              100
            ).toFixed(2);

            return (
              <Link
                key={item.id}
                href={item.pdfLink}
                target="_blank"
                className=" rounded-xl overflow-hidden m-4 h-56 w-60 shadow-lg"
              >
                <div className="p-5 bg-[#e1e8ff] hover:bg-[#c5e0ff] transition-colors duration-300  h-full flex flex-col justify-between">
                  <h1 className="text-xl font-bold text-center mb-4">
                    {item.stock}
                  </h1>

                  <div className="flex justify-between mb-4">
                    <div className="text-left">
                      <p className="text-gray-700">Buy</p>
                      <p className="text-lg font-semibold">
                        ₹{formatToIndianNumberingSystem(item.buy)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700">Sell</p>
                      <p className="text-lg font-semibold">
                        ₹{formatToIndianNumberingSystem(item.sell)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-2xl font-bold text-green-400">
                    <BsTriangleFill className="mr-1" size={16} />+{percentGain}%
                  </div>
                </div>
              </Link>
            );
          })}
        </Scroller>
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
