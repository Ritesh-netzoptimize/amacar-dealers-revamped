import React from "react";
import { motion } from "framer-motion";
import { Gavel } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const BidsSection = ({ bids, itemVariants, getBidStatusIcon, getBidStatusText }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8"
    >
      <div className="card p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center">
            <Gavel className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">
              Bids ({bids.length})
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Current bids on this vehicle
            </p>
          </div>
        </div>

        {/* Mobile Card Layout */}
        <div className="block sm:hidden space-y-3">
          {bids.map((bid, index) => (
            <div
              key={bid.id}
              className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-4 rounded-lg border border-neutral-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(bid.amount)}
                </span>
                <div className="flex items-center gap-2">
                  {getBidStatusIcon(bid.status)}
                  <span className="font-medium text-sm">
                    {getBidStatusText(bid.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Bidder:</span>
                  <span className="font-semibold text-sm text-neutral-800">
                    {bid.bidder_display_name}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Email:</span>
                  <span className="text-sm text-neutral-600 truncate max-w-[150px]">
                    {bid.bidder_email}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Date:</span>
                  <span className="font-medium text-sm text-neutral-800">
                    {bid.bid_at?.date}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Time:</span>
                  <span className="text-sm text-neutral-600">
                    {bid.bid_at?.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                  Amount
                </th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                  Bidder
                </th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                  Status
                </th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr
                  key={bid.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <span className="text-lg sm:text-xl font-bold text-green-600">
                      {formatCurrency(bid.amount)}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div>
                      <p className="font-semibold text-neutral-800 text-xs sm:text-sm">
                        {bid.bidder_display_name}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600 truncate max-w-[120px] sm:max-w-none">
                        {bid.bidder_email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {getBidStatusIcon(bid.status)}
                      <span className="font-medium text-xs sm:text-sm">
                        {getBidStatusText(bid.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div>
                      <p className="font-medium text-neutral-800 text-xs sm:text-sm">
                        {bid.bid_at?.date}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600">
                        {bid.bid_at?.time}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default BidsSection;
