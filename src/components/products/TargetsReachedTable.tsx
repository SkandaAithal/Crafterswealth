import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Button } from "../ui/button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import AnimateOnce from "../common/AnimateOnce";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useApp } from "@/lib/provider/app-provider";
import { Achievement } from "@/lib/types/common/app";

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

interface SortConfig {
  key: keyof Achievement;
  order: SortOrder;
}

const TargetsReachedTable = ({
  headerClassName,
  selectedCategory,
}: {
  headerClassName: string;
  selectedCategory: string;
}) => {
  const { achievements, isAchievementsLoading } = useApp();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "Stock Name",
    order: SortOrder.ASC,
  });

  const selectedAchievement = useMemo(() => {
    const arr = isAchievementsLoading
      ? []
      : achievements[selectedCategory] ||
        achievements[Object.keys(achievements)[0]];
    return arr;
  }, [achievements, isAchievementsLoading, selectedCategory]);

  const handleSort = (key: keyof Achievement) => {
    const newOrder =
      sortConfig.key === key && sortConfig.order === SortOrder.ASC
        ? SortOrder.DESC
        : SortOrder.ASC;
    setSortConfig({ key, order: newOrder });
  };

  const sortedItems = useMemo(() => {
    return [...selectedAchievement].sort((a, b) => {
      const key = sortConfig.key;

      const isNumericField = key === "Profit" || key === "Days Held";
      const aValue = isNumericField ? parseFloat(a[key] as string) : a[key];
      const bValue = isNumericField ? parseFloat(b[key] as string) : b[key];

      if (aValue < bValue) {
        return sortConfig.order === SortOrder.ASC ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.order === SortOrder.ASC ? 1 : -1;
      }
      return 0;
    });
  }, [selectedAchievement, sortConfig]);

  const getSortIcon = (key: keyof Achievement) => {
    let icon = <FaSort />;

    if (sortConfig.key === key) {
      icon = sortConfig.order === "asc" ? <FaSortUp /> : <FaSortDown />;
    }

    return (
      <Button variant="transparent" className="my-auto">
        {icon}
      </Button>
    );
  };

  return (
    <AnimateOnce>
      <div className="overflow-x-auto overflow-y-auto max-h-[550px] relative max-w-screen-lg mx-auto">
        <Table aria-label="Targets Reached" className="min-w-[600px]">
          <TableHeader className={twMerge("sticky top-0", headerClassName)}>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("Stock Name")}
            >
              <div className="flex items-center gap-2">
                Stock {getSortIcon("Stock Name")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("Profit")}
            >
              <div className="flex items-center gap-2">
                Returns {getSortIcon("Profit")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("Days Held")}
            >
              <div className="flex items-center gap-2">
                Period {getSortIcon("Days Held")}
              </div>
            </TableHead>
            <TableHead className="w-32">View Paper</TableHead>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => {
              return (
                <TableRow key={item["Product Name"]}>
                  <TableCell>{item["Stock Name"]}</TableCell>

                  <TableCell className="text-green-500 font-semibold">
                    {item["Profit"]} %
                  </TableCell>

                  <TableCell>{item["Days Held"].split(".")[0]} days</TableCell>

                  <TableCell className="text-center text-primary-blue">
                    <Link href={item.PdfLink} target="_blank">
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        View <MdOutlineRemoveRedEye />
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </AnimateOnce>
  );
};

export default TargetsReachedTable;
