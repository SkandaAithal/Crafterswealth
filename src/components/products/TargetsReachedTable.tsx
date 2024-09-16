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
import { IoEye } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import AnimateOnce from "../common/AnimateOnce";

const PAGE_SIZE = 10;

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

interface SortConfig {
  key: keyof (typeof TARGETS_REACHED_ITEMS)[0];
  order: SortOrder;
}

const TargetsReachedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "stock",
    order: SortOrder.ASC,
  });

  const totalPages = Math.ceil(TARGETS_REACHED_ITEMS.length / PAGE_SIZE);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleSort = (key: keyof (typeof TARGETS_REACHED_ITEMS)[0]) => {
    setCurrentPage(1);
    const newOrder =
      sortConfig.key === key && sortConfig.order === SortOrder.ASC
        ? SortOrder.DESC
        : SortOrder.ASC;
    setSortConfig({ key, order: newOrder });
  };

  const sortedItems = [...TARGETS_REACHED_ITEMS].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.order === SortOrder.ASC ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.order === SortOrder.ASC ? 1 : -1;
    return 0;
  });

  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getSortIcon = (key: keyof (typeof TARGETS_REACHED_ITEMS)[0]) => {
    let icon = null;

    if (sortConfig.key !== key) {
      icon = <FaSort />;
    } else if (sortConfig.order === "asc") {
      icon = <FaSortUp />;
    } else {
      icon = <FaSortDown />;
    }
    return (
      <Button variant="transparent" className="my-auto">
        {icon}
      </Button>
    );
  };

  return (
    <AnimateOnce>
      <div className="overflow-x-auto relative md:static">
        <Table aria-label="Targets Reached" className="min-w-[600px] md:w-full">
          <TableHeader>
            <TableHead
              className="w-[400px] cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              <div className="flex items-center gap-2">
                Stock {getSortIcon("stock")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("buy")}
            >
              <div className="flex items-center gap-2">
                Buy Price {getSortIcon("buy")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("sell")}
            >
              <div className="flex items-center gap-2">
                Sell Price {getSortIcon("sell")}
              </div>
            </TableHead>
            <TableHead>Returns</TableHead>
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
            {paginatedItems.map((item) => {
              const profit = (
                ((item.sell - item.buy) / item.buy) *
                100
              ).toFixed(2);
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>₹ {item.buy.toFixed(2)}</TableCell>
                  <TableCell>₹ {item.sell.toFixed(2)}</TableCell>

                  <TableCell className="text-green-500 font-semibold">
                    {profit} %
                  </TableCell>

                  <TableCell>{item.period}</TableCell>

                  <TableCell className="text-center text-primary-blue">
                    <div className="flex items-center justify-center gap-1 cursor-pointer">
                      View <IoEye />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center gap-10 items-center py-10">
        <Button
          variant="transparent"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </Button>
        <span className="text-base">
          {currentPage} of {totalPages}
        </span>
        <Button
          variant="transparent"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </Button>
      </div>
    </AnimateOnce>
  );
};

export default TargetsReachedTable;
