import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { PREMIUM_PLAN_DATA, STANDARD_PLAN_DATA } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import PlanCard from "./PlanCard";

const PlansLayout = () => {
  const [isStandard, setIsStandard] = useState(true);

  const toggleSwitch = () => {
    setIsStandard(!isStandard);
  };

  const transitionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="md:px-6">
      <div className="flex items-center gap-4 text-xl font-semibold mb-6 justify-center">
        <h1>Standard</h1>
        <Switch checked={!isStandard} onClick={toggleSwitch} />
        <h1>Premium</h1>
      </div>

      <div>
        <AnimatePresence mode="wait">
          {isStandard ? (
            <motion.div
              key="standard"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={transitionVariants}
              className="flex flex-col md:flex-row gap-8 justify-center"
            >
              {STANDARD_PLAN_DATA.map((plan, index) => (
                <PlanCard key={index} plan={plan} className="md:w-[400px]" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="premium"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={transitionVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {PREMIUM_PLAN_DATA.map((plan, index) => (
                <PlanCard key={index} plan={plan} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlansLayout;
