import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Calendar, Shield, Building, AlertCircle } from 'lucide-react';
import { getCustomerDetails } from '../../../lib/api';

const CustomerDetailsModal = ({ 
  isOpen, 
  onClose, 
  customerId, 
  customerName = "Customer" 
}) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customer details when modal opens
  useEffect(() => {
    if (isOpen && customerId) {
      fetchCustomerDetails();
    }
  }, [isOpen, customerId]);

  const fetchCustomerDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getCustomerDetails(customerId);
      
      if (response.success && response.customer) {
        setCustomer(response.customer);
      } else {
        throw new Error('Failed to fetch customer details');
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setError(error.message || 'Failed to load customer details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50';
      case 'inactive':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {isLoading ? 'Loading...' : customer?.basic_info?.display_name || customerName}
                  </h2>
                  <p className="text-sm text-neutral-500">Customer Details</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading customer details...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Error Loading Details</h3>
                    <p className="text-neutral-600 mb-4">{error}</p>
                    <button
                      onClick={fetchCustomerDetails}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : customer ? (
                <div className="p-6 space-y-6">
                  {/* Basic Info Card */}
                  <div className="bg-gradient-to-r from-neutral-50 to-white rounded-xl border border-neutral-200 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={customer.basic_info?.avatar || '/default-avatar.png'}
                          alt={customer.basic_info?.display_name || 'Customer'}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80/6366f1/ffffff?text=' + 
                              (customer.basic_info?.display_name?.charAt(0) || 'C');
                          }}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${getStatusColor(customer.account?.status)}`}>
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                          {customer.basic_info?.display_name || 'N/A'}
                        </h3>
                        <p className="text-lg text-neutral-600 mb-2">
                          {customer.basic_info?.first_name} {customer.basic_info?.last_name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.account?.status)}`}>
                            {customer.account?.status || 'Unknown'}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {customer.basic_info?.role || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-neutral-200 p-6">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                        <Mail className="w-5 h-5 text-primary-600 mr-2" />
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-neutral-500">Email</p>
                          <p className="text-neutral-900 font-medium">{customer.contact?.email || 'N/A'}</p>
                        </div>
           
                        <div>
                          <p className="text-sm text-neutral-500">Phone</p>
                          <p className="text-neutral-900 font-medium">{customer.contact?.phone || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-neutral-200 p-6">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                        <MapPin className="w-5 h-5 text-primary-600 mr-2" />
                        Address
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-neutral-500">Street</p>
                          <p className="text-neutral-900 font-medium">{customer.address?.street || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">City, State, ZIP</p>
                          <p className="text-neutral-900 font-medium">
                            {customer.address?.city}, {customer.address?.state} {customer.address?.zip}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Country</p>
                          <p className="text-neutral-900 font-medium">{customer.address?.country || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="bg-white rounded-xl border border-neutral-200 p-6">
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 text-primary-600 mr-2" />
                      Account Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-neutral-500">Account Created</p>
                          <p className="text-neutral-900 font-medium">{formatDate(customer.account?.account_created)}</p>
                        </div>
                        
                       
                      </div>
                      {/* <div className="space-y-3">
                        <div>
                          <p className="text-sm text-neutral-500">Email Verified</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            customer.account?.email_verified ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                          }`}>
                            {customer.account?.email_verified ? 'Verified' : 'Not Verified'}
                          </span>
                        </div>
         
                      </div> */}
                    </div>
                  </div>

                  {/* Additional Information */}
                  {(customer.additional?.company_name || customer.additional?.dealer_license || customer.additional?.notes) && (
                    <div className="bg-white rounded-xl border border-neutral-200 p-6">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                        <Building className="w-5 h-5 text-primary-600 mr-2" />
                        Additional Information
                      </h4>
                      <div className="space-y-3">
                        {customer.additional?.company_name && (
                          <div>
                            <p className="text-sm text-neutral-500">Company Name</p>
                            <p className="text-neutral-900 font-medium">{customer.additional.company_name}</p>
                          </div>
                        )}
                        {customer.additional?.dealer_license && (
                          <div>
                            <p className="text-sm text-neutral-500">Dealer License</p>
                            <p className="text-neutral-900 font-medium">{customer.additional.dealer_license}</p>
                          </div>
                        )}
                        {customer.additional?.notes && (
                          <div>
                            <p className="text-sm text-neutral-500">Notes</p>
                            <p className="text-neutral-900 font-medium">{customer.additional.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-neutral-200 bg-neutral-50">
              <button
                onClick={onClose}
                className="px-6 py-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomerDetailsModal;
