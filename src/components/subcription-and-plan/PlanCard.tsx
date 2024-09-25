import React from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { PlanDetail } from "@/lib/types/plan";
import { FaCheck } from "react-icons/fa";
import { formatToIndianNumberingSystem } from "@/lib/utils";

interface PlanCardProps {
  plan: PlanDetail | null;
  className?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, className = "" }) => {
  const planType = plan?.type || "Unavailable Plan";
  const planPrice = plan?.price ? plan.price : "Price Unavailable";
  const planDescription = plan?.description || "Description Unavailable";
  const buttonText = plan?.button_text || "Learn More";
  const benefitsList = plan?.benefits
    ? plan.benefits.split("|")
    : ["No Benefits Available"];

  return (
    <div
      className={twMerge(
        "pr-6 py-10 rounded-lg shadow-xl cursor-default bg-primary text-center flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:scale-105 ",
        className
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-cover  bg-primary-blue-80 bg-top bg-plan-bg-image"></div>
      <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary-blue-100 via-primary-blue-80 via-40% via-[#2244a1] via-55% to-transparent"></div>

      <div className="relative z-20 space-y-6">
        <div className="flex flex-col justify-between items-center gap-6 min-h-52">
          <div className="space-y-5 pl-6 group-hover:text-primary">
            <h2 className="text-xl md:text-2xl font-bold">{planType}</h2>
            <p className="text-base">{planDescription}</p>
          </div>

          <div className="text-5xl font-bold bg-[#7ed8ff] shadow-lg group-hover:text-black w-full p-4 rounded-r-full">
            <span className="align-top text-xl">₹</span>
            {formatToIndianNumberingSystem(Number(planPrice))}
          </div>
        </div>

        <ul className="text-left space-y-1 text-base pl-6 group-hover:text-primary">
          {benefitsList.map((benefit, index) => (
            <li
              key={`${planType}-${index}`}
              className="flex items-center gap-2"
            >
              <div className="self-start">
                <FaCheck className="text-green-400 mt-1.5" size={14} />
              </div>
              <p> {benefit.trim()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="pl-6">
        <Button className="relative z-20 w-2/3  mx-auto mt-6 group-hover:bg-white group-hover:text-black">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
