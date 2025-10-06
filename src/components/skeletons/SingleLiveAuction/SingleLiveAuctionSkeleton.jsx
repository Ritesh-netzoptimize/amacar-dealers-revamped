import React from "react";

const SingleLiveAuctionSkeleton = () => {
  return (
    <div className="mt-16 min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          {/* Header Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="h-6 sm:h-8 lg:h-10 bg-gray-200 rounded w-64 sm:w-80 lg:w-96 mb-2"></div>
                <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-48 sm:w-64 lg:w-80"></div>
              </div>
              <div className="h-8 sm:h-10 w-full sm:w-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Carousel and Info Section Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Carousel Skeleton - 2 columns */}
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full bg-gray-200 rounded-lg sm:rounded-xl"></div>
              </div>

              {/* Right Side Info Skeleton - 1 column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Auction Details Skeleton */}
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg"></div>
                    <div>
                      <div className="h-4 sm:h-5 bg-gray-200 rounded w-24 sm:w-32 mb-1"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-100 p-2 sm:p-3 rounded-lg"
                      >
                        <div className="h-3 bg-gray-200 rounded w-12 sm:w-16 mb-2"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cash Offer Skeleton */}
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg"></div>
                    <div>
                      <div className="h-4 sm:h-5 bg-gray-200 rounded w-20 sm:w-24 mb-1"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="h-3 bg-gray-200 rounded w-16 sm:w-20 mb-2"></div>
                      <div className="h-5 sm:h-6 bg-gray-200 rounded w-24 sm:w-32"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                        <div className="h-3 bg-gray-200 rounded w-10 sm:w-12 mb-2"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
                      </div>
                      <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                        <div className="h-3 bg-gray-200 rounded w-12 sm:w-16 mb-2"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Vehicle Overview Skeleton - Full width */}
              <div className="lg:col-span-3 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg sm:rounded-xl"></div>
                  <div>
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40 mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-40 sm:w-48"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map((j) => (
                          <div
                            key={j}
                            className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0"
                          >
                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Condition Assessment Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg sm:rounded-xl"></div>
                <div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-40 sm:w-48 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-56"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 mb-2"></div>
                    <div className="h-4 sm:h-5 bg-gray-200 rounded w-20 sm:w-24"></div>
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

export default SingleLiveAuctionSkeleton;
