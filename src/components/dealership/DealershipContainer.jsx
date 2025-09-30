import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Phone,
  User,
  MapPin,
  MoreHorizontal,
  Building2,
  Mail,
  Calendar,
  Star,
  Car,
  Edit,
  Trash2,
  UserCheck,
  UserX,
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const DealershipContainer = ({
  dealerships = [],
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  onPageChange = () => {},
  onViewDealership = () => {},
  onEditDealership = () => {},
  onDeleteDealership = () => {},
  onContactDealership = () => {},
  onActivateDealership = () => {},
  onDeactivateDealership = () => {},
}) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Column helper
  const columnHelper = createColumnHelper();

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Dealership Name",
        cell: ({ row }) => (
          <div>
            <div className="font-semibold text-neutral-900 text-sm">
              {row.original.name}
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {row.original.email}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: ({ getValue }) => (
          <div className="text-sm text-neutral-700">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("city", {
        header: "City",
        cell: ({ getValue }) => (
          <div className="text-sm text-neutral-700">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          const statusColors = {
            Active: "bg-green-100 text-green-800",
            Pending: "bg-yellow-100 text-yellow-800",
            Inactive: "bg-red-100 text-red-800",
          };
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
            >
              {status}
            </span>
          );
        },
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ getValue }) => (
          <div className="text-sm text-neutral-700 capitalize">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("salesManager", {
        header: "Sales Manager",
        cell: ({ getValue }) => (
          <div className="text-sm text-neutral-700 max-w-[120px] truncate" title={getValue()}>
            {getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("actions", {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-end items-center h-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-neutral-100 cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50"
              >
                <DropdownMenuItem
                  onClick={() => onViewDealership(row.original.id)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                >
                  <Eye className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                  <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onEditDealership(row.original.id)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                >
                  <Edit className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                  <span>Edit Dealership</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onContactDealership(row.original.id)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                >
                  <Phone className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                  <span>Contact</span>
                </DropdownMenuItem>
                {row.original.status === "Active" ? (
                  <DropdownMenuItem
                    onClick={() => onDeactivateDealership(row.original.id)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 focus:bg-red-50 focus:text-red-700 focus:outline-none transition-all duration-200 group"
                  >
                    <UserX className="w-4 h-4 text-neutral-500 group-hover:text-red-600 group-focus:text-red-600 transition-colors duration-200" />
                    <span>Deactivate</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => onActivateDealership(row.original.id)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none transition-all duration-200 group"
                  >
                    <UserCheck className="w-4 h-4 text-neutral-500 group-hover:text-green-600 group-focus:text-green-600 transition-colors duration-200" />
                    <span>Activate</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => onDeleteDealership(row.original.id)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 focus:bg-red-50 focus:text-red-700 focus:outline-none transition-all duration-200 group"
                >
                  <Trash2 className="w-4 h-4 text-neutral-500 group-hover:text-red-600 group-focus:text-red-600 transition-colors duration-200" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    [onViewDealership, onEditDealership, onDeleteDealership, onContactDealership, onActivateDealership, onDeactivateDealership]
  );

  // Create table instance
  const table = useReactTable({
    data: dealerships,
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

  // Calculate pagination display
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.div 
            className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Building2 className="w-5 h-5 text-orange-600" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Dealerships
            </h3>
            <p className="text-sm text-neutral-600">
              All dealership partners and details
            </p>
          </div>
        </motion.div>
        <motion.div 
          className="text-sm text-neutral-500"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of{" "}
          {totalCount} dealerships
        </motion.div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="mb-6 flex gap-4 items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="flex-1">
          <motion.input
            type="text"
            placeholder="Search dealerships..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-neutral-200 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.id !== 'actions';
                  const isSorted = header.column.getIsSorted();
                  
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-neutral-600 font-medium transition-colors duration-200 ${
                        isSortable 
                          ? 'cursor-pointer hover:text-neutral-900 hover:bg-neutral-50 group' 
                          : 'cursor-default'
                      } ${header.column.id === 'actions' ? 'text-right' : ''}`}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className={`flex items-center gap-2 ${header.column.id === 'actions' ? 'justify-end' : ''}`}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {isSortable && (
                          <div className="flex items-center">
                            {isSorted === 'asc' ? (
                              <ArrowUp className="w-3 h-3 text-orange-500" />
                            ) : isSorted === 'desc' ? (
                              <ArrowDown className="w-3 h-3 text-orange-500" />
                            ) : (
                              <ArrowUpDown className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200" />
                            )}
                          </div>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                variants={tableRowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={`py-4 ${cell.column.id === 'actions' ? 'text-right align-middle' : ''}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
        <motion.div 
          className="mt-3 text-xs text-neutral-500 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ArrowUpDown className="w-3 h-3" />
          <span>Click column headers to sort</span>
        </motion.div>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4">
        {table.getRowModel().rows.map((row, index) => (
          <motion.div
            key={row.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="space-y-3">
              {/* Dealership Name */}
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-neutral-900 text-base">
                  {row.original.name}
                </h4>
                <span className="text-sm text-neutral-500">#{row.original.id}</span>
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                <div className="text-sm text-neutral-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {row.original.email}
                </div>
                <div className="text-sm text-neutral-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {row.original.phone}
                </div>
                <div className="text-sm text-neutral-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {row.original.city}
                </div>
              </div>

              {/* Status and Role */}
              <div className="flex gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    row.original.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : row.original.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {row.original.status}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {row.original.role}
                </span>
              </div>

              {/* Sales Manager and Stats */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-600">Sales Manager</span>
                  <span className="text-sm font-medium text-neutral-800">
                    {row.original.salesManager}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-600">Vehicles in Stock</span>
                  <span className="text-sm text-neutral-700">
                    {row.original.vehiclesInStock}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-neutral-700">
                      {row.original.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 hover:bg-neutral-100"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 p-1 shadow-lg border border-neutral-200 bg-white rounded-lg"
                  >
                    <DropdownMenuItem
                      onClick={() => onViewDealership(row.original.id)}
                      className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                    >
                      <Eye className="w-4 h-4 mr-3 text-neutral-500" />
                      <span className="font-medium">View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEditDealership(row.original.id)}
                      className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                    >
                      <Edit className="w-4 h-4 mr-3 text-neutral-500" />
                      <span className="font-medium">Edit Dealership</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onContactDealership(row.original.id)}
                      className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                    >
                      <Phone className="w-4 h-4 mr-3 text-neutral-500" />
                      <span className="font-medium">Contact</span>
                    </DropdownMenuItem>
                    {row.original.status === "Active" ? (
                      <DropdownMenuItem
                        onClick={() => onDeactivateDealership(row.original.id)}
                        className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 rounded-md transition-colors duration-150 focus:bg-red-50 focus:text-red-900 focus:outline-none"
                      >
                        <UserX className="w-4 h-4 mr-3 text-red-500" />
                        <span className="font-medium">Deactivate</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => onActivateDealership(row.original.id)}
                        className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-green-700 hover:bg-green-50 hover:text-green-900 rounded-md transition-colors duration-150 focus:bg-green-50 focus:text-green-900 focus:outline-none"
                      >
                        <UserCheck className="w-4 h-4 mr-3 text-green-500" />
                        <span className="font-medium">Activate</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onDeleteDealership(row.original.id)}
                      className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 rounded-md transition-colors duration-150 focus:bg-red-50 focus:text-red-900 focus:outline-none"
                    >
                      <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                      <span className="font-medium">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DealershipContainer;
