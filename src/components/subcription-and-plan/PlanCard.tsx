import { MembershipPlan } from "@/lib/types/plan";
import React from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";

const PlanCard = ({
  plan,
  className = "",
}: {
  plan: MembershipPlan;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "p-6 rounded-lg shadow-xl cursor-default bg-primary text-center space-y-10",
        className
      )}
    >
      <h2 className="text-2xl font-bold ">{plan.title}</h2>
      <div className="text-5xl font-bold ">₹{plan.price}</div>
      <p className="text-gray-600 ">{plan.description}</p>
      <Button className=" bg-green-500 hover:bg-green-500/80">
        {plan.buttonText}
      </Button>

      <ul className="list-disc text-left pl-6">
        {plan.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;
