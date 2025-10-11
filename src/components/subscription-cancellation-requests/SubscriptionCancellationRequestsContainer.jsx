import React, { useState } from "react";
import { motion } from "framer-motion";
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
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  Building2,
  User,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";

const SubscriptionCancellationRequestsContainer = ({
  cancellationRequests,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onViewRequest,
  onApproveRequest,
  onRejectRequest,
  onRefresh,
}) => {
  const [loading, setLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  // Handle request actions
  const handleViewRequest = (requestId) => {
    onViewRequest(requestId);
  };

  const handleApproveRequest = async (requestId) => {
    setLoading(true);
    try {
      await onApproveRequest(requestId);
      toast.success("Cancellation request approved successfully");
    } catch (error) {
      toast.error("Failed to approve cancellation request");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    setLoading(true);
    try {
      await onRejectRequest(requestId);
      toast.success("Cancellation request rejected successfully");
    } catch (error) {
      toast.error("Failed to reject cancellation request");
    } finally {
      setLoading(false);
    }
  };

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
            Unknown
          </Badge>
        );
    }
  };

  // Get subscription status badge
  const getSubscriptionStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            Inactive
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
            Cancelled
          </Badge>
        );
      case "trialing":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            Trialing
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >

      {/* Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-200">
                <TableHead className="font-semibold text-neutral-700">Dealer</TableHead>
                <TableHead className="font-semibold text-neutral-700">Dealership</TableHead>
                <TableHead className="font-semibold text-neutral-700">Contact</TableHead>
                <TableHead className="font-semibold text-neutral-700">Request Date</TableHead>
                <TableHead className="font-semibold text-neutral-700">Status</TableHead>
                <TableHead className="font-semibold text-neutral-700">Subscription</TableHead>
                <TableHead className="font-semibold text-neutral-700">Message</TableHead>
                <TableHead className="font-semibold text-neutral-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cancellationRequests.map((request, index) => (
                <motion.tr
                  key={request.dealer_id}
                  variants={itemVariants}
                  className="border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{request.dealer_name}</p>
                        <p className="text-sm text-neutral-500">{request.dealer_email}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-neutral-400" />
                      <span className="font-medium text-neutral-900">{request.dealership_name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600">{request.phone}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600">{request.formatted_request_date}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4">
                    {getStatusBadge(request.status)}
                  </TableCell>
                  
                  <TableCell className="py-4">
                    {getSubscriptionStatusBadge(request.subscription_status)}
                  </TableCell>
                  
                  <TableCell className="py-4 max-w-xs">
                    <div className="truncate" title={request.cancellation_message}>
                      <span className="text-sm text-neutral-600">
                        {request.cancellation_message}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4 text-right">
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
                          side="bottom"
                          sideOffset={4}
                          className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50 absolute top-full right-0 mt-2"
                        >
                          
                          {request.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleApproveRequest(request.dealer_id)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none transition-all duration-200 group"
                                disabled={loading}
                              >
                                <CheckCircle className="w-4 h-4 text-neutral-500 group-hover:text-green-600 group-focus:text-green-600 transition-colors duration-200" />
                                <span>Approve Request</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Empty State */}
      {cancellationRequests.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No Cancellation Requests
          </h3>
          <p className="text-neutral-500 mb-6">
            There are no subscription cancellation requests at the moment.
          </p>
          <Button
            onClick={onRefresh}
            variant="outline"
            className="hover:bg-neutral-50"
          >
            Refresh
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SubscriptionCancellationRequestsContainer;
