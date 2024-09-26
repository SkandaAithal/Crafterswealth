import React, { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Slider } from "../ui/slider";
import { TimePeriod } from "@/lib/types/components/stocks-chart";
import { barChartGraphData } from "@/lib/constants";
import { Button } from "../ui/button";
import AnimateOnce from "../common/AnimateOnce";
import { formatNumberInShort } from "@/lib/utils";

const StocksBarChart = () => {
  const MAX_VALUE = 500000;
  const [value, setValue] = useState([MAX_VALUE / 2]);
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
                ? "h-32"
                : timePeriod === TimePeriod.SixMonths
                  ? "h-36"
                  : "h-28"
            )}
          >
            <div
              className={twMerge(
                "w-full absolute text-sm font-semibold text-center transition-all duration-500",
                gainLoss >= 0 ? "bg-green-400" : "bg-red-500"
              )}
              style={{
                height: `${gainLossHeight}%`,
                bottom: gainLoss >= 0 ? "100%" : "auto",
              }}
            >
              <p className="-translate-y-6">
                ₹
                {formatNumberInShort(
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
    <div className="py-8 px-4 relative bg-white min-w-full md:min-w-[360px] md:max-w-96 space-y-16 rounded-lg shadow-md mt-6">
      <div>
        <h1 className="text-xl font-bold mb-6">What if you invest with us</h1>
        <Slider
          value={value}
          onValueChange={(newValue) => setValue(newValue)}
          min={(MAX_VALUE * 2) / 100}
          max={MAX_VALUE}
          step={MAX_VALUE / 100}
          className="w-full"
        />
        <div className="flex justify-between font-bold text-base mt-2">
          <p>{formatNumberInShort(investedAmount)}</p>
          <p className="text-xs text-gray-700">
            {formatNumberInShort(MAX_VALUE)}
          </p>
        </div>
        <div className="mt-4 text-base flex justify-between">
          Your investment with Crafterswealth
          <span className="text-green-400 font-bold">
            ₹
            {formatNumberInShort(
              investedAmount +
                investedAmount *
                  Math.abs(barChartGraphData[timePeriod].Crafterswealth)
            )}
          </span>
        </div>
        <div className="text-sm flex justify-between">
          <p>With absolute return in the last {timePeriod}</p>
          <p className="text-green-400">
            {(barChartGraphData[timePeriod].Crafterswealth * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-[280px] flex flex-col justify-end">
        <div className="space-y-4">
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

          <div className="flex text-sm text-center justify-center">
            {Object.keys(barChartGraphData).map((key, index) => (
              <Button
                key={key}
                onClick={() => handleTimePeriodChange(key as TimePeriod)}
                className={twMerge(
                  "text-primary px-3 cursor-pointer py-1.5 rounded-none border-[0.1px] border-white",
                  key === timePeriod
                    ? "bg-primary-blue-80 hover:bg-primary-blue-80"
                    : "",
                  index === 0
                    ? "rounded-l-full"
                    : index === Object.keys(barChartGraphData).length - 1
                      ? "rounded-r-full"
                      : ""
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
