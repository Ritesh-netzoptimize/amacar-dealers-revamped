import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data generators for simulation
const generateMockSessions = () => {
    const vehicles = [
        { id: 1, name: 'Toyota Camry', year: 2020, model: 'Camry SE' },
        { id: 2, name: 'Honda Accord', year: 2021, model: 'Accord EX' },
        { id: 3, name: 'Ford F-150', year: 2019, model: 'F-150 XLT' },
        { id: 4, name: 'Tesla Model 3', year: 2022, model: 'Model 3 Long Range' },
        { id: 5, name: 'BMW 3 Series', year: 2021, model: '330i' },
        { id: 6, name: 'Chevrolet Silverado', year: 2020, model: 'Silverado LT' },
    ];

    const statuses = ['active', 'active', 'active', 'active', 'ended'];
    const now = Date.now();

    return vehicles.map((vehicle, index) => {
        const hoursLeft = Math.floor(Math.random() * 23) + 1;
        const expiresAt = now + (hoursLeft * 60 * 60 * 1000);
        const status = statuses[index % statuses.length];

        return {
            id: `session-${vehicle.id}`,
            sessionId: `RB-${String(vehicle.id).padStart(6, '0')}`,
            vehicle: vehicle.name,
            year: vehicle.year,
            model: vehicle.model,
            timeLeft: `${hoursLeft}h ${Math.floor(Math.random() * 60)}m`,
            timeLeftSeconds: hoursLeft * 3600 + Math.floor(Math.random() * 3600),
            expiresAt: new Date(expiresAt).toISOString(),
            status: status,
            condition: Math.random() > 0.5 ? 'New' : 'Used',
            sessionDuration: '24 hours',
            createdAt: new Date(now - Math.random() * 3600000).toISOString(),
        };
    });
};

const generateMockLeaderboard = (sessionId, currentDealerId = 'dealer-1') => {
    const dealers = [
        { id: 'dealer-1', name: 'AutoMax Dealers', isCurrentDealer: true },
        { id: 'dealer-2', name: 'Premium Motors', isCurrentDealer: false },
        { id: 'dealer-3', name: 'Elite Auto Group', isCurrentDealer: false },
        { id: 'dealer-4', name: 'City Car Center', isCurrentDealer: false },
        { id: 'dealer-5', name: 'Metro Auto Sales', isCurrentDealer: false },
    ];

    // Generate bids with random prices (lower is better in reverse bidding)
    const bids = dealers
        .filter(dealer => {
            // Some dealers may not have placed bids yet
            if (dealer.id === currentDealerId) {
                // Current dealer might or might not have a bid
                return Math.random() > 0.3;
            }
            return Math.random() > 0.2;
        })
        .map((dealer, index) => {
            const basePrice = 25000 - (index * 500);
            const price = basePrice - Math.floor(Math.random() * 2000);
            const perks = [
                'Free oil change',
                'Extended warranty included',
                '1-year free maintenance',
                'Window tinting',
                'Floor mats included',
                'Delivery service',
            ].filter(() => Math.random() > 0.5).slice(0, 2);

            return {
                id: `bid-${dealer.id}-${sessionId}`,
                dealerId: dealer.id,
                dealerName: dealer.name,
                dealerNameAnonymized: dealer.isCurrentDealer
                    ? dealer.name // Show real name for current dealer
                    : `Dealer ${String.fromCharCode(65 + index)}`, // Anonymize others
                price: price,
                perks: perks.length > 0 ? perks.join(', ') : 'No perks',
                rank: index + 1,
                submittedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
                isCurrentDealer: dealer.isCurrentDealer,
            };
        })
        .sort((a, b) => a.price - b.price) // Sort by price ascending (lower is better)
        .map((bid, index) => ({
            ...bid,
            rank: index + 1,
        }));

    return bids;
};

// Async thunk to fetch live reverse bidding sessions
export const fetchLiveSessions = createAsyncThunk(
    'reverseBidding/fetchLiveSessions',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const sessions = generateMockSessions();

            return {
                success: true,
                sessions: sessions,
                total: sessions.length,
            };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch live sessions');
        }
    }
);

// Async thunk to fetch session leaderboard
export const fetchSessionLeaderboard = createAsyncThunk(
    'reverseBidding/fetchSessionLeaderboard',
    async (sessionId, { rejectWithValue, getState }) => {
        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 600));

            // Get current dealer ID from state (or use mock)
            const state = getState();
            const currentDealerId = state.user?.user?.id || 'dealer-1';

            const leaderboard = generateMockLeaderboard(sessionId, currentDealerId);

            // Get session details
            const sessions = generateMockSessions();
            const session = sessions.find(s => s.id === sessionId || s.sessionId === sessionId);

            return {
                success: true,
                session: session,
                leaderboard: leaderboard,
                totalBids: leaderboard.length,
            };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch session leaderboard');
        }
    }
);

// Async thunk to submit a bid
export const submitBid = createAsyncThunk(
    'reverseBidding/submitBid',
    async ({ sessionId, bidAmount, perks }, { rejectWithValue, getState }) => {
        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const state = getState();
            const currentDealerId = state.user?.user?.id || 'dealer-1';
            const currentDealerName = state.user?.user?.firstName
                ? `${state.user.user.firstName} ${state.user.user.lastName || ''}`.trim()
                : 'AutoMax Dealers';

            // Create new bid
            const newBid = {
                id: `bid-${currentDealerId}-${sessionId}-${Date.now()}`,
                dealerId: currentDealerId,
                dealerName: currentDealerName,
                dealerNameAnonymized: currentDealerName,
                price: parseFloat(bidAmount),
                perks: perks || 'No perks',
                rank: 1, // Will be recalculated
                submittedAt: new Date().toISOString(),
                isCurrentDealer: true,
            };

            return {
                success: true,
                bid: newBid,
                sessionId: sessionId,
                message: 'Bid submitted successfully',
            };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to submit bid');
        }
    }
);

// Async thunk to withdraw a bid
export const withdrawBid = createAsyncThunk(
    'reverseBidding/withdrawBid',
    async ({ sessionId, bidId }, { rejectWithValue }) => {
        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 800));

            return {
                success: true,
                sessionId: sessionId,
                bidId: bidId,
                message: 'Bid withdrawn successfully',
            };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to withdraw bid');
        }
    }
);

const initialState = {
    // Live sessions list
    sessions: [],
    sessionsLoading: false,
    sessionsError: null,

    // Current session leaderboard
    currentSessionId: null,
    currentSession: null,
    leaderboard: [],
    leaderboardLoading: false,
    leaderboardError: null,

    // Bid operations
    bidOperationLoading: false,
    bidOperationError: null,
    bidOperationSuccess: false,
};

const reverseBiddingSlice = createSlice({
    name: 'reverseBidding',
    initialState,
    reducers: {
        clearSessionsError: (state) => {
            state.sessionsError = null;
        },
        clearLeaderboardError: (state) => {
            state.leaderboardError = null;
        },
        clearBidOperationStates: (state) => {
            state.bidOperationLoading = false;
            state.bidOperationError = null;
            state.bidOperationSuccess = false;
        },
        setCurrentSessionId: (state, action) => {
            state.currentSessionId = action.payload;
        },
        resetReverseBidding: (state) => {
            state.sessions = [];
            state.currentSessionId = null;
            state.currentSession = null;
            state.leaderboard = [];
            state.sessionsError = null;
            state.leaderboardError = null;
            state.bidOperationError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch live sessions
            .addCase(fetchLiveSessions.pending, (state) => {
                state.sessionsLoading = true;
                state.sessionsError = null;
            })
            .addCase(fetchLiveSessions.fulfilled, (state, action) => {
                state.sessionsLoading = false;
                state.sessionsError = null;
                state.sessions = action.payload.sessions || [];
            })
            .addCase(fetchLiveSessions.rejected, (state, action) => {
                state.sessionsLoading = false;
                state.sessionsError = action.payload || 'Failed to fetch live sessions';
            })
            // Fetch session leaderboard
            .addCase(fetchSessionLeaderboard.pending, (state) => {
                state.leaderboardLoading = true;
                state.leaderboardError = null;
            })
            .addCase(fetchSessionLeaderboard.fulfilled, (state, action) => {
                state.leaderboardLoading = false;
                state.leaderboardError = null;
                state.currentSession = action.payload.session;
                state.currentSessionId = action.payload.session?.id || action.payload.session?.sessionId;
                state.leaderboard = action.payload.leaderboard || [];
            })
            .addCase(fetchSessionLeaderboard.rejected, (state, action) => {
                state.leaderboardLoading = false;
                state.leaderboardError = action.payload || 'Failed to fetch session leaderboard';
            })
            // Submit bid
            .addCase(submitBid.pending, (state) => {
                state.bidOperationLoading = true;
                state.bidOperationError = null;
                state.bidOperationSuccess = false;
            })
            .addCase(submitBid.fulfilled, (state, action) => {
                state.bidOperationLoading = false;
                state.bidOperationError = null;
                state.bidOperationSuccess = true;

                // Add new bid to leaderboard and recalculate ranks
                const newBid = action.payload.bid;
                const updatedLeaderboard = [...state.leaderboard, newBid]
                    .sort((a, b) => a.price - b.price)
                    .map((bid, index) => ({
                        ...bid,
                        rank: index + 1,
                    }));

                state.leaderboard = updatedLeaderboard;
            })
            .addCase(submitBid.rejected, (state, action) => {
                state.bidOperationLoading = false;
                state.bidOperationError = action.payload || 'Failed to submit bid';
                state.bidOperationSuccess = false;
            })
            // Withdraw bid
            .addCase(withdrawBid.pending, (state) => {
                state.bidOperationLoading = true;
                state.bidOperationError = null;
                state.bidOperationSuccess = false;
            })
            .addCase(withdrawBid.fulfilled, (state, action) => {
                state.bidOperationLoading = false;
                state.bidOperationError = null;
                state.bidOperationSuccess = true;

                // Remove bid from leaderboard and recalculate ranks
                const updatedLeaderboard = state.leaderboard
                    .filter(bid => bid.id !== action.payload.bidId)
                    .map((bid, index) => ({
                        ...bid,
                        rank: index + 1,
                    }));

                state.leaderboard = updatedLeaderboard;
            })
            .addCase(withdrawBid.rejected, (state, action) => {
                state.bidOperationLoading = false;
                state.bidOperationError = action.payload || 'Failed to withdraw bid';
                state.bidOperationSuccess = false;
            });
    },
});

export const {
    clearSessionsError,
    clearLeaderboardError,
    clearBidOperationStates,
    setCurrentSessionId,
    resetReverseBidding,
} = reverseBiddingSlice.actions;

// Selectors
export const selectSessions = (state) => state.reverseBidding.sessions;
export const selectSessionsLoading = (state) => state.reverseBidding.sessionsLoading;
export const selectSessionsError = (state) => state.reverseBidding.sessionsError;

export const selectCurrentSession = (state) => state.reverseBidding.currentSession;
export const selectLeaderboard = (state) => state.reverseBidding.leaderboard;
export const selectLeaderboardLoading = (state) => state.reverseBidding.leaderboardLoading;
export const selectLeaderboardError = (state) => state.reverseBidding.leaderboardError;

export const selectBidOperationLoading = (state) => state.reverseBidding.bidOperationLoading;
export const selectBidOperationError = (state) => state.reverseBidding.bidOperationError;
export const selectBidOperationSuccess = (state) => state.reverseBidding.bidOperationSuccess;

export default reverseBiddingSlice.reducer;

