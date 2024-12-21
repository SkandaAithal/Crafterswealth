import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

const ComplaintsTable = () => {
  const annualData = [
    {
      sNo: 1,
      month: "2024-25",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 2,
      month: "2025-26",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
  ];

  const monthlyData = [
    {
      sNo: 1,
      month: "January 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 2,
      month: "February 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 3,
      month: "March 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 4,
      month: "April 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 5,
      month: "May 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 6,
      month: "June 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 7,
      month: "July 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 8,
      month: "August 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 9,
      month: "September 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 10,
      month: "October 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 11,
      month: "November 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
    {
      sNo: 12,
      month: "December 2024",
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    },
  ];

  const lastMonthData = [
    {
      sNo: 1,
      receivedFrom: "Directly from investors",
      pendingLastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgResolutionTime: 0,
    },
    {
      sNo: 2,
      receivedFrom: "SEBI (scores)",
      pendingLastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgResolutionTime: 0,
    },
    {
      sNo: 3,
      receivedFrom: "Other Sources",
      pendingLastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgResolutionTime: 0,
    },
    {
      sNo: "",
      receivedFrom: "Grand Total",
      pendingLastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgResolutionTime: 0,
    },
  ];

  return (
    <div className="max-w-screen-lg text-center mx-auto">
      <h2 className="text-2xl font-bold mb-4">Annual Disposal of Complaints</h2>
      <div className="overflow-x-auto relative max-w-screen-lg mx-auto">
        <Table className="min-w-full border-collapse border border-gray-300 text-center">
          <TableHeader>
            <TableHead className="border border-gray-300 text-center">
              S.No
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Month
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Carried Forward
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Received
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Resolved
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Pending
            </TableHead>
          </TableHeader>
          <TableBody>
            {annualData.map((row) => (
              <TableRow key={row.sNo}>
                <TableCell className="border border-gray-300 text-center">
                  {row.sNo}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.month}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.carriedForward}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.received}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.resolved}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.pending}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Monthly Disposal of Complaints
      </h2>
      <div className="overflow-x-auto relative max-w-screen-lg mx-auto">
        <Table className="min-w-full border-collapse border border-gray-300 text-center">
          <TableHeader>
            <TableHead className="border border-gray-300 text-center">
              S.No
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Month
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Carried Forward
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Received
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Resolved
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Pending
            </TableHead>
          </TableHeader>
          <TableBody>
            {monthlyData.map((row) => (
              <TableRow key={row.sNo}>
                <TableCell className="border border-gray-300 text-center">
                  {row.sNo}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.month}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.carriedForward}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.received}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.resolved}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.pending}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Last month ending Complaints
      </h2>
      <div className="overflow-x-auto relative max-w-screen-lg mx-auto">
        <Table className="min-w-full border-collapse border border-gray-300 text-center">
          <TableHeader>
            <TableHead className="border border-gray-300 text-center">
              S.No
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Received From
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Pending at the end of last month
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Received
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Resolved*
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Total Pending
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Pending Complaints &gt; 3 months #
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Average Resolution Time (in days)
            </TableHead>
          </TableHeader>
          <TableBody>
            {lastMonthData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-300 text-center">
                  {row.sNo}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.receivedFrom}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.pendingLastMonth}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.received}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.resolved}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.totalPending}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.pending3Months}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {row.avgResolutionTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComplaintsTable;
