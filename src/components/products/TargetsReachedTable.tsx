import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { TARGETS_REACHED_ITEMS } from "@/lib/constants";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Button } from "../ui/button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import AnimateOnce from "../common/AnimateOnce";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

interface SortConfig {
  key: keyof (typeof TARGETS_REACHED_ITEMS)[0] | "profit";
  order: SortOrder;
}

const TargetsReachedTable = ({
  headerClassName,
}: {
  headerClassName: string;
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "stock",
    order: SortOrder.ASC,
  });

  const handleSort = (
    key: keyof (typeof TARGETS_REACHED_ITEMS)[0] | "profit"
  ) => {
    const newOrder =
      sortConfig.key === key && sortConfig.order === SortOrder.ASC
        ? SortOrder.DESC
        : SortOrder.ASC;
    setSortConfig({ key, order: newOrder });
  };

  const sortedItems = [...TARGETS_REACHED_ITEMS].sort((a, b) => {
    const aProfit = ((a.sell - a.buy) / a.buy) * 100;
    const bProfit = ((b.sell - b.buy) / b.buy) * 100;

    if (sortConfig.key === "profit") {
      return sortConfig.order === SortOrder.ASC
        ? aProfit - bProfit
        : bProfit - aProfit;
    }

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.order === SortOrder.ASC ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.order === SortOrder.ASC ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (key: keyof any) => {
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
              onClick={() => handleSort("stock")}
            >
              <div className="flex items-center gap-2">
                Stock {getSortIcon("stock")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("profit")}
            >
              <div className="flex items-center gap-2">
                Returns {getSortIcon("profit")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("period")}
            >
              <div className="flex items-center gap-2">
                Period {getSortIcon("period")}
              </div>
            </TableHead>
            <TableHead className="w-32">View Paper</TableHead>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => {
              const profit = ((item.sell - item.buy) / item.buy) * 100;
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.stock}</TableCell>

                  <TableCell className="text-green-500 font-semibold">
                    {profit.toFixed(2)} %
                  </TableCell>

                  <TableCell>{item.period}</TableCell>

                  <TableCell className="text-center text-primary-blue">
                    <Link href={item.pdfLink} target="_blank">
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
