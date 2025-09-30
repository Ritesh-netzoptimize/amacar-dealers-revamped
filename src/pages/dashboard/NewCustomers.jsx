import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
    import Pagination from '@/components/common/Pagination/Pagination';
import NewCustomersContainer from '@/components/new-customers/NewCustomersContainer';

const NewCustomers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extended dummy customer data for pagination testing
  const allCustomers = [
    { 
      id: 1,
      name: "Neeraj Kumar", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "520 miles", 
      offer: "$7,725",
      email: "neeraj@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinDate: "2024-01-15"
    },
    { 
      id: 2,
      name: "Ritesh", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "20,000 miles", 
      offer: "$7,725",
      email: "ritesh@example.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      joinDate: "2024-01-14"
    },
    { 
      id: 3,
      name: "random email", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "25,600 miles", 
      offer: "$7,725",
      email: "random@example.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Rd, Chicago, IL 60601",
      joinDate: "2024-01-13"
    },
    { 
      id: 4,
      name: "KL rahul", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "2,500 miles", 
      offer: "$7,725",
      email: "kl.rahul@example.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, Houston, TX 77001",
      joinDate: "2024-01-12"
    },
    { 
      id: 5,
      name: "ritesh chopra", 
      vehicle: "Jeep Grand Cherokee", 
      mileage: "25,000 miles", 
      offer: "$7,725",
      email: "ritesh.chopra@example.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Dr, Phoenix, AZ 85001",
      joinDate: "2024-01-11"
    },
    { 
      id: 6,
      name: "Sarah Johnson", 
      vehicle: "BMW X5", 
      mileage: "15,200 miles", 
      offer: "$12,500",
      email: "sarah.j@example.com",
      phone: "+1 (555) 678-9012",
      address: "987 Cedar Ln, Philadelphia, PA 19101",
      joinDate: "2024-01-10"
    },
    { 
      id: 7,
      name: "Michael Chen", 
      vehicle: "Audi Q7", 
      mileage: "8,900 miles", 
      offer: "$15,200",
      email: "m.chen@example.com",
      phone: "+1 (555) 789-0123",
      address: "147 Birch St, San Antonio, TX 78201",
      joinDate: "2024-01-09"
    },
    { 
      id: 8,
      name: "Emily Rodriguez", 
      vehicle: "Mercedes GLE", 
      mileage: "12,300 miles", 
      offer: "$18,750",
      email: "emily.r@example.com",
      phone: "+1 (555) 890-1234",
      address: "258 Willow Way, San Diego, CA 92101",
      joinDate: "2024-01-08"
    },
    { 
      id: 9,
      name: "David Kim", 
      vehicle: "Lexus RX", 
      mileage: "6,500 miles", 
      offer: "$14,300",
      email: "d.kim@example.com",
      phone: "+1 (555) 901-2345",
      address: "369 Spruce Ave, Dallas, TX 75201",
      joinDate: "2024-01-07"
    },
    { 
      id: 10,
      name: "Lisa Thompson", 
      vehicle: "Cadillac Escalade", 
      mileage: "18,700 miles", 
      offer: "$22,100",
      email: "lisa.t@example.com",
      phone: "+1 (555) 012-3456",
      address: "741 Poplar Blvd, San Jose, CA 95101",
      joinDate: "2024-01-06"
    },
    { 
      id: 11,
      name: "James Wilson", 
      vehicle: "Ford F-150", 
      mileage: "30,200 miles", 
      offer: "$9,800",
      email: "j.wilson@example.com",
      phone: "+1 (555) 123-4567",
      address: "852 Ash St, Austin, TX 78701",
      joinDate: "2024-01-05"
    },
    { 
      id: 12,
      name: "Maria Garcia", 
      vehicle: "Honda Pilot", 
      mileage: "22,100 miles", 
      offer: "$11,200",
      email: "maria.g@example.com",
      phone: "+1 (555) 234-5678",
      address: "963 Hickory Rd, Jacksonville, FL 32201",
      joinDate: "2024-01-04"
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = allCustomers.slice(startIndex, endIndex);

  // Handler functions
  const handleViewCustomer = (customerId) => {
    console.log('View customer:', customerId);
    navigate(`/customers/${customerId}`);
  };

  const handleViewVehicle = (customerId) => {
    console.log('View vehicle for customer:', customerId);
    navigate(`/vehicles/${customerId}`);
  };

  const handleScheduleAppointment = (customerId) => {
    console.log('Schedule appointment for customer:', customerId);
    navigate(`/appointments/schedule?customerId=${customerId}`);
  };

  const handleContact = (customerId) => {
    console.log('Contact customer:', customerId);
    // Open contact modal or initiate call
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className=" min-h-screen bg-gray-50 pt-28 px-8 md:px-12">
      <div className="max-w-8xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">New Customers</h1>
          <p className="text-neutral-600 mt-1">Manage and view all new customer offers and details</p>
        </div>
        
        <NewCustomersContainer 
          customers={currentCustomers}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={allCustomers.length}
          onPageChange={handlePageChange}
          onViewCustomer={handleViewCustomer}
          onViewVehicle={handleViewVehicle}
          onScheduleAppointment={handleScheduleAppointment}
          onContact={handleContact}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 pt-6 border-t border-neutral-100">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCustomers;