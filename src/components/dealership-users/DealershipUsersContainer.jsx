import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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

  const formatLastLogin = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Users</p>
              <p className="text-2xl font-bold text-neutral-900">{totalCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(user => user.status?.toLowerCase() === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Inactive Users</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(user => user.status?.toLowerCase() === "inactive").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pending Users</p>
              <p className="text-2xl font-bold text-yellow-600">
                {users.filter(user => user.status?.toLowerCase() === "pending").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">
              Dealership Users ({totalCount})
            </h3>
            <Button
              onClick={onRefresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={itemVariants}
                  className={`hover:bg-neutral-50 transition-colors duration-200 ${
                    hoveredUser === user.id ? "bg-blue-50" : ""
                  }`}
                  onMouseEnter={() => setHoveredUser(user.id)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  {/* User Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.avatar}
                            alt={user.display_name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-neutral-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">
                          {user.display_name || `${user.first_name} ${user.last_name}`}
                        </div>
                        <div className="text-sm text-neutral-500">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-neutral-900">
                        <Mail className="h-4 w-4 text-neutral-400 mr-2" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center text-sm text-neutral-500">
                          <Phone className="h-4 w-4 text-neutral-400 mr-2" />
                          {user.phone}
                        </div>
                      )}
                      {user.address && (
                        <div className="flex items-center text-sm text-neutral-500">
                          <MapPin className="h-4 w-4 text-neutral-400 mr-2" />
                          {user.address.city}, {user.address.state}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Business Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-neutral-900">
                        {user.business?.dealership_name || "N/A"}
                      </div>
                      <div className="text-sm text-neutral-500">
                        Code: {user.business?.dealer_code || "N/A"}
                      </div>
                      {user.business?.website && (
                        <div className="text-sm text-blue-600">
                          <a
                            href={user.business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {user.business.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <Badge
                        className={`${getStatusColor(user.status?.formatted_status)} border`}
                      >
                        {user.status?.formatted_status || "Unknown"}
                      </Badge>
                      <div className="text-xs text-neutral-500">
                        {user.status?.user_status || "N/A"}
                      </div>
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">
                      {formatLastLogin(user.dates?.last_login)}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Joined {formatDate(user.dates?.created_at)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewUser(user.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditUser(user.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onContactUser(user.id)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact
                        </DropdownMenuItem>
                        {user.status?.toLowerCase() === "active" ? (
                          <DropdownMenuItem
                            onClick={() => onDeactivateUser(user.id)}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => onActivateUser(user.id)}
                            className="text-green-600"
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
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
    </motion.div>
  );
};

export default DealershipUsersContainer;
