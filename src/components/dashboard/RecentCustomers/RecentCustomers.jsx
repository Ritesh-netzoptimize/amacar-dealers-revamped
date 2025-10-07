import { motion } from "framer-motion";
import { Eye, Phone, User, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentCustomers } from "../../../lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CustomerDetailsModal from "../../common/CustomerDetailsModal/CustomerDetailsModal";

const RecentCustomers = () => {
  const navigate = useNavigate();
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");

  // Fetch recent customers from API
  const fetchRecentCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getRecentCustomers(5);

      if (response.success && response.data) {
        // Transform API response to match expected format
        const transformedCustomers = response.data.map((customer, index) => ({
          id: customer.id || index + 1,
          name: String(customer.name || "Customer"),
          vehicle: String(
            customer.vehicle?.title || customer.vehicle?.name || "Vehicle"
          ),
          mileage: String(
            customer.vehicle?.mileage
              ? `${customer.vehicle.mileage} miles`
              : "N/A"
          ),
          offer: String(
            customer.vehicle?.cash_offer
              ? `$${customer.vehicle.cash_offer.toLocaleString()}`
              : "$0"
          ),
          phone: customer.phone,
        }));

        setRecentCustomers(transformedCustomers);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching recent customers:", err);
      setError(err.message);

      // Fallback to empty array on error
      setRecentCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentCustomers();
  }, []);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleView = (customerId, customerName) => {
    setSelectedCustomerId(customerId);
    setSelectedCustomerName(customerName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomerId(null);
    setSelectedCustomerName("");
  };

  const handleContact = (customerId) => {
    console.log("Contact customer:", customerId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Recent Customers
              </h3>
              <p className="text-sm text-neutral-600">Latest customer offers</p>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-xl p-4 animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-neutral-200 rounded w-1/6"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-neutral-200 rounded w-1/6"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-neutral-200 rounded w-1/6"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Recent Customers
              </h3>
              <p className="text-sm text-neutral-600">Latest customer offers</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRecentCustomers}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Retrying..." : "Retry"}
          </Button>
        </div>

        {/* Error Message */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">
            <h3 className="font-semibold">Failed to load customers</h3>
            <p className="text-sm text-red-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Recent Customers
            </h3>
            <p className="text-sm text-neutral-600">Latest customer offers</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchRecentCustomers}
          disabled={isLoading}
          className="flex items-center gap-2"
          title="Refresh customers"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        {recentCustomers.length === 0 ? (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-center">
            <div className="text-neutral-600">
              <User className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">No customers available</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Recent customers will appear here once data is available.
              </p>
            </div>
          </div>
        ) : (
          <Table className="w-full min-w-[600px]">
            <TableHeader>
              <TableRow className="border-neutral-200 hover:bg-transparent">
                <TableHead className="text-neutral-600 font-medium w-[25%]">
                  Customer Name
                </TableHead>
                <TableHead className="text-neutral-600 font-medium w-[25%]">
                  Vehicle
                </TableHead>
                <TableHead className="text-neutral-600 font-medium w-[15%]">
                  Mileage
                </TableHead>
                <TableHead className="text-neutral-600 font-medium w-[15%]">
                  Offer Price
                </TableHead>
                <TableHead className="text-neutral-600 font-medium text-right w-[20%]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCustomers.map((customer, index) => (
                <TableRow
                  key={customer.id}
                  className="border-neutral-100 hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleView(customer.id, customer.name)}
                >
                  <TableCell className="font-medium text-neutral-900">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-neutral-700">
                    {customer.vehicle}
                  </TableCell>
                  <TableCell className="text-neutral-600">
                    {customer.mileage}
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {customer.offer}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(customer.id, customer.name);
                        }}
                        className="h-8 px-3 text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={`tel:${customer.phone}`} // replace with the dealer's phone number
                        className="cursor-pointer btn-ghost flex items-center justify-center space-x-2 py-2 px-3 sm:py-2 sm:px-4 text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="hidden sm:inline">Contact</span>
                        <span className="sm:hidden">Contact</span>
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {recentCustomers.length === 0 ? (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-center">
            <div className="text-neutral-600">
              <User className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">No customers available</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Recent customers will appear here once data is available.
              </p>
            </div>
          </div>
        ) : (
          recentCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleView(customer.id, customer.name)}
            >
              <div className="space-y-3">
                {/* Customer Name */}
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-900 text-base">
                    {customer.name}
                  </h4>
                  <span className="text-sm text-neutral-500">
                    #{customer.id}
                  </span>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Vehicle</span>
                    <span className="text-sm font-medium text-neutral-800">
                      {customer.vehicle}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Mileage</span>
                    <span className="text-sm text-neutral-700">
                      {customer.mileage}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">
                      Offer Price
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {customer.offer}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(customer.id, customer.name);
                    }}
                    className="flex-1 h-10 text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <a
                    onClick={(e) => e.stopPropagation()}
                    href={`tel:${customer.phone}`} // replace with the dealer's phone number
                    className="cursor-pointer btn-ghost flex items-center justify-center space-x-2 py-2 px-3 sm:py-2 sm:px-4 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Contact</span>
                    <span className="sm:hidden">Contact</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* View All Button */}
      <motion.div
        className="flex justify-center mt-6 pt-4 border-t border-neutral-100"
        variants={itemVariants}
      >
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer p-6 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200"
          onClick={() => navigate("/new-customers")}
        >
          View All Customers
        </Button>
      </motion.div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customerId={selectedCustomerId}
        customerName={selectedCustomerName}
      />
    </motion.div>
  );
};

export default RecentCustomers;
