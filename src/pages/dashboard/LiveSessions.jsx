import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLiveSessions,
  selectSessions,
  selectSessionsLoading,
  selectSessionsError,
} from "@/redux/slices/reverseBiddingSlice";
import LiveSessionsContainer from "@/components/reverse-bidding/LiveSessionsContainer";
import { TrendingDown, Loader2 } from "lucide-react";

const LiveSessions = () => {
  const dispatch = useDispatch();
  const sessions = useSelector(selectSessions);
  const isLoading = useSelector(selectSessionsLoading);
  const error = useSelector(selectSessionsError);

  useEffect(() => {
    dispatch(fetchLiveSessions());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          <p className="text-neutral-600">Loading live sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-4 md:px-6">
        {/* Header Section */}
        <motion.div className="mb-8" variants={headerVariants}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-8 h-8 text-primary-600" />
            <motion.h1
              className="text-3xl font-bold text-neutral-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Live Sessions
            </motion.h1>
          </div>
          <motion.p
            className="text-neutral-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Participate in reverse bidding sessions initiated by customers.
            Compete by offering lower prices and attractive perks.
          </motion.p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-red-600 text-center">
              Error loading sessions: {error}
            </p>
          </motion.div>
        )}

        {/* Sessions Container */}
        {!error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {sessions.length > 0 ? (
              <LiveSessionsContainer sessions={sessions} />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mb-6">
                    <TrendingDown className="w-12 h-12 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    No active sessions
                  </h3>
                  <p className="text-neutral-500 text-center max-w-md">
                    There are currently no reverse bidding sessions available.
                    Check back later for new opportunities.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LiveSessions;

