import { motion } from "framer-motion";
import {
  Eye,
  Phone,
  User,
  Calendar,
  Car,
  MoreHorizontal,
  MapPin,
  Users,
  Search,
} from "lucide-react";
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
import { useEffect, useState } from "react";

const ActiveCustomersContainer = ({
  customers = [],
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  onPageChange = () => {},
  onViewCustomer = () => {},
  onViewVehicle = () => {},
  onScheduleAppointment = () => {},
  onContact = () => {},
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle custom breakpoint at 1404px
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1404);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate pagination display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  const handleViewCustomer = (customerId) => {
    onViewCustomer(customerId);
  };

  const handleViewVehicle = (vehicleId) => {
    onViewVehicle(vehicleId);
  };

  const handleScheduleAppointment = (customerId) => {
    onScheduleAppointment(customerId);
  };

  const handleContact = (customerId) => {
    onContact(customerId);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-4"
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
              New Customers
            </h3>
            <p className="text-sm text-neutral-600">
              All new customers and details
            </p>
          </div>
        </div>
        <div className="text-sm text-neutral-500">
          {Number(totalCount) === 0 ? (
            "No customers found"
          ) : (
            <>
              Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of{" "}
              {totalCount} customers
            </>
          )}
        </div>
      </div>

      {/* Empty State */}
      {customers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-6">
            <Users className="w-12 h-12 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            No New Customers
          </h3>
          <p className="text-neutral-600 text-center max-w-md mb-6">
            You don't have any new customers at the moment
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Search className="w-4 h-4" />
            <span>Customer offers will be displayed here</span>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Desktop Table Layout - 1280px+ */}
          {isDesktop && (
            <div className="overflow-x-auto">
              <Table className="w-full min-w-[1000px]">
              <TableHeader>
                <TableRow className="border-neutral-200 hover:bg-transparent">
                    <TableHead className="text-neutral-600 font-medium w-[16%]">
                    Customer Name
                  </TableHead>
                    <TableHead className="text-neutral-600 font-medium w-[16%]">
                    Vehicle
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium w-[12%]">
                      Distance
                    </TableHead>
                    <TableHead className="text-neutral-600 font-medium w-[10%]">
                    Offer Price
                  </TableHead>
                    <TableHead className="text-neutral-600 font-medium w-[16%]">
                    Address
                  </TableHead>
                    <TableHead className="text-neutral-600 font-medium w-[10%]">
                    Join Date
                  </TableHead>
                    <TableHead className="text-neutral-600 font-medium text-right w-[20%]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    className="border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
                  >
                      <TableCell className="py-4.5">
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">
                          {customer.name}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                      <TableCell className="py-3">
                      <div className="text-sm text-neutral-700">
                        {customer.vehicle}
                      </div>
                    </TableCell>
                      <TableCell className="py-3">
                        <div className="text-xs text-neutral-600">
                          {customer.distance || "NULL"}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                      <div className="font-semibold text-green-600 text-sm">
                        {customer.offer}
                      </div>
                    </TableCell>
                      <TableCell className="py-3">
                      <div
                          className="text-xs text-neutral-600 max-w-[120px] truncate"
                        title={customer.address}
                      >
                        {customer.address}
                      </div>
                    </TableCell>
                      <TableCell className="py-3">
                      <div className="text-xs text-neutral-600">
                        {new Date(customer.joinDate).toLocaleDateString()}{" "}
                        {new Date(customer.joinDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                      <TableCell className="py-3 text-right">
                        <div className="flex justify-end items-center">
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
                            <DropdownMenuItem
                                onClick={() => handleScheduleAppointment(customer.id)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                              >
                                <Calendar className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                                <span>Schedule</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleViewCustomer(customer.id)}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                            >
                              <Eye className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                              <span>View Customer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewVehicle(customer.vehicleId)}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                            >
                              <Car className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                              <span>View Vehicle</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          {/* Mobile Card Layout - Below 1280px */}
          {!isDesktop && (
            <div className="space-y-4">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-3">
                    {/* Customer Name */}
                  <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-900 text-base">
                        {customer.name}
                      </h4>
                      <span className="text-sm text-neutral-500">#{customer.id}</span>
                  </div>

                    {/* Customer Contact Info */}
                    <div className="space-y-1">
                      <div className="text-sm text-neutral-600">{customer.email}</div>
                      <div className="text-sm text-neutral-600">{customer.phone}</div>
                  </div>

                    {/* Vehicle Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-600">Vehicle</span>
                        <span className="text-sm font-medium text-neutral-800">
                      {customer.vehicle}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-600">Distance</span>
                        <span className="text-xs text-neutral-700">
                          {customer.distance || "NULL"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-600">Offer Price</span>
                    <span className="text-sm font-bold text-green-600">
                      {customer.offer}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                        <span className="text-xs text-neutral-600">Address</span>
                        <span className="text-xs text-neutral-700 text-right max-w-[200px]">
                      {customer.address}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-600">Join Date</span>
                        <span className="text-xs text-neutral-700">
                          {new Date(customer.joinDate).toLocaleDateString()}{" "}
                          {new Date(customer.joinDate).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                    </span>
                  </div>
                </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                            className="flex-1 h-10 text-sm hover:bg-neutral-100"
                      >
                            <MoreHorizontal className="w-4 h-4 mr-2" />
                            Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                      sideOffset={4}
                          className="w-52 p-1 shadow-lg border border-neutral-200 bg-white rounded-lg absolute top-full right-0 mt-2 z-50"
                        >
                          <DropdownMenuItem
                            onClick={() => handleScheduleAppointment(customer.id)}
                            className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-neutral-700 hover:bg-orange-50 hover:text-orange-700 rounded-md transition-colors duration-150 focus:bg-orange-50 focus:text-orange-700 focus:outline-none"
                          >
                            <Calendar className="w-4 h-4 mr-3 text-neutral-500" />
                            <span className="font-medium">Schedule</span>
                          </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewCustomer(customer.id)}
                            className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                      >
                            <Eye className="w-4 h-4 mr-3 text-neutral-500" />
                        <span className="font-medium">View Customer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                            onClick={() => handleViewVehicle(customer.id)}
                            className="cursor-pointer flex items-center px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                      >
                            <Car className="w-4 h-4 mr-3 text-neutral-500" />
                        <span className="font-medium">View Vehicle</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ActiveCustomersContainer;