// Static appointments data - Updated to match API response structure
export const appointmentsData = [
  {
    id: "27",
    dealer_id: "182",
    dealer_name: "Neeraj Kumar",
    dealer_email: "bharat2001@zopmail.com",
    dealer_phone: "8188188118",
    start_time: "2025-10-03 16:00:00",
    end_time: "2025-10-03 17:00:00",
    duration: 60,
    status: "pending",
    reschedule_url: "https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=182",
    is_pending: true,
    formatted_date: "03 Oct 2025",
    formatted_time: "16:00 - 17:00",
    formatted_status: "Pending",
    created_at: "2025-09-24 07:50:42",
    updated_at: null,
    notes: "Any",
    location: "Glendale, California",
    meeting_type: "in-person",
    user_metadata: {
      phone: "8188188118",
      city: "Glendale",
      state: "California"
    }
  },
  {
    id: "28",
    dealer_id: "183",
    dealer_name: "AutoMax Dealership",
    dealer_email: "contact@automax.com",
    dealer_phone: "+1 (555) 123-4567",
    start_time: "2025-10-04 10:00:00",
    end_time: "2025-10-04 11:00:00",
    duration: 60,
    status: "confirmed",
    reschedule_url: "https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=183",
    is_pending: false,
    formatted_date: "04 Oct 2025",
    formatted_time: "10:00 - 11:00",
    formatted_status: "Confirmed",
    created_at: "2025-09-24 08:15:30",
    updated_at: "2025-09-24 08:20:15",
    notes: "Vehicle inspection and test drive",
    location: "123 Main St, City, State",
    meeting_type: "in-person",
    user_metadata: {
      phone: "+1 (555) 123-4567",
      city: "Los Angeles",
      state: "California"
    }
  },
  {
    id: "29",
    dealer_id: "184",
    dealer_name: "Premier Motors",
    dealer_email: "sales@premiermotors.com",
    dealer_phone: "+1 (555) 234-5678",
    start_time: "2025-10-04 14:30:00",
    end_time: "2025-10-04 15:30:00",
    duration: 60,
    status: "pending",
    reschedule_url: "https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=184",
    is_pending: true,
    formatted_date: "04 Oct 2025",
    formatted_time: "14:30 - 15:30",
    formatted_status: "Pending",
    created_at: "2025-09-24 09:30:45",
    updated_at: null,
    notes: "Virtual consultation for financing options",
    location: "456 Oak Ave, City, State",
    meeting_type: "video",
    user_metadata: {
      phone: "+1 (555) 234-5678",
      city: "San Francisco",
      state: "California"
    }
  },
  {
    id: "30",
    dealer_id: "185",
    dealer_name: "Elite Auto Group",
    dealer_email: "info@eliteauto.com",
    dealer_phone: "+1 (555) 345-6789",
    start_time: "2025-10-05 09:00:00",
    end_time: "2025-10-05 10:00:00",
    duration: 60,
    status: "cancelled",
    reschedule_url: "https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=185",
    is_pending: false,
    formatted_date: "05 Oct 2025",
    formatted_time: "09:00 - 10:00",
    formatted_status: "Cancelled",
    created_at: "2025-09-24 10:45:20",
    updated_at: "2025-09-24 11:00:00",
    notes: "Customer cancelled due to schedule conflict",
    location: "789 Pine St, City, State",
    meeting_type: "in-person",
    user_metadata: {
      phone: "+1 (555) 345-6789",
      city: "San Diego",
      state: "California"
    }
  },
  {
    id: "31",
    dealer_id: "186",
    dealer_name: "City Auto Center",
    dealer_email: "appointments@cityauto.com",
    dealer_phone: "+1 (555) 456-7890",
    start_time: "2025-10-05 11:30:00",
    end_time: "2025-10-05 12:30:00",
    duration: 60,
    status: "confirmed",
    reschedule_url: "https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=186",
    is_pending: false,
    formatted_date: "05 Oct 2025",
    formatted_time: "11:30 - 12:30",
    formatted_status: "Confirmed",
    created_at: "2025-09-24 11:20:10",
    updated_at: "2025-09-24 11:25:30",
    notes: "Final paperwork and vehicle pickup",
    location: "321 Elm St, City, State",
    meeting_type: "in-person",
    user_metadata: {
      phone: "+1 (555) 456-7890",
      city: "Oakland",
      state: "California"
    }
  },
  {
    id: "32",
    dealer_id: "187",
    dealer_name: "Metro Motors",
    dealer_email: "sales@metromotors.com",
    dealer_phone: "+1 (555) 567-8901",
    start_time: "2025-10-06 13:00:00",
    end_time: "2025-10-06 14:00:00",
    duration: 60,
    status: "pending",
    reschedule_url: "https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=187",
    is_pending: true,
    formatted_date: "06 Oct 2025",
    formatted_time: "13:00 - 14:00",
    formatted_status: "Pending",
    created_at: "2025-09-24 12:15:25",
    updated_at: null,
    notes: "Trade-in evaluation discussion",
    location: "654 Maple Dr, City, State",
    meeting_type: "video",
    user_metadata: {
      phone: "+1 (555) 567-8901",
      city: "Sacramento",
      state: "California"
    }
  }
];

// Status filter options
export const statusFilterOptions = [
  { value: 'all', label: 'All', color: 'bg-slate-100 text-slate-700' },
  { value: 'pending', label: 'Pending', color: 'bg-blue-100 text-blue-700' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700' },
];

// Sort options
export const sortOptions = [
  { value: 'date-asc', label: 'Earliest First', icon: 'ArrowUp', description: 'Earliest appointments' },
  { value: 'date-desc', label: 'Latest First', icon: 'ArrowDown', description: 'Latest appointments' },
  { value: 'dealer-asc', label: 'Dealer A-Z', icon: 'ArrowUp', description: 'Alphabetical by dealer' },
  { value: 'dealer-desc', label: 'Dealer Z-A', icon: 'ArrowDown', description: 'Reverse alphabetical' },
  { value: 'status-asc', label: 'Status A-Z', icon: 'ArrowUp', description: 'Alphabetical by status' },
  { value: 'status-desc', label: 'Status Z-A', icon: 'ArrowDown', description: 'Reverse by status' },
];
