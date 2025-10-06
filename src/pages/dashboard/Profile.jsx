import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit3, Key } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/redux/slices/userSlice";

// import EditProfileModal from "@/components/ui/EditProfileModal";
// import ChangePasswordModal from "@/components/ui/ChangePasswordModal";
// import TwoFactorAuthModal from "@/components/ui/TwoFactorAuthModal";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

  // Default profile data structure
  const defaultProfile = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipcode: "",
    state: "",
    city: "",
    bio: "Car enthusiast and frequent seller on Amacar platform.",
    joinDate: "",
    totalAuctions: 0,
    totalEarnings: 0,
    rating: 0,
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [editData, setEditData] = useState({ ...profile });

  // Get 2FA status from user data
  const isTwoFactorEnabled = user?.two_fa === 'enabled' || user?.two_fa === true || user?.two_fa === 1;

  // Load user data from Redux state
  useEffect(() => {
    console.log("profile page user data: ", user);
    // i have display_name in the user data and has two words i want to split int in firstname and last name and if it has one wornd then wnnt only in the firstnam how to do that
    const firstName = user.display_name.split(" ")[0] || user.first_name || "";
    const lastName = user.display_name.split(" ")[1] || user.last_name || "";

    if (user) {
      const userProfile = {
        firstName: user.display_name.split(" ")[0] || user.first_name || "",
        lastName: user.display_name.split(" ")[1] || user.last_name || "",
        email: user.email || "",
        phone: user.phone || user.meta?.phone || "",
        zipcode:
          user.meta?.zip ||
          user.meta?.zip_code ||
          user.zip_code ||
          "",
        state: user.state || user.meta?.state || "",
        city: user.city || user.meta?.city || "",
        bio: user.bio || defaultProfile.bio,
        joinDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "",
        totalAuctions: user.totalAuctions || user.total_auctions || 0,
        totalEarnings: user.totalEarnings || user.total_earnings || 0,
        rating: user.rating || 0,
      };
      setProfile(userProfile);
      setEditData(userProfile);
    }
  }, [user]);

  // Load user data on component mount
  useEffect(() => {
    dispatch(loadUser());
    // dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const handleEdit = () => {
    setEditData({ ...profile });
    setShowEditModal(true);
  };

  const handleSave = async (updatedData) => {
    try {
      // The updateProfile action is already called in the EditProfileModal
      // This function is called after successful API update
      setProfile({ ...updatedData });
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setShowEditModal(false);
  };

  const handleTwoFactorToggle = () => {
    setShowTwoFactorModal(true);
  };

  const handleTwoFactorSuccess = () => {
    // Force refresh user data after successful 2FA toggle
    dispatch(loadUser());
  };

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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="mt-8 md:mt-6 lg:mt-20 min-h-screen bg-gradient-hero p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="card p-4 sm:p-6 lg:p-8">
              <div className="animate-pulse">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48"></div>
                  <div className="h-8 sm:h-10 bg-gray-200 rounded w-full sm:w-32"></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto sm:mx-0"></div>
                  <div className="space-y-3 text-center sm:text-left">
                    <div className="h-6 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mx-auto sm:mx-0"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-40 mx-auto sm:mx-0"></div>
                    <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6 mt-4">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="card p-4 sm:p-6 lg:p-8">
              <div className="animate-pulse">
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40 mb-4 sm:mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl mx-auto mb-3 sm:mb-4"></div>
                      <div className="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16 mx-auto mb-1 sm:mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Information Skeleton */}
            <div className="card p-4 sm:p-6 lg:p-8">
              <div className="animate-pulse">
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-36 sm:w-48 mb-4 sm:mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Settings Skeleton */}
            <div className="card p-4 sm:p-6 lg:p-8">
              <div className="animate-pulse">
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40 mb-4 sm:mb-6"></div>
                <div className="space-y-4 sm:space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-200 gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="h-4 sm:h-5 bg-gray-200 rounded w-36 sm:w-48"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-64"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-full sm:w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-6 lg:mt-20 min-h-screen bg-gradient-hero p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800">
                Profile Settings
              </h1>
              <button
                onClick={handleEdit}
                className="cursor-pointer btn-secondary flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative flex justify-center sm:justify-start">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800">
                  {profile.firstName && profile.lastName
                    ? `${profile.firstName} ${profile.lastName}`
                    : "User Profile"}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600">
                  {profile.joinDate
                    ? `Member since ${profile.joinDate}`
                    : "New member"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Profile Information */}
          <motion.div variants={itemVariants} className="card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700">
                  Email Address
                </label>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-600">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{profile.email || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-600">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{profile.phone || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700">
                  City
                </label>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{profile.city || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700">
                  State
                </label>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{profile.state || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700">
                  Zipcode
                </label>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{profile.zipcode || "Not provided"}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Your Statistics */}
          <motion.div variants={itemVariants} className="card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6">
              Your Statistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Total Vehicles */}
              <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0"
                    />
                  </svg>
                </div>
                
                <div className="text-xs sm:text-sm text-neutral-600">Total Vehicles</div>
              </div>

              {/* Accepted Offers */}
              <div className="text-center p-4 sm:p-6 bg-green-50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                
                <div className="text-xs sm:text-sm text-neutral-600">Accepted Offers</div>
              </div>

              {/* Total Bid Value */}
              <div className="text-center p-4 sm:p-6 bg-emerald-50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                
                <div className="text-xs sm:text-sm text-neutral-600">Total Bid Value</div>
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div variants={itemVariants} className="card p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6">
              Account Settings
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-neutral-200 gap-4">
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-neutral-800 mb-1">
                    Change Password
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Update your password to keep your account secure
                  </p>
                </div>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="cursor-pointer btn-secondary flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                >
                  <Key className="w-4 h-4" />
                  <span>Change</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-neutral-800 mb-1">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    {isTwoFactorEnabled 
                      ? 'An extra layer of security is enabled for your account'
                      : 'Add an extra layer of security to your account'
                    }
                  </p>
                </div>
                <button 
                  onClick={handleTwoFactorToggle}
                  className={`cursor-pointer btn-secondary w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-2 ${
                    isTwoFactorEnabled 
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
                      : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  }`}
                >
                  {isTwoFactorEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Change Password Modal */}
      {/* <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      /> */}

      {/* Edit Profile Modal */}
      {/* <EditProfileModal
        isOpen={showEditModal}
        onClose={handleCancel}
        onSave={handleSave}
        initialData={editData}
      /> */}

      {/* Two-Factor Authentication Modal */}
      {/* <TwoFactorAuthModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        onSuccess={handleTwoFactorSuccess}
        isEnabled={isTwoFactorEnabled}
      /> */}
    </div>
  );
};

export default ProfilePage;
