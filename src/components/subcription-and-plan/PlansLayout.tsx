import React, { useState } from "react";
import PlanCard from "./PlanCard";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "../ui/switch";
import { PlanPageProps } from "@/lib/types/common/plan";

const PlansLayout: React.FC<PlanPageProps> = ({ plans, checkIfPremium }) => {
  const plan1 = plans[0].name;
  const plan2 = plans[1].name;
  const [selectedPlan, setSelectedPlan] = useState(plan1);

  const toggleSwitch = () => {
    setSelectedPlan((prev) => {
      const plan = prev === plan1 ? plan2 : plan1;
      if (checkIfPremium) {
        checkIfPremium(plan === plan2);
      }
      return plan;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPlanData =
    plans.find((plan) => plan.name === selectedPlan)?.plans || [];

  const transitionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="md:px-6">
      <div className="flex items-center gap-4 text-xl font-semibold mb-6 justify-center">
        <h1>{plan1}</h1>
        <Switch checked={selectedPlan === plan2} onClick={toggleSwitch} />
        <h1>{plan2}</h1>
      </div>

      <AnimatePresence>
        <motion.div
          className="flex flex-col md:flex-row flex-wrap gap-8 justify-center"
          key={selectedPlan}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={transitionVariants}
        >
          {currentPlanData.map((plan) => (
            <PlanCard key={plan.type} plan={plan} className="md:w-[350px]" />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PlansLayout;
