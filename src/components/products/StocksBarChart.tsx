import React, { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Slider } from "../ui/slider";
import {
  TimePeriod,
  InvestmentType,
} from "@/lib/types/components/stocks-chart";
import { Button } from "../ui/button";
import { formatNumberInShort } from "@/lib/utils";

export type BarChartGraphData = {
  [key in TimePeriod]: Record<string, number>;
};

interface StocksBarChartProps {
  barChartGraphData: BarChartGraphData;
  MAX_VALUE?: number;
  primaryInvestMent: InvestmentType;
}

const StocksBarChart: React.FC<StocksBarChartProps> = ({
  barChartGraphData,
  MAX_VALUE = 500000,
  primaryInvestMent,
}) => {
  const [value, setValue] = useState([MAX_VALUE / 2]);
  const investedAmount = value[0];
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.OneMonth);

  const handleTimePeriodChange = (value: TimePeriod) => {
    setTimePeriod(value);
  };

  const renderBar = (gainLoss: number, minGainLoss: number) => {
    const gainLossAmount = investedAmount * Math.abs(gainLoss);
    const adjustedGainLossAmount = Math.max(
      gainLossAmount - Math.abs(minGainLoss),
      0
    );
    const gainLossHeight =
      (adjustedGainLossAmount / (MAX_VALUE - Math.abs(minGainLoss))) * 100 + 30;
    const clampedHeight = Math.min(gainLossHeight, 100);

    return (
      <div className="flex flex-col h-full items-center relative">
        <div
          className={twMerge(
            "w-16 h-full text-sm absolute font-semibold text-center transition-all duration-500",
            gainLoss >= 0
              ? "bg-gradient-to-t from-green-300 to-green-500"
              : "bg-gradient-to-t from-red-400 to-red-600"
          )}
          style={{
            height: `${clampedHeight}%`,
            bottom: 0,
          }}
        >
          <p className="-translate-y-6">
            ₹
            {formatNumberInShort(
              investedAmount + investedAmount * Math.abs(gainLoss)
            )}
          </p>
        </div>
      </div>
    );
  };

  const gainLossValues = Object.values(barChartGraphData[timePeriod]);
  const minGainLoss = Math.min(...gainLossValues);

  return (
    <div className="py-8 px-4 relative bg-white min-w-full md:min-w-[360px] md:max-w-96 space-y-16 rounded-lg shadow-md">
      <div>
        <h1 className="text-xl font-bold mb-6">
          What If You Invested With Us?
        </h1>
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
          Your investment with {primaryInvestMent}
          <span className="text-green-400 font-bold">
            ₹
            {formatNumberInShort(
              investedAmount +
                investedAmount *
                  Math.abs(barChartGraphData[timePeriod][primaryInvestMent])
            )}
          </span>
        </div>
        <div className="text-sm flex justify-between">
          <p>Returns in the last {timePeriod}</p>
          <p className="text-green-400">
            {(barChartGraphData[timePeriod][primaryInvestMent] * 100).toFixed(
              1
            )}
            %&nbsp;*
          </p>
        </div>
      </div>

      <div className="h-[320px] flex flex-col justify-end">
        <div className="space-y-4">
          <div className="flex justify-around mt-8 border-b-[1px] border-gray-300 h-[260px]">
            {Object.keys(barChartGraphData[timePeriod]).map((key) => (
              <Fragment key={key}>
                {renderBar(
                  barChartGraphData[timePeriod][key as InvestmentType],
                  minGainLoss
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
        <p className="text-xs mt-3 text-left text-gray-500">
          * Past performance is not indicative of future results, and the
          figures shown are for comparison purposes only.
        </p>
      </div>
    </div>
  );
};

export default StocksBarChart;
