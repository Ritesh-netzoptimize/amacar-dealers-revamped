import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Clock,
  TrendingDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LiveSessionsContainer = ({ sessions = [] }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("vehicle", {
        header: "Vehicle",
        cell: (info) => {
          const session = info.row.original;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-neutral-900">
                {session.vehicle}
              </span>
              <span className="text-sm text-neutral-500">
                {session.year} • {session.model}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("year", {
        header: "Year",
        cell: (info) => (
          <span className="text-neutral-700">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("model", {
        header: "Model",
        cell: (info) => (
          <span className="text-neutral-700">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("timeLeft", {
        header: "Time Left",
        cell: (info) => {
          const session = info.row.original;
          return (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-orange-600">
                {session.timeLeft}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const variant = status === "active" ? "default" : "secondary";
          const statusText = status === "active" ? "Active" : "Ended";
          return (
            <Badge variant={variant} className="capitalize">
              {statusText}
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const session = info.row.original;
          const isActive = session.status === "active";
          
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/reverse-bidding/session/${session.id}`)}
              disabled={!isActive}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Session
            </Button>
          );
        },
      }),
    ],
    [columnHelper, navigate]
  );

  const table = useReactTable({
    data: sessions,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
    >
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search sessions..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-neutral-200 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.id !== "actions";
                  const isSorted = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      className="text-neutral-700 font-semibold"
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          isSortable ? "cursor-pointer select-none" : ""
                        }`}
                        onClick={
                          isSortable
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSortable && (
                          <span className="flex flex-col">
                            {isSorted === "asc" ? (
                              <ArrowUp className="w-3 h-3 text-primary-600" />
                            ) : isSorted === "desc" ? (
                              <ArrowDown className="w-3 h-3 text-primary-600" />
                            ) : (
                              <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-neutral-500"
                >
                  No sessions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default LiveSessionsContainer;

