import { motion } from 'framer-motion';
import { Eye, Phone, User } from 'lucide-react';
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

const RecentCustomers = () => {
  const navigate = useNavigate();
  // Static customer data - will replace with API later
  const recentCustomers = [
    { 
      id: 1,
      name: "Neeraj Kumar", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "520 miles", 
      offer: "$7,725" 
    },
    { 
      id: 2,
      name: "Ritesh", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "20,000 miles", 
      offer: "$7,725" 
    },
    { 
      id: 3,
      name: "random email", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "25,600 miles", 
      offer: "$7,725" 
    },
    { 
      id: 4,
      name: "KL rahul", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "2,500 miles", 
      offer: "$7,725" 
    },
    { 
      id: 5,
      name: "ritesh chopra", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "25,000 miles", 
      offer: "$7,725" 
    }
  ];

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

  const handleView = (customerId) => {
    console.log('View customer:', customerId);
  };

  const handleContact = (customerId) => {
    console.log('Contact customer:', customerId);
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
            <h3 className="text-lg font-semibold text-neutral-900">Recent Customers</h3>
            <p className="text-sm text-neutral-600">Latest customer offers</p>
          </div>
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="w-full min-w-[600px]">
          <TableHeader>
            <TableRow className="border-neutral-200 hover:bg-transparent">
              <TableHead className="text-neutral-600 font-medium w-[25%]">Customer Name</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[25%]">Vehicle</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[15%]">Mileage</TableHead>
              <TableHead className="text-neutral-600 font-medium w-[15%]">Offer Price</TableHead>
              <TableHead className="text-neutral-600 font-medium text-right w-[20%]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCustomers.map((customer, index) => (
              <TableRow 
                key={customer.id}
                className="border-neutral-100 hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
                onClick={() => handleView(customer.id)}
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
                        handleView(customer.id);
                      }}
                      className="h-8 px-3 text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContact(customer.id);
                      }}
                      className="h-8 px-3 text-xs bg-[var(--brand-orange)] text-white"
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
        {recentCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => handleView(customer.id)}
          >
            <div className="space-y-3">
              {/* Customer Name */}
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-neutral-900 text-base">
                  {customer.name}
                </h4>
                <span className="text-sm text-neutral-500">#{customer.id}</span>
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
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(customer.id);
                  }}
                  className="flex-1 h-10 text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContact(customer.id);
                  }}
                  className="flex-1 h-10 text-sm bg-[var(--brand-orange)] text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
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
          onClick={() => navigate('/new-customers')}
        >
          View All Customers
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default RecentCustomers;
