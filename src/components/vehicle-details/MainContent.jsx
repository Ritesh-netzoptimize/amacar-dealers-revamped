import React from "react";
import { motion } from "framer-motion";
import { Car, Star, Shield, Award, MapPin, CheckCircle } from "lucide-react";

export default function MainContent({ basic_info, location, condition_assessment, itemVariants, bids }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Vehicle Overview - Most Important Info */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 card p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">
                Vehicle Overview
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Key details about this vehicle
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="font-semibold text-blue-800 text-sm sm:text-base">
                  Vehicle Details
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Year/Make/Model:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.year} {basic_info?.make} {basic_info?.model}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Trim:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.trim || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Mileage:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.mileage
                      ? `${basic_info.mileage.toLocaleString()} miles`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="font-semibold text-green-800 text-sm sm:text-base">
                  Condition
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Body Type:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.body_type || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Exterior:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.exterior_color || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Interior:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.interior_color || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-800 text-sm sm:text-base">
                  Performance
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Transmission:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.transmission || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    Engine:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {basic_info?.engine_type || "N/A"}
                  </span>
                </div>
                {basic_info?.powertrain_description && (
                  <div className="mt-3">
                    <span className="text-xs sm:text-sm text-neutral-600">
                      Powertrain:
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-neutral-800 mt-1">
                      {basic_info.powertrain_description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                <span className="font-semibold text-teal-800 text-sm sm:text-base">
                  Location
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    City, State:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {location?.city && location?.state
                      ? `${location.city}, ${location.state}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-600 text-xs sm:text-sm">
                    ZIP Code:
                  </span>
                  <span className="font-semibold text-neutral-800 text-sm sm:text-base">
                    {location?.zip_code || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Condition Assessment */}
        {condition_assessment && (
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 card p-4 sm:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">
                  Condition Assessment
                </h2>
                <p className="text-sm sm:text-base text-neutral-600">
                  Complete vehicle condition details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Overall Title
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-green-800 break-words">
                  {condition_assessment?.title || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Cosmetic Condition
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-blue-800 break-words">
                  {condition_assessment?.cosmetic || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Accident History
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-purple-800 break-words">
                  {condition_assessment?.accident || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Tire Tread
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-orange-800 break-words">
                  {condition_assessment?.tread || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Smoked Windows
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-red-800 break-words">
                  {condition_assessment?.smoked || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Modifications
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-indigo-800 break-words">
                  {condition_assessment?.modifications || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Warning Lights
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-pink-800 break-words">
                  {condition_assessment?.warning || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-2">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Features
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-teal-800 break-words">
                  {condition_assessment?.features
                    ? Array.isArray(condition_assessment.features)
                      ? condition_assessment.features.join(", ") // normal array
                      : String(condition_assessment.features).replace(
                          /^a:\d+:\{i:\d+;s:\d+:"([^"]+)";\}$/,
                          "$1"
                        ) // serialized PHP string
                    : "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

