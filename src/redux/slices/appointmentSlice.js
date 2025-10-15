import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

// Async thunk to fetch appointments
export const fetchAppointmentsFromSlice = createAsyncThunk(
    'appointments/fetchAppointmentsFromSlice',
    async ({ page, perPage }, { rejectWithValue }) => {
      try {
        // Use the axios instance which already handles auth headers
        const response = await api.get('/appointments', {
            params: {
              page,
              per_page: perPage
            }
          });
        console.log("response in thunk", response)
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch appointments');
        }
  
        return {
          appointments: response.data.data || [],
          pagination: response.data.pagination || {},
          success: response.data.success,
          has_appointments: (response.data.data || []).length > 0
        };
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch appointments');
      }
    }
  );

// Async thunk to create appointments
export const createAppointments = createAsyncThunk(
    'appointments/createAppointments',
    async (appointmentData, { rejectWithValue }) => {
      try {
        // Use the axios instance which already handles auth headers
        const response = await api.post('/appointments/schedule', {customer_id: appointmentData.dealerId, start_time: appointmentData.start_time, notes: appointmentData.notes});
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to create appointments');
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create appointments');
      }
    }
  );
  
  // Async thunk to cancel appointments
  export const cancelAppointment = createAsyncThunk(
    'appointments/cancelAppointment',
    async (cancelData, { rejectWithValue }) => {
      try {
        const response = await api.post('/appointments/cancel', {
          appointment_id: cancelData.appointmentId,
          notes: cancelData.notes
        });
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to cancel appointment');
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to cancel appointment');
      }
    }
  );
  
  // Async thunk to reschedule appointments
  export const rescheduleAppointment = createAsyncThunk(
    'appointments/rescheduleAppointment',
    async (rescheduleData, { rejectWithValue }) => {
      try {
        const response = await api.post('/appointments/reschedule', {
          appointment_id: rescheduleData.appointmentId,
          new_start_time: rescheduleData.start_time,
          notes: rescheduleData.notes
        });
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to reschedule appointment');
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to reschedule appointment');
      }
    }
  );

  // Async thunk to confirm appointments
  export const confirmAppointment = createAsyncThunk(
    'appointments/confirmAppointment',
    async (confirmData, { rejectWithValue }) => {
      try {
        const response = await api.post('/appointments/update-status', {
          appointment_id: confirmData.appointmentId,
          status: 'confirmed'
        });
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to confirm appointment');
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to confirm appointment');
      }
    }
  );


  const initialState = {
    loading: false,
    error: null,
    appointments: [],
    totalCount: 0,
    hasAppointments: false,
    // Appointment operation states
    appointmentOperationLoading: false,
    appointmentOperationError: null,
    appointmentOperationSuccess: false,
  };

  const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
      // Reset all appointments data
      resetAppointments: (state) => {
        state.loading = false;
        state.error = null;
        state.appointments = [];
        state.totalCount = 0;
        state.hasAppointments = false;
      },
      // Clear error
      clearError: (state) => {
        state.error = null;
      },
      
      
      // Clear appointment operation states
      clearAppointmentOperationStates: (state) => {
        state.appointmentOperationLoading = false;
        state.appointmentOperationError = null;
        state.appointmentOperationSuccess = false;
      },
      
    },
    extraReducers: (builder) => {
      builder
        // // Fetch appointments
        .addCase(fetchAppointmentsFromSlice.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAppointmentsFromSlice.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.appointments = action.payload.appointments || [];
          state.totalCount = action.payload.total_count || 0;
          state.hasAppointments = action.payload.has_appointments || false;
        })
        .addCase(fetchAppointmentsFromSlice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch appointments';
        })
        // Create appointments
        .addCase(createAppointments.pending, (state) => {
          state.appointmentOperationLoading = true;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = false;
        })
        .addCase(createAppointments.fulfilled, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = true;
          // Add new appointment to the list if it exists
          if (action.payload.appointment) {
            state.appointments.push(action.payload.appointment);
          }
          state.hasAppointments = true;
        })
        .addCase(createAppointments.rejected, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = action.payload || 'Failed to create appointments';
          state.appointmentOperationSuccess = false;
        })
        // Cancel appointment
        .addCase(cancelAppointment.pending, (state) => {
          state.appointmentOperationLoading = true;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = false;
        })
        .addCase(cancelAppointment.fulfilled, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = true;
          // Update the appointment status in the appointments list
          const cancelledAppointment = action.payload.appointment;
          if (cancelledAppointment) {
            const index = state.appointments.findIndex(apt => apt.id === cancelledAppointment.id);
            if (index !== -1) {
              state.appointments[index] = cancelledAppointment;
            }
          }
        })
        .addCase(cancelAppointment.rejected, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = action.payload || 'Failed to cancel appointment';
          state.appointmentOperationSuccess = false;
        })
        // Reschedule appointment
        .addCase(rescheduleAppointment.pending, (state) => {
          state.appointmentOperationLoading = true;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = false;
        })
        .addCase(rescheduleAppointment.fulfilled, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = true;
          // Update the appointment in the appointments list
          const rescheduledAppointment = action.payload.appointment;
          if (rescheduledAppointment) {
            const index = state.appointments.findIndex(apt => apt.id === rescheduledAppointment.id);
            if (index !== -1) {
              state.appointments[index] = rescheduledAppointment;
            }
          }
        })
        .addCase(rescheduleAppointment.rejected, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = action.payload || 'Failed to reschedule appointment';
          state.appointmentOperationSuccess = false;
        })
        // Confirm appointment
        .addCase(confirmAppointment.pending, (state) => {
          state.appointmentOperationLoading = true;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = false;
        })
        .addCase(confirmAppointment.fulfilled, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = null;
          state.appointmentOperationSuccess = true;
          // Update the appointment status in the appointments list
          const confirmedAppointment = action.payload.appointment;
          if (confirmedAppointment) {
            const index = state.appointments.findIndex(apt => apt.id === confirmedAppointment.id);
            if (index !== -1) {
              state.appointments[index] = confirmedAppointment;
            }
          }
        })
        .addCase(confirmAppointment.rejected, (state, action) => {
          state.appointmentOperationLoading = false;
          state.appointmentOperationError = action.payload || 'Failed to confirm appointment';
          state.appointmentOperationSuccess = false;
        })
    },
  });

  export const {
    clearError,
    resetAppointments,
    clearAppointmentOperationStates,
  } = appointmentSlice.actions;

export const selectAppointments = (state) => state.appointments.appointments;
export const selectHasAppointments = (state) => state.appointments.hasAppointments;
export default appointmentSlice.reducer;

export const selectAppointmentOperationLoading = (state) => state.appointments.appointmentOperationLoading;
export const selectAppointmentOperationError = (state) => state.appointments.appointmentOperationError;
export const selectAppointmentOperationSuccess = (state) => state.appointments.appointmentOperationSuccess;