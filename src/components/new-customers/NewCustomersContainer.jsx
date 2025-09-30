import { motion } from 'framer-motion';
import { Eye, Phone, User, Calendar, Car } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NewCustomersContainer = ({ 
  customers = [], 
  currentPage = 1, 
  totalPages = 1, 
  totalCount = 0,
  onPageChange = () => {},
  onViewCustomer = () => {},
  onViewVehicle = () => {},
  onScheduleAppointment = () => {},
  onContact = () => {}
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
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleViewCustomer = (customerId) => {
    onViewCustomer(customerId);
  };

  const handleViewVehicle = (customerId) => {
    onViewVehicle(customerId);
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">New Customers</h3>
            <p className="text-sm text-neutral-600">All customer offers and details</p>
          </div>
        </div>
        <div className="text-sm text-neutral-500">
          Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} customers
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow className="border-neutral-200 hover:bg-transparent">
              <TableHead className="text-neutral-600 font-medium w-[18%]">Customer Name</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[18%]">Vehicle</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[12%]">Mileage</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[12%]">Offer Price</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[12%]">Join Date</TableHead>
              <TableHead className="text-neutral-600 font-medium text-right w-[28%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow 
                key={customer.id}
                className="border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
              >
                <TableCell className="font-medium text-neutral-900">
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-xs text-neutral-500">{customer.email}</div>
                  </div>
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
                <TableCell className="text-neutral-600 text-sm">
                  {new Date(customer.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end items-center flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewCustomer(customer.id)}
                      className="h-8 px-3 text-xs min-w-[70px] flex-shrink-0"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewVehicle(customer.id)}
                      className="h-8 px-3 text-xs min-w-[80px] flex-shrink-0"
                    >
                      <Car className="w-3 h-3 mr-1" />
                      Vehicle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleScheduleAppointment(customer.id)}
                      className="h-8 px-3 text-xs min-w-[85px] flex-shrink-0"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Schedule
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleContact(customer.id)}
                      className="h-8 px-3 text-xs min-w-[80px] flex-shrink-0 bg-[var(--brand-orange)] text-white hover:bg-orange-600"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
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
                  <span className="text-sm text-neutral-600">Offer Price</span>
                  <span className="text-lg font-bold text-green-600">
                    {customer.offer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Join Date</span>
                  <span className="text-sm text-neutral-700">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewCustomer(customer.id)}
                  className="h-10 text-sm flex items-center justify-center min-w-0"
                >
                  <Eye className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View Customer</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewVehicle(customer.id)}
                  className="h-10 text-sm flex items-center justify-center min-w-0"
                >
                  <Car className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View Vehicle</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleScheduleAppointment(customer.id)}
                  className="h-10 text-sm flex items-center justify-center min-w-0"
                >
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Schedule</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleContact(customer.id)}
                  className="h-10 text-sm flex items-center justify-center min-w-0 bg-[var(--brand-orange)] text-white hover:bg-orange-600"
                >
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Contact</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default NewCustomersContainer;
