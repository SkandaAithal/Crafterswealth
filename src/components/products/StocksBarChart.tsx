import React, { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Slider } from "../ui/slider";
import { formatNumberToIndianSystem } from "@/lib/utils";
import { TimePeriod } from "@/lib/types/stocks-chart";
import { barChartGraphData } from "@/lib/constants";
import { Button } from "../ui/button";
import AnimateOnce from "../common/AnimateOnce";

const StocksBarChart = () => {
  const MAX_VALUE = 1000000;
  const [value, setValue] = useState([(MAX_VALUE / 10) * 5]);
  const investedAmount = value[0];
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.OneMonth);

  const handleTimePeriodChange = (value: TimePeriod) => {
    setTimePeriod(value);
  };

  const renderBar = (gainLoss: number) => {
    const gainLossAmount = investedAmount * Math.abs(gainLoss);
    const gainLossHeight = (gainLossAmount / MAX_VALUE) * 100;

    return (
      <div className="flex flex-col items-center space-y-2 ">
        <AnimateOnce>
          <div
            className={twMerge(
              "w-16 relative transition-all duration-500",
              timePeriod === TimePeriod.ThreeMonths
                ? "h-36"
                : timePeriod === TimePeriod.SixMonths
                  ? "h-28"
                  : "h-40"
            )}
          >
            <div
              className={twMerge(
                "w-full absolute text-sm font-semibold text-center transition-all duration-500",
                gainLoss >= 0 ? "bg-green-500" : "bg-red-500"
              )}
              style={{
                height: `${gainLossHeight}%`,
                bottom: gainLoss >= 0 ? "100%" : "auto",
              }}
            >
              <p className="-translate-y-6">
                ₹
                {formatNumberToIndianSystem(
                  investedAmount + investedAmount * Math.abs(gainLoss)
                )}
              </p>
            </div>
            <div className="bg-accent h-full transition-all duration-500" />
          </div>
        </AnimateOnce>
      </div>
    );
  };

  return (
    <div className="py-8 px-4 relative bg-white min-w-full md:min-w-96 md:max-w-96 space-y-16 rounded-lg shadow-md">
      <div>
        <h1 className="text-xl font-bold mb-6">What if you invest in us</h1>
        <Slider
          value={value}
          onValueChange={(newValue) => setValue(newValue)}
          min={MAX_VALUE / 10}
          max={MAX_VALUE}
          step={MAX_VALUE / 100}
          className="w-full"
        />
        <div className="flex justify-between font-bold text-base mt-2">
          <p>{formatNumberToIndianSystem(investedAmount)}</p>
          <p className="text-xs text-gray-700">
            {formatNumberToIndianSystem(MAX_VALUE)}
          </p>
        </div>
        <div className="mt-4 text-base flex justify-between">
          Your investment from Crafterswealth
          <span className="text-green-500 font-bold">
            ₹
            {formatNumberToIndianSystem(
              investedAmount +
                investedAmount *
                  Math.abs(barChartGraphData[timePeriod].Crafterswealth)
            )}
          </span>
        </div>
        <div className="text-sm flex justify-between">
          <p>With absolute return in the last {timePeriod}</p>
          <p className="text-green-500">
            {(barChartGraphData[timePeriod].Crafterswealth * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-64 flex flex-col justify-end">
        <div className="space-y-3">
          <div className="flex justify-around mt-8 border-b-[1px] border-gray-300">
            {Object.keys(barChartGraphData[timePeriod]).map((key) => (
              <Fragment key={key}>
                {renderBar(
                  barChartGraphData[timePeriod][
                    key as keyof (typeof barChartGraphData)[TimePeriod]
                  ]
                )}
              </Fragment>
            ))}
          </div>
          <div className="flex text-sm justify-center text-center">
            {Object.keys(barChartGraphData[timePeriod]).map((key) => (
              <p className="flex-1" key={key}>
                {key}
              </p>
            ))}
          </div>

          <div className="flex text-sm justify-around text-center ">
            {Object.keys(barChartGraphData).map((key) => (
              <Button
                key={key}
                onClick={() => handleTimePeriodChange(key as TimePeriod)}
                className={twMerge(
                  "text-primary px-3 cursor-pointer py-1 rounded-full",
                  key === timePeriod ? "bg-primary-blue/60" : ""
                )}
              >
                {key}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksBarChart;
