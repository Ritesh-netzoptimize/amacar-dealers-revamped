import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSessionLeaderboard,
  submitBid,
  withdrawBid,
  selectCurrentSession,
  selectLeaderboard,
  selectLeaderboardLoading,
  selectLeaderboardError,
  selectBidOperationLoading,
  selectBidOperationSuccess,
  clearBidOperationStates,
} from "@/redux/slices/reverseBiddingSlice";
import SessionLeaderboardContainer from "@/components/reverse-bidding/SessionLeaderboardContainer";
import BidNowDialog from "@/components/reverse-bidding/BidNowDialog";
import WithdrawBidDialog from "@/components/reverse-bidding/WithdrawBidDialog";
import SessionDetailsModal from "@/components/reverse-bidding/SessionDetailsModal";
import { ArrowLeft, Loader2, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";

const SessionLeaderboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const session = useSelector(selectCurrentSession);
  const leaderboard = useSelector(selectLeaderboard);
  const isLoading = useSelector(selectLeaderboardLoading);
  const error = useSelector(selectLeaderboardError);
  const bidOperationLoading = useSelector(selectBidOperationLoading);
  const bidOperationSuccess = useSelector(selectBidOperationSuccess);

  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchSessionLeaderboard(sessionId));
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (bidOperationSuccess) {
      // Refresh leaderboard after successful bid operation
      dispatch(fetchSessionLeaderboard(sessionId));
      dispatch(clearBidOperationStates());
    }
  }, [bidOperationSuccess, dispatch, sessionId]);

  const handleBidNow = () => {
    setBidDialogOpen(true);
  };

  const handleSubmitBid = async (bidData) => {
    try {
      await dispatch(submitBid(bidData)).unwrap();
      toast.success("Bid submitted successfully");
      setBidDialogOpen(false);
    } catch (error) {
      toast.error(error || "Failed to submit bid");
      throw error;
    }
  };

  const handleWithdrawBid = (bidId) => {
    const bid = leaderboard.find((b) => b.id === bidId);
    if (bid) {
      setSelectedBid(bid);
      setWithdrawDialogOpen(true);
    }
  };

  const handleConfirmWithdraw = async (withdrawData) => {
    try {
      await dispatch(withdrawBid(withdrawData)).unwrap();
      toast.success("Bid withdrawn successfully");
      setWithdrawDialogOpen(false);
      setSelectedBid(null);
    } catch (error) {
      toast.error(error || "Failed to withdraw bid");
      throw error;
    }
  };

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
          <p className="text-neutral-600">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 pb-12">
        <div className="px-4 md:px-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 text-center mb-4">
              Error loading session: {error}
            </p>
            <div className="flex justify-center">
              <Button onClick={() => navigate("/reverse-bidding")} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sessions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 pb-12">
        <div className="px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Session not found
              </h3>
              <p className="text-neutral-500 text-center mb-6">
                The session you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate("/reverse-bidding")} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sessions
              </Button>
            </div>
          </div>
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
        <motion.div className="mb-6" variants={headerVariants}>
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/reverse-bidding")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDetailsModalOpen(true)}
              className="flex items-center gap-2 ml-auto"
            >
              <Info className="w-4 h-4" />
              View Details
            </Button>
          </div>
        </motion.div>

        {/* Leaderboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SessionLeaderboardContainer
            leaderboard={leaderboard}
            session={session}
            onBidNow={handleBidNow}
            onWithdrawBid={handleWithdrawBid}
          />
        </motion.div>

        {/* Bid Now Dialog */}
        <BidNowDialog
          isOpen={bidDialogOpen}
          onClose={() => setBidDialogOpen(false)}
          session={session}
          onSubmit={handleSubmitBid}
        />

        {/* Withdraw Bid Dialog */}
        <WithdrawBidDialog
          isOpen={withdrawDialogOpen}
          onClose={() => {
            setWithdrawDialogOpen(false);
            setSelectedBid(null);
          }}
          session={session}
          bid={selectedBid}
          onConfirm={handleConfirmWithdraw}
          isLoading={bidOperationLoading}
        />

        {/* Session Details Modal */}
        <SessionDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          session={session}
          bidHistory={leaderboard}
        />
      </div>
    </motion.div>
  );
};

export default SessionLeaderboard;

