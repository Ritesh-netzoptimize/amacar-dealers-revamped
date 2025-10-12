import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  User,
  Hash,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

const PartnerDealersContainer = ({ 
  dealerships = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onView,
  canDeleteUpdate = false 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  // Animation variants
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

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Unknown
          </Badge>
        );
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-neutral-200 p-6 animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (dealerships.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mb-6">
          <Building2 className="w-12 h-12 text-neutral-400" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          No Partner Dealers
        </h3>
        <p className="text-neutral-500 text-center max-w-md">
          No partner dealers have been created yet. Create your first dealership to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-semibold text-neutral-700">
                Dealership
              </TableHead>
              <TableHead className="font-semibold text-neutral-700">
                Contact
              </TableHead>
              <TableHead className="font-semibold text-neutral-700">
                Dealer Code
              </TableHead>
              <TableHead className="font-semibold text-neutral-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-neutral-700">
                Created
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealerships.map((dealership) => (
              <motion.tr
                key={dealership.id}
                variants={rowVariants}
                className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
                onMouseEnter={() => setHoveredRow(dealership.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="py-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={dealership.avatar} alt={dealership.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                      {getInitials(dealership.name)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="py-4">
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {dealership.dealership_name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {dealership.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-neutral-600">
                      <Mail className="w-3 h-3 mr-2 text-neutral-400" />
                      {dealership.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center">
                    <Hash className="w-3 h-3 mr-1 text-neutral-400" />
                    <span className="font-mono text-sm text-neutral-600">
                      {dealership.dealer_code}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(dealership.status)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar className="w-3 h-3 mr-2 text-neutral-400" />
                    {formatDate(dealership.created_at)}
                  </div>
                </TableCell>
                
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {dealerships.map((dealership) => (
          <motion.div
            key={dealership.id}
            variants={rowVariants}
            className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={dealership.avatar} alt={dealership.name} />
                  <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                    {getInitials(dealership.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {dealership.dealership_name}
                  </h3>
                  <p className="text-sm text-neutral-500">{dealership.name}</p>
                </div>
              </div>

            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-neutral-600">
                <Mail className="w-4 h-4 mr-3 text-neutral-400" />
                {dealership.email}
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <Hash className="w-4 h-4 mr-3 text-neutral-400" />
                {dealership.dealer_code}
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <Calendar className="w-4 h-4 mr-3 text-neutral-400" />
                {formatDate(dealership.created_at)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PartnerDealersContainer;
