import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit3, Key, CreditCard, Calendar, DollarSign, Settings, Camera, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, fetchProfileInfo, fetchSubscriptionStatus, fetchBillingInfo, uploadProfilePicture, removeProfilePicture } from "@/redux/slices/userSlice";

import EditProfileModal from "@/components/ui/ProfileUI/EditProfileModal";
import ProfileSkeleton from "@/components/skeletons/Profile/ProfileSkeleton";
import toast from "react-hot-toast";
// import ChangePasswordModal from "@/components/ui/ChangePasswordModal";
// import TwoFactorAuthModal from "@/components/ui/TwoFactorAuthModal";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, status, error, subscription, subscriptionLoading, subscriptionError, billing, billingLoading, billingError, uploadProfilePictureLoading, uploadProfilePictureError, removeProfilePictureLoading, removeProfilePictureError } = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

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
    company: "",
    profile_picture: null,
    user_status: "",
    account_status: "",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [editData, setEditData] = useState({ ...profile });

  // Get 2FA status from user data
  const isTwoFactorEnabled = user?.two_fa === 'enabled' || user?.two_fa === true || user?.two_fa === 1;

  // Load user data from Redux state and fetch profile info
  useEffect(() => {
    console.log("uploadProfilePictureLoading", uploadProfilePictureLoading)
    console.log("removeProfilePictureLoading", removeProfilePictureLoading)
  }, [uploadProfilePictureLoading, removeProfilePictureLoading])
  useEffect(() => {
    console.log("profile page user data: ", user);
    
    if (user) {
      const userProfile = {
        firstName: user.first_name || user.display_name?.split(" ")[0] || "",
        lastName: user.last_name || user.display_name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
        zipcode: user.zipcode || "",
        state: user.state || "",
        city: user.city || "",
        bio: user.bio || "Car enthusiast and frequent seller on Amacar platform.",
        joinDate: user.user_registered
          ? new Date(user.user_registered).toLocaleDateString()
          : "",
        totalAuctions: user.totalAuctions || user.total_auctions || 0,
        totalEarnings: user.totalEarnings || user.total_earnings || 0,
        rating: user.rating || 0,
        company: user.company || "",
        profile_picture: user.profile_picture || null,
        user_status: user.user_status || "",
        account_status: user.account_status || "",
      };
      setProfile(userProfile);
      setEditData(userProfile);
    }
  }, [user]);

  // Load user data and fetch profile info on component mount
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchProfileInfo());
    dispatch(fetchSubscriptionStatus());
    dispatch(fetchBillingInfo());
  }, [dispatch]);

  useEffect(() => {
    console.log("subscription", subscription)
  }, [subscription])

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

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select JPG, PNG, or GIF images only');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      // Create preview URL for immediate UI update
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update profile with new image preview
        const newProfile = {
          ...profile,
          profile_picture: {
            url: e.target.result,
            file: file
          }
        };
        setProfile(newProfile);
      };
      reader.readAsDataURL(file);

      // Upload to server
      try {
        const result = await dispatch(uploadProfilePicture(file)).unwrap();
        console.log('Profile picture uploaded successfully:', result);
        toast.success("Image uploaded successfully")
        
        // Update profile with server response
        const newProfile = {
          ...profile,
          profile_picture: {
            id: result.attachment_id,
            url: result.url
          }
        };
        setProfile(newProfile);
      } catch (error) {
        console.error('Failed to upload profile picture:', error);
        // Revert to original profile picture on error
        if (user?.profile_picture?.url) {
          const revertedProfile = {
            ...profile,
            profile_picture: {
              id: user.profile_picture.id,
              url: user.profile_picture.url
            }
          };
          setProfile(revertedProfile);
        }
      }
    }
  };

  // Handle profile picture removal
  const handleProfilePictureRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const result = await dispatch(removeProfilePicture()).unwrap();
      console.log('Profile picture removed successfully:', result);
      toast.success("Profile picture removed successfully");
      
      // Update profile to remove picture
      const newProfile = {
        ...profile,
        profile_picture: null
      };
      setProfile(newProfile);
    } catch (error) {
      console.error('Failed to remove profile picture:', error);
      toast.error(error || 'Failed to remove profile picture');
    }
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

  if (loading || status === 'loading') {
    return <ProfileSkeleton />;
  }
  

  if (error) {
    return (
      <div className="mt-8 md:mt-6 lg:mt-20 min-h-screen bg-gradient-hero p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="card p-4 sm:p-6 lg:p-8 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                dispatch(loadUser());
                dispatch(fetchProfileInfo());
              }}
              className="btn-primary"
            >
              Retry
            </button>
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
                <div 
                  className="relative cursor-pointer group"
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                  onClick={profile.profile_picture?.url ? handleProfilePictureRemove : () => document.getElementById('profile-picture-input').click()}
                >
                  <input
                    id="profile-picture-input"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                  
                  {profile.profile_picture?.url ? (
                    <div className="relative">
                      <img
                        src={profile.profile_picture.url}
                        alt="Profile"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-primary-200 transition-all duration-300 group-hover:border-primary-400"
                      />
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 rounded-full bg-[var(--brand-orange)] bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
                        isHoveringAvatar ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary-200">
                        <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
                      </div>
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 rounded-full bg-[var(--brand-orange)] bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
                        isHoveringAvatar ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                  )}
                  
                  {/* Upload/Remove indicator */}
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    uploadProfilePictureLoading || removeProfilePictureLoading
                      ? 'bg-orange-500 animate-pulse' 
                      : 'bg-primary-600'
                  } ${isHoveringAvatar ? 'scale-110' : 'scale-100'}`}>
                    {uploadProfilePictureLoading || removeProfilePictureLoading ? (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : profile.profile_picture?.url ? (
                      <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    ) : (
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800">
                  {profile.firstName && profile.lastName
                    ? `${profile.firstName} ${profile.lastName}`
                    : profile.display_name || "User Profile"}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600">
                  {profile.joinDate
                    ? `Member since ${profile.joinDate}`
                    : "New member"}
                </p>
                {profile.company && (
                  <p className="text-sm text-neutral-500 mt-1">
                    {profile.company}
                  </p>
                )}
                {(uploadProfilePictureError || removeProfilePictureError) && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{uploadProfilePictureError || removeProfilePictureError}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile.user_status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profile.user_status || 'Pending'}
                  </span>
                  
                </div>
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

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700">
                  Company
                </label>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-600">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{profile.company || "Not provided"}</span>
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
              {/* Total Auctions */}
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
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                  {profile.totalAuctions || 0}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600">Total Auctions</div>
              </div>

              {/* Total Earnings */}
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                  ${profile.totalEarnings?.toLocaleString() || 0}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600">Total Earnings</div>
              </div>

              {/* User Rating */}
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                  {profile.rating || 0}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600">User Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Subscription Status */}
          <motion.div variants={itemVariants} className="card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6">
              Subscription Status
            </h3>

            {subscriptionLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-2 text-neutral-600">Loading subscription...</span>
              </div>
            ) : subscriptionError ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{subscriptionError}</p>
                <button
                  onClick={() => dispatch(fetchSubscriptionStatus())}
                  className="btn-primary"
                >
                  Retry
                </button>
              </div>
            ) : subscription ? (
              <div className="space-y-4">
                {/* Subscription Status Card */}
                <div className={`p-4 sm:p-6 rounded-xl border-2 ${
                  subscription.has_subscription 
                    ? subscription.status === 'trialing' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        subscription.has_subscription 
                          ? subscription.status === 'trialing' 
                            ? 'bg-blue-500' 
                            : 'bg-green-500'
                          : 'bg-gray-400'
                      }`}></div>
                      <h4 className="text-lg font-semibold text-neutral-800">
                        {subscription.has_subscription ? 'Active Subscription' : 'No Subscription'}
                      </h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === 'trialing' 
                        ? 'bg-blue-100 text-blue-800' 
                        : subscription.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1) || 'Unknown'}
                    </span>
                  </div>

                  {subscription.has_subscription && (
                    <div className="space-y-6">
                      {/* Trial Information - Prominent Display */}
                      {subscription.is_trialing && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <Calendar className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-blue-900">Trial Period Active</h4>
                                <p className="text-blue-700">You're currently in your trial period</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-blue-900">${subscription.trial_amount}</div>
                              <div className="text-sm text-blue-700">Trial Amount</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <div className="flex items-center mb-2">
                                <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium text-blue-800">Trial Started</span>
                              </div>
                              <div className="text-lg font-semibold text-blue-900">
                                {subscription.trial_start_date 
                                  ? new Date(subscription.trial_start_date).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })
                                  : 'N/A'
                                }
                              </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <div className="flex items-center mb-2">
                                <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium text-blue-800">Trial Ends</span>
                              </div>
                              <div className="text-lg font-semibold text-blue-900">
                                {subscription.trial_end_date 
                                  ? new Date(subscription.trial_end_date).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })
                                  : 'N/A'
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Subscription Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-neutral-200">
                          <div className="flex items-center mb-3">
                            <CreditCard className="w-5 h-5 text-neutral-600 mr-2" />
                            <h5 className="font-semibold text-neutral-800">Subscription Details</h5>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CreditCard className="w-4 h-4 text-neutral-500 mr-1" />
                                <span className="text-neutral-600">Stripe ID:</span>
                              </div>
                              <span className="font-mono text-xs text-neutral-500 truncate max-w-24">
                                {subscription.stripe_subscription_id || 'N/A'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Settings className="w-4 h-4 text-neutral-500 mr-1" />
                                <span className="text-neutral-600">Status:</span>
                              </div>
                              <span className="font-medium capitalize">
                                {subscription.status || 'Unknown'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Billing Information */}
                        <div className="bg-white p-4 rounded-lg border border-neutral-200">
                          <div className="flex items-center mb-3">
                            <DollarSign className="w-5 h-5 text-neutral-600 mr-2" />
                            <h5 className="font-semibold text-neutral-800">Billing Information</h5>
                          </div>
                          {billingLoading ? (
                            <div className="flex items-center justify-center py-4">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                              <span className="ml-2 text-sm text-neutral-600">Loading billing...</span>
                            </div>
                          ) : billingError ? (
                            <div className="text-center py-4">
                              <p className="text-red-600 text-sm mb-2">{billingError}</p>
                              <button
                                onClick={() => dispatch(fetchBillingInfo())}
                                className="btn-primary text-xs py-1 px-2"
                              >
                                Retry
                              </button>
                            </div>
                          ) : billing ? (
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <CreditCard className="w-4 h-4 text-neutral-500 mr-1" />
                                  <span className="text-neutral-600">Has Billing:</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  billing.has_billing 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {billing.has_billing ? 'Yes' : 'No'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <CreditCard className="w-4 h-4 text-neutral-500 mr-1" />
                                  <span className="text-neutral-600">Customer ID:</span>
                                </div>
                                <span className="font-mono text-xs text-neutral-500 truncate max-w-24">
                                  {billing.stripe_customer_id || 'N/A'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 text-neutral-500 mr-1" />
                                  <span className="text-neutral-600">Trial Amount:</span>
                                </div>
                                <span className="font-medium">
                                  ${billing.trial_amount || 0}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 text-neutral-500 mr-1" />
                                  <span className="text-neutral-600">Currency:</span>
                                </div>
                                <span className="font-medium">
                                  {billing.currency || 'USD'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-neutral-600 text-sm">No billing data available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {!subscription.has_subscription && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">No Active Subscription</h4>
                      <p className="text-neutral-600 mb-4">Get started with a subscription to access all features</p>
                      <button className="btn-primary">
                        Choose a Plan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-600">No subscription data available</p>
              </div>
            )}
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
      <EditProfileModal
        isOpen={showEditModal}
        onClose={handleCancel}
        onSave={handleSave}
        initialData={editData}
      />

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

export default Profile;
