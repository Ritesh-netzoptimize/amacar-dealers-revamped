// Static dealership data
export const dealershipsData = [
  {
    id: 1,
    name: "AutoMax Motors",
    email: "contact@automaxmotors.com",
    phone: "+1 (555) 123-4567",
    city: "New York",
    status: "Active",
    role: "Dealer",
    salesManager: "John Smith",
    joinDate: "2024-01-15T10:30:00Z",
    address: "123 Main Street, New York, NY 10001",
    totalSales: 1250000,
    vehiclesInStock: 45,
    rating: 4.8
  },
  {
    id: 2,
    name: "Premier Auto Group",
    email: "info@premierauto.com",
    phone: "+1 (555) 234-5678",
    city: "Los Angeles",
    status: "Active",
    role: "Dealer",
    salesManager: "Sarah Johnson",
    joinDate: "2024-02-20T14:15:00Z",
    address: "456 Oak Avenue, Los Angeles, CA 90210",
    totalSales: 2100000,
    vehiclesInStock: 78,
    rating: 4.9
  },
  {
    id: 3,
    name: "Elite Car Dealership",
    email: "sales@elitecars.com",
    phone: "+1 (555) 345-6789",
    city: "Chicago",
    status: "Pending",
    role: "Dealer",
    salesManager: "Michael Brown",
    joinDate: "2024-03-10T09:45:00Z",
    address: "789 Pine Street, Chicago, IL 60601",
    totalSales: 890000,
    vehiclesInStock: 32,
    rating: 4.6
  },
  {
    id: 4,
    name: "Metro Auto Center",
    email: "hello@metroauto.com",
    phone: "+1 (555) 456-7890",
    city: "Houston",
    status: "Active",
    role: "Dealer",
    salesManager: "Emily Davis",
    joinDate: "2024-01-05T16:20:00Z",
    address: "321 Elm Street, Houston, TX 77001",
    totalSales: 1800000,
    vehiclesInStock: 67,
    rating: 4.7
  },
  {
    id: 5,
    name: "City Motors",
    email: "contact@citymotors.com",
    phone: "+1 (555) 567-8901",
    city: "Phoenix",
    status: "Inactive",
    role: "Dealer",
    salesManager: "David Wilson",
    joinDate: "2023-12-15T11:30:00Z",
    address: "654 Maple Drive, Phoenix, AZ 85001",
    totalSales: 750000,
    vehiclesInStock: 23,
    rating: 4.3
  },
  {
    id: 6,
    name: "Sunshine Auto",
    email: "info@sunshineauto.com",
    phone: "+1 (555) 678-9012",
    city: "Miami",
    status: "Active",
    role: "Dealer",
    salesManager: "Lisa Garcia",
    joinDate: "2024-02-28T13:45:00Z",
    address: "987 Beach Boulevard, Miami, FL 33101",
    totalSales: 1650000,
    vehiclesInStock: 54,
    rating: 4.8
  },
  {
    id: 7,
    name: "Mountain View Motors",
    email: "sales@mountainview.com",
    phone: "+1 (555) 789-0123",
    city: "Denver",
    status: "Active",
    role: "Dealer",
    salesManager: "Robert Martinez",
    joinDate: "2024-01-22T08:15:00Z",
    address: "147 Mountain Road, Denver, CO 80201",
    totalSales: 1420000,
    vehiclesInStock: 41,
    rating: 4.5
  },
  {
    id: 8,
    name: "Pacific Auto Group",
    email: "contact@pacificauto.com",
    phone: "+1 (555) 890-1234",
    city: "Seattle",
    status: "Pending",
    role: "Dealer",
    salesManager: "Jennifer Lee",
    joinDate: "2024-03-05T15:30:00Z",
    address: "258 Ocean View, Seattle, WA 98101",
    totalSales: 980000,
    vehiclesInStock: 38,
    rating: 4.4
  },
  {
    id: 9,
    name: "Desert Auto Sales",
    email: "info@desertauto.com",
    phone: "+1 (555) 901-2345",
    city: "Las Vegas",
    status: "Active",
    role: "Dealer",
    salesManager: "Christopher Taylor",
    joinDate: "2024-02-14T12:00:00Z",
    address: "369 Casino Drive, Las Vegas, NV 89101",
    totalSales: 1950000,
    vehiclesInStock: 72,
    rating: 4.9
  },
  {
    id: 10,
    name: "Golden Gate Motors",
    email: "sales@goldengate.com",
    phone: "+1 (555) 012-3456",
    city: "San Francisco",
    status: "Active",
    role: "Dealer",
    salesManager: "Amanda White",
    joinDate: "2024-01-30T10:45:00Z",
    address: "741 Bay Street, San Francisco, CA 94101",
    totalSales: 2200000,
    vehiclesInStock: 89,
    rating: 4.9
  },
  {
    id: 11,
    name: "New York Motors",
    email: "sales@newyorkmotors.com",
    phone: "+1 (555) 012-3456",
    city: "New York",
    status: "Active",
    role: "Dealer",
    salesManager: "John Doe",
    joinDate: "2024-01-30T10:45:00Z",
    address: "741 Bay Street, New York, NY 10001",
    totalSales: 2200000,
    vehiclesInStock: 89,
    rating: 4.9
  }
];

// Status options for filtering
export const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" }
];

// Role options for filtering
export const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "dealer", label: "Dealer" },
  { value: "sub-dealer", label: "Sub-Dealer" },
  { value: "partner", label: "Partner" }
];

// City options for filtering
export const cityOptions = [
  { value: "all", label: "All Cities" },
  { value: "new york", label: "New York" },
  { value: "los angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
  { value: "phoenix", label: "Phoenix" },
  { value: "miami", label: "Miami" },
  { value: "denver", label: "Denver" },
  { value: "seattle", label: "Seattle" },
  { value: "las vegas", label: "Las Vegas" },
  { value: "san francisco", label: "San Francisco" }
];
