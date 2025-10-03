import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6">
      <div className="px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Recent Vehicles Section */}
        <div className="mb-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Section - Vehicle Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden h-[420px]">
                    {/* Image Skeleton */}
                    <Skeleton className="h-56 w-full" />
                    
                    {/* Card Content */}
                    <div className="p-4 flex flex-col h-[calc(100%-13rem)]">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto mb-4">
                        <Skeleton className="flex-1 h-10 rounded-md" />
                        <Skeleton className="flex-1 h-10 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Recent Activity */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 h-fit">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Activity List */}
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg">
                      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Customers Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div>
                <Skeleton className="h-6 w-40 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <div className="w-full min-w-[600px]">
                {/* Table Header */}
                <div className="flex border-b border-neutral-100 mb-4">
                  <div className="w-[25%] pb-3">
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="w-[25%] pb-3">
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="w-[15%] pb-3">
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="w-[15%] pb-3">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="w-[20%] pb-3 text-right">
                    <Skeleton className="h-4 w-12 ml-auto" />
                  </div>
                </div>

                {/* Table Rows */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex border-b border-neutral-100 py-4">
                    <div className="w-[25%]">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="w-[25%]">
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="w-[15%]">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="w-[15%]">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="w-[20%] text-right">
                      <div className="flex gap-2 justify-end">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="flex-1 h-10" />
                      <Skeleton className="flex-1 h-10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-6 pt-4 border-t border-neutral-100">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                {/* Icon and Header */}
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Skeleton className="w-full h-12 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
