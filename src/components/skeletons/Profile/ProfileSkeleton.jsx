import React from "react";

export default function ProfileSkeleton ()  {
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
};
