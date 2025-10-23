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
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <style jsx>{`
        @media (min-width: 1280px) {
          .card-layout-1024-1280 { display: none !important; }
        }
      `}</style>
      
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
          {/* Desktop Table Layout - Extra large screens (1600px+) */}
          <div className="hidden 2xl:block overflow-x-auto">
            <Table className="w-full min-w-[1200px]">
              <TableHeader>
                <TableRow className="border-neutral-200 hover:bg-transparent">
                  <TableHead className="text-neutral-600 font-medium w-[20%] pl-6">
                    Customer Name
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium w-[18%]">
                    Vehicle
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium w-[12%]">
                    Offer Price
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium w-[20%]">
                    Address
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium w-[15%]">
                    Join Date
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-right w-[15%] pr-6">
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
                    <TableCell className="py-4 pl-6">
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">
                          {customer.name}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm text-neutral-700">
                        {customer.vehicle}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-semibold text-green-600 text-sm">
                        {customer.offer}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div
                        className="text-xs text-neutral-600 max-w-[180px] truncate"
                        title={customer.address}
                      >
                        {customer.address}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-xs text-neutral-600">
                        {new Date(customer.joinDate).toLocaleDateString()}{" "}
                        {new Date(customer.joinDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right pr-6">
                      <div className="flex gap-2 justify-end items-center">
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
                            className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50 absolute top-full right-0 mt-2"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleViewCustomer(customer.id, customer.name)
                              }
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

          {/* Large Laptop Table Layout - Large screens (1280px - 1600px) */}
          <div className="hidden xl:block 2xl:hidden overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-neutral-200 hover:bg-transparent">
                  <TableHead className="text-neutral-600 font-medium pl-3 text-xs" style={{ width: '22%' }}>
                    Customer
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-xs" style={{ width: '18%' }}>
                    Vehicle
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-xs" style={{ width: '12%' }}>
                    Offer
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-xs" style={{ width: '28%' }}>
                    Address
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-xs" style={{ width: '12%' }}>
                    Date
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-right pr-3 text-xs" style={{ width: '8%' }}>
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
                    <TableCell className="py-4 pl-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 text-xs leading-tight">
                          {customer.name}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1 leading-tight">
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-xs text-neutral-700 leading-tight">
                        {customer.vehicle}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-semibold text-green-600 text-xs">
                        {customer.offer}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-xs text-neutral-600 leading-tight">
                        {customer.address}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-xs text-neutral-600 leading-tight">
                        {new Date(customer.joinDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: '2-digit'
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right pr-3">
                      <div className="flex justify-end items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-neutral-100 cursor-pointer"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            side="bottom"
                            sideOffset={4}
                            className="w-44 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50 absolute top-full right-0 mt-2"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleViewCustomer(customer.id, customer.name)
                              }
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                            >
                              <Eye className="w-3 h-3 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                              <span>View Customer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewVehicle(customer.vehicleId)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                            >
                              <Car className="w-3 h-3 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
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

          {/* Small Laptop Card Layout - Medium-large screens (1024px - 1280px) */}
          <div className="hidden xl:block 2xl:hidden space-y-3 card-layout-1024-1280">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                variants={itemVariants}
                whileHover={{ y: -1 }}
                className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Customer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 text-sm truncate">
                        {customer.name}
                      </h4>
                      <p className="text-xs text-neutral-500 truncate">
                        {customer.email}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-400 ml-2">#{customer.id}</span>
                  </div>

                  {/* Vehicle and Offer Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-neutral-600 font-medium block">Vehicle</span>
                      <span className="text-sm font-medium text-neutral-800 truncate block">
                        {customer.vehicle}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-600 font-medium block">Offer Price</span>
                      <span className="text-sm font-bold text-green-600">
                        {customer.offer}
                      </span>
                    </div>
                  </div>

                  {/* Address and Date Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <span className="text-xs text-neutral-600 font-medium block">Address</span>
                      <span className="text-xs text-neutral-700 truncate block" title={customer.address}>
                        {customer.address}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-600 font-medium block">Join Date</span>
                      <span className="text-xs text-neutral-700">
                        {new Date(customer.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end pt-2 border-t border-neutral-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-neutral-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        side="bottom"
                        sideOffset={4}
                        className="w-48 p-1 shadow-lg border border-neutral-200 bg-white rounded-lg absolute top-full right-0 mt-2 z-50"
                      >
                        <DropdownMenuItem
                          onClick={() => handleViewCustomer(customer.id)}
                          className="cursor-pointer flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                        >
                          <Eye className="w-4 h-4 mr-2 text-neutral-500" />
                          <span className="font-medium">View Customer</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewVehicle(customer.vehicleId)}
                          className="cursor-pointer flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                        >
                          <Car className="w-4 h-4 mr-2 text-neutral-500" />
                          <span className="font-medium">View Vehicle</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tablet Table Layout - Medium screens (768px - 1023px) */}
          <div className="hidden lg:block xl:hidden">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="border-neutral-200 hover:bg-transparent">
                  <TableHead className="text-neutral-600 font-medium pl-4" style={{ width: '30%' }}>
                    Customer
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium" style={{ width: '20%' }}>
                    Vehicle
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium" style={{ width: '15%' }}>
                    Offer
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium" style={{ width: '20%' }}>
                    Address
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium" style={{ width: '10%' }}>
                    Date
                  </TableHead>
                  <TableHead className="text-neutral-600 font-medium text-right pr-4" style={{ width: '5%' }}>
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
                    <TableCell className="py-3 pl-4">
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 text-sm truncate">
                          {customer.name}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5 truncate">
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="text-sm text-neutral-700 truncate" title={customer.vehicle}>
                        {customer.vehicle}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="font-semibold text-green-600 text-sm">
                        {customer.offer}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div
                        className="text-xs text-neutral-600 truncate"
                        title={customer.address}
                      >
                        {customer.address}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="text-xs text-neutral-600">
                        {new Date(customer.joinDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-right pr-4">
                      <div className="flex justify-end items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 hover:bg-neutral-100 cursor-pointer"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            side="bottom"
                            sideOffset={4}
                            className="w-48 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50 absolute top-full right-0 mt-2"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleViewCustomer(customer.id, customer.name)
                              }
                              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                            >
                              <Eye className="w-3 h-3 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                              <span>View Customer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewVehicle(customer.vehicleId)}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                            >
                              <Car className="w-3 h-3 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
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

          {/* Small Tablet Layout - Small screens (640px - 767px) */}
          <div className="hidden sm:block lg:hidden space-y-3">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                variants={itemVariants}
                whileHover={{ y: -1 }}
                className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Customer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 text-sm truncate">
                        {customer.name}
                      </h4>
                      <p className="text-xs text-neutral-500 truncate">
                        {customer.email}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-400 ml-2">#{customer.id}</span>
                  </div>

                  {/* Vehicle and Offer Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-neutral-600 font-medium block">Vehicle</span>
                      <span className="text-sm font-medium text-neutral-800 truncate block">
                        {customer.vehicle}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-600 font-medium block">Offer Price</span>
                      <span className="text-sm font-bold text-green-600">
                        {customer.offer}
                      </span>
                    </div>
                  </div>

                  {/* Address and Date Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <span className="text-xs text-neutral-600 font-medium block">Address</span>
                      <span className="text-xs text-neutral-700 truncate block" title={customer.address}>
                        {customer.address}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-600 font-medium block">Join Date</span>
                      <span className="text-xs text-neutral-700">
                        {new Date(customer.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end pt-2 border-t border-neutral-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-neutral-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        side="bottom"
                        sideOffset={4}
                        className="w-48 p-1 shadow-lg border border-neutral-200 bg-white rounded-lg absolute top-full right-0 mt-2 z-50"
                      >
                        <DropdownMenuItem
                          onClick={() => handleViewCustomer(customer.id)}
                          className="cursor-pointer flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                        >
                          <Eye className="w-4 h-4 mr-2 text-neutral-500" />
                          <span className="font-medium">View Customer</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewVehicle(customer.vehicleId)}
                          className="cursor-pointer flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                        >
                          <Car className="w-4 h-4 mr-2 text-neutral-500" />
                          <span className="font-medium">View Vehicle</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Mobile Card Layout - Extra small screens (below 640px) */}
      {customers.length > 0 && (
        <div className="sm:hidden space-y-3">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              variants={itemVariants}
              whileHover={{ y: -1 }}
              className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Customer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">
                      {customer.name}
                    </h4>
                    <p className="text-xs text-neutral-500 truncate">
                      {customer.email}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400 ml-2">#{customer.id}</span>
                </div>

                {/* Vehicle and Offer Row */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-600 font-medium">Vehicle</span>
                    <span className="text-sm font-medium text-neutral-800 text-right flex-1 ml-2 truncate">
                      {customer.vehicle}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-600 font-medium">Offer Price</span>
                    <span className="text-sm font-bold text-green-600">
                      {customer.offer}
                    </span>
                  </div>
                </div>

                {/* Address and Date Row */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-neutral-600 font-medium">Address</span>
                    <span className="text-xs text-neutral-700 text-right flex-1 ml-2 leading-relaxed" title={customer.address}>
                      {customer.address}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-600 font-medium">Join Date</span>
                    <span className="text-xs text-neutral-700 text-right">
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-2 border-t border-neutral-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-neutral-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                      sideOffset={4}
                      className="w-48 p-1 shadow-lg border border-neutral-200 bg-white rounded-lg absolute top-full right-0 mt-2 z-50"
                    >
                      <DropdownMenuItem
                        onClick={() => handleViewCustomer(customer.id)}
                        className="cursor-pointer flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                      >
                        <Eye className="w-4 h-4 mr-2 text-neutral-500" />
                        <span className="font-medium">View Customer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewVehicle(customer.vehicleId)}
                        className="cursor-pointer flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors duration-150 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none"
                      >
                        <Car className="w-4 h-4 mr-2 text-neutral-500" />
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
    </motion.div>
  );
};

export default ActiveCustomersContainer;