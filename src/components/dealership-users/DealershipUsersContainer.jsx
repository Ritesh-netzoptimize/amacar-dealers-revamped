import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  UserX,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import ActDeActModalDealershipUsers from "@/components/ui/ActDeActModalDealershipUsers";
import EditDealershipUsersModal from "@/components/ui/EditDealershipUsersModal";
import { getUserPermissions } from "@/utils/rolePermissions";
import { useSelector } from "react-redux";

const DealershipUsersContainer = ({
  users,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onViewUser,
  onEditUser,
  onDeactivateUser,
  onContactUser,
  onActivateUser,
  onRefresh,
}) => {
  const [hoveredUser, setHoveredUser] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { user } = useSelector((state) => state.user);

  const userRole = user?.role;
  const permissions = getUserPermissions(userRole, user);
  const { canDeleteUpdateDealershipUsers } = permissions;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLastLogin = useCallback((dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  }, []);

  // Modal handlers
  const handleActivateUser = useCallback(
    (userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setSelectedUser(user);
        setModalAction("activate");
        setModalOpen(true);
      }
    },
    [users]
  );

  const handleDeactivateUser = useCallback(
    (userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setSelectedUser(user);
        setModalAction("deactivate");
        setModalOpen(true);
      }
    },
    [users]
  );

  const handleModalClose = () => {
    setModalOpen(false);
    setModalAction(null);
    setSelectedUser(null);
  };

  const handleModalSuccess = (userId, isActivated) => {
    // Call the parent's callback if provided
    if (isActivated && onActivateUser) {
      onActivateUser(userId);
    } else if (!isActivated && onDeactivateUser) {
      onDeactivateUser(userId);
    }
  };

  // Edit modal handlers
  const handleEditUser = useCallback(
    (userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setEditingUser(user);
        setEditModalOpen(true);
      }
    },
    [users]
  );

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditingUser(null);
  };

  const handleEditSuccess = () => {
    // Call the parent's refresh callback if provided
    if (onRefresh) {
      onRefresh();
    }
  };

  // Column helper
  const columnHelper = createColumnHelper();

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("display_name", {
        header: "User",
        cell: ({ row }) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              {row.original.avatar ? (
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={row.original.avatar}
                  alt={row.original.display_name}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-neutral-400" />
                </div>
              )}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-neutral-900">
                {row.original.display_name ||
                  `${row.original.first_name} ${row.original.last_name}`}
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: ({ row }) => (
          <div className="flex items-center text-sm text-neutral-900">
            <Phone className="h-4 w-4 text-neutral-400 mr-2" />
            {row.original.phone || "N/A"}
          </div>
        ),
      }),
      columnHelper.accessor("address", {
        header: "Location",
        cell: ({ row }) => (
          <div className="flex items-center text-sm text-neutral-900">
            <MapPin className="h-4 w-4 text-neutral-400 mr-2" />
            {row.original.address
              ? `${row.original.address.city}, ${row.original.address.state}`
              : "N/A"}
          </div>
        ),
      }),

      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center text-sm text-neutral-900">
            <Mail className="h-4 w-4 text-neutral-400 mr-2" />
            {row.original.email
              ? `${row.original.email}`
              : "N/A"}
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <div className="space-y-1">
            <Badge
              className={`${getStatusColor(
                row.original.status?.formatted_status
              )} border`}
            >
              {row.original.status?.formatted_status || "Unknown"}
            </Badge>
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
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-neutral-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={4}
                className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50 absolute top-full right-0 mt-2"
              >
                {canDeleteUpdateDealershipUsers && (
                  <DropdownMenuItem
                    onClick={() => handleEditUser(row.original.id)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                  >
                    <Edit className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                    <span>Edit User</span>
                  </DropdownMenuItem>
                )}
                {/* <DropdownMenuItem
                  //   onClick={() => onContactUser(row.original.id)}
                  onClick={(e) => e.stopPropagation()}
                  href={`tel:${row.original.phone}`}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                >
                  <MessageSquare className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                  <span>Contact</span>
                </DropdownMenuItem> */}
                {row.original.status.account_status === "active" && canDeleteUpdateDealershipUsers ? (
                  <DropdownMenuItem
                    onClick={() => handleDeactivateUser(row.original.id)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 focus:bg-red-50 focus:text-red-700 focus:outline-none transition-all duration-200 group"
                  >
                    <UserX className="w-4 h-4 text-neutral-500 group-hover:text-red-600 group-focus:text-red-600 transition-colors duration-200" />
                    <span>Deactivate</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => handleActivateUser(row.original.id)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none transition-all duration-200 group"
                  >
                    <UserCheck className="w-4 h-4 text-neutral-500 group-hover:text-green-600 group-focus:text-green-600 transition-colors duration-200" />
                    <span>Activate</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    [
      columnHelper,
      //   onViewUser,
      handleEditUser,
      //   onContactUser,
      handleActivateUser,
      handleDeactivateUser,
      canDeleteUpdateDealershipUsers
    ]
  );

  // Create table instance
  const table = useReactTable({
    data: users,
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Users Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
      >
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
              placeholder="Search users..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Refresh
          </Button>
        </motion.div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block overflow-x-auto">
          <Table className="w-full min-w-[1000px]">
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
                        className={`text-neutral-600 font-medium transition-colors duration-200 ${
                          isSortable
                            ? "cursor-pointer hover:text-neutral-900 hover:bg-neutral-50 group"
                            : "cursor-default"
                        } ${
                          header.column.id === "actions" ? "text-right" : ""
                        }`}
                        onClick={
                          isSortable
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div
                          className={`flex items-center gap-2 ${
                            header.column.id === "actions" ? "justify-end" : ""
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {isSortable && (
                            <div className="flex items-center">
                              {isSorted === "asc" ? (
                                <ArrowUp className="w-3 h-3 text-orange-500" />
                              ) : isSorted === "desc" ? (
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
                    <TableCell
                      key={cell.id}
                      className={`py-4 ${
                        cell.column.id === "actions"
                          ? "text-right align-middle"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {row.original.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={row.original.avatar}
                          alt={row.original.display_name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-900 text-base">
                        {row.original.display_name ||
                          `${row.original.first_name} ${row.original.last_name}`}
                      </h4>
                      <p className="text-sm text-neutral-500">
                        @{row.original.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-500">
                    #{row.original.id}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-1">
                  <div className="text-sm text-neutral-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {row.original.email}
                  </div>
                  <div className="text-sm text-neutral-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {row.original.phone || "N/A"}
                  </div>
                  <div className="text-sm text-neutral-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {row.original.address
                      ? `${row.original.address.city}, ${row.original.address.state}`
                      : "N/A"}
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-1">
                  <div className="text-sm font-medium text-neutral-900">
                    {row.original.business?.dealership_name || "N/A"}
                  </div>
                  <div className="text-sm text-neutral-500">
                    Code: {row.original.business?.dealer_code || "N/A"}
                  </div>
                  <div className="text-sm">
                    {row.original.business?.website ? (
                      <a
                        href={row.original.business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {row.original.business.website}
                      </a>
                    ) : (
                      <span className="text-neutral-500">Website: N/A</span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex gap-2 items-center">
                  <Badge
                    className={`${getStatusColor(
                      row.original.status?.formatted_status
                    )} border`}
                  >
                    {row.original.status?.formatted_status || "Unknown"}
                  </Badge>
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
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                      sideOffset={4}
                      className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50 absolute top-full right-0 mt-2"
                    >
                      <DropdownMenuItem
                        onClick={() => handleEditUser(row.original.id)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                      >
                        <Edit className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                        <span>Edit User</span>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem
                        // onClick={() => onContactUser(row.original.id)}
                        onClick={(e) => e.stopPropagation()}
                        href={`tel:${row.original.phone}`}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                      >
                        <MessageSquare className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                        <span>Contact</span>
                      </DropdownMenuItem> */}
                      {row.original.status.account_status === "active" ? (
                        <DropdownMenuItem
                          onClick={() => handleDeactivateUser(row.original.id)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 focus:bg-red-50 focus:text-red-700 focus:outline-none transition-all duration-200 group"
                        >
                          <UserX className="w-4 h-4 text-neutral-500 group-hover:text-red-600 group-focus:text-red-600 transition-colors duration-200" />
                          <span>Deactivate</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleActivateUser(row.original.id)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none transition-all duration-200 group"
                        >
                          <UserCheck className="w-4 h-4 text-neutral-500 group-hover:text-green-600 group-focus:text-green-600 transition-colors duration-200" />
                          <span>Activate</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Get started by adding your first dealership user.
            </p>
          </div>
        )}
      </motion.div>

      {/* Activate/Deactivate Modal */}
      <ActDeActModalDealershipUsers
        isOpen={modalOpen}
        onClose={handleModalClose}
        action={modalAction}
        userId={selectedUser?.id}
        userName={
          selectedUser?.display_name ||
          `${selectedUser?.first_name} ${selectedUser?.last_name}`
        }
        onSuccess={handleModalSuccess}
        onRefresh={onRefresh}
      />

      {/* Edit Dealership User Modal */}
      <EditDealershipUsersModal
        isOpen={editModalOpen}
        onClose={handleEditModalClose}
        dealershipUserData={editingUser}
        onSuccess={handleEditSuccess}
      />
    </motion.div>
  );
};

export default DealershipUsersContainer;
