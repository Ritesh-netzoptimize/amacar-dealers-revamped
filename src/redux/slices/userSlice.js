import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api'; // Assuming api.js is in src/

// Async thunks for auth actions
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        // If 2FA is not required, proceed with normal login
        if (!response.data.requires_2fa) {
          // Store user data in localStorage for persistence (token is in HTTP-only cookie)
          if (response.data.user) {
            localStorage.setItem('authUser', JSON.stringify(response.data.user));
          }
          if (response.data.expires_at) {
            // expires_at is already a Unix timestamp, convert to milliseconds
            const expirationTime = response.data.expires_at * 1000;
            localStorage.setItem('authExpiration', expirationTime);
          }
        }
        return response.data; // { user, token, expires_at, requires_2fa, user_id, username }
      }
      return rejectWithValue(response.data.message || 'Login failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', data);
      if (response.data.success) {
        return response.data; // { user, token, expires_in }
      }
      return rejectWithValue(response.data.message || 'Registration failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);


export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
        // console.log(email)
      const response = await api.post('/auth/forgot-password', { email });
      if (response.data.success) {
        // console.log(response)
        // console.log(response.data)
        return response.data;
      }
      return rejectWithValue(response.data.message || 'Failed to send OTP');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Sending OTP verification request:', data);
      const response = await api.post('/auth/verify-otp', data);
      console.log('OTP verification response:', response.data);
      
      if (response.data.success) {
        console.log('OTP verification successful, returning token:', response.data.resetToken);
        return response.data.resetToken; // Assuming backend returns resetToken
      }
      console.log('OTP verification failed - success is false:', response.data);
      return rejectWithValue(response.data.message || 'Invalid OTP');
    } catch (error) {
      console.log('OTP verification API error:', error.response?.data || error.message);
      console.log('Full error object:', error);
      console.log('Error status:', error.response?.status);
      console.log('Error headers:', error.response?.headers);
      return rejectWithValue(error.response?.data?.message || 'Invalid OTP');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, otp, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', { token, otp, new_password: newPassword, confirm_password: confirmPassword });
      if (response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data.message || 'Password reset failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password reset failed');
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/change-password', { current_password: passwordData.currentPassword, new_password: passwordData.newPassword, confirm_password: passwordData.confirmPassword });
      if (response.data.success) {
        return response.data.user;
      }
      return rejectWithValue(response.data.message || 'password update failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'password update failed');
    }
  }
);


export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // Transform data to match API structure
      const apiData = {
        phone: profileData.phone,
        city: profileData.city,
        state: profileData.state,
        zip: profileData.zipcode
      };
      
      const response = await api.put('/auth/profile', apiData);
      if (response.data.success) {
        return response.data.user;
      }
      return rejectWithValue(response.data.message || 'Profile update failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);

export const toggleTwoFactorAuth = createAsyncThunk(
  'user/toggleTwoFactorAuth',
  async ({ enabled }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/twofa', { enabled });
      if (response.data.success) {
        // After successful 2FA toggle, fetch updated user profile
        const profileResponse = await api.get('/user/profile');
        if (profileResponse.data.success) {
          return profileResponse.data.user;
        }
        // If profile fetch fails, return the 2FA response data
        return response.data.user || { two_fa: enabled ? 'enabled' : 'disabled' };
      }
      return rejectWithValue(response.data.message || 'Failed to update 2FA settings');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update 2FA settings');
    }
  }
);

export const verifyLoginOTP = createAsyncThunk(
  'user/verifyLoginOTP',
  async ({ otp, username }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-login-otp', { otp, username });
      if (response.data.success) {
        // Store user data in localStorage for persistence (token is in HTTP-only cookie)
        if (response.data.user) {
          localStorage.setItem('authUser', JSON.stringify(response.data.user));
        }
        if (response.data.expires_at) {
          // expires_at is already a Unix timestamp, convert to milliseconds
          const expirationTime = response.data.expires_at * 1000;
          localStorage.setItem('authExpiration', expirationTime);
        }
        return response.data;
      }
      return rejectWithValue(response.data.message || 'OTP verification failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

// Logout API call to clear HTTP-only cookie
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      // Even if the API call fails, we should still clear local state
      console.warn('Logout API call failed:', error);
      return { success: true };
    }
  }
);

// Async thunk to fetch city and state by ZIP code
export const fetchCityStateByZip = createAsyncThunk(
  'carDetailsAndQuestions/fetchCityStateByZip',
  async (zip, { rejectWithValue }) => {
    try {
      //   console.log('Fetching city/state for ZIP:', zip);
      const response = await api.get(
        `/location/city-state-by-zip?zipcode=${zip}`
      );
      //   console.log('City/State API response:', response.data);

      if (response.data.success) {
        return {
          city: response.data.location.city,
          state: response.data.location.state_name,
          zipcode: response.data.location.zipcode,
        };
      } else {
        return rejectWithValue(response.data.message || 'Invalid ZIP code');
      }
    } catch (error) {
      console.log('City/State API error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch location data');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: true,
    locationStatus: 'idle',
    locationError: null,
    form: {
      values: {},
      errors: {},
    },
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    setFormValue: (state, action) => {
      const { key, value } = action.payload;
      state.form.values[key] = value;
      state.form.errors[key] = '';
    },
    setFormError: (state, action) => {
      const { key, error } = action.payload;
      state.form.errors[key] = error;
    },
    resetForm: (state) => {
      state.form.values = {};
      state.form.errors = {};
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
        console.log("Inside logout reducer first step")
        // Clear localStorage data (token is in HTTP-only cookie)
        localStorage.removeItem('authUser');
        localStorage.removeItem('authExpiration');
        state.user = null;
        state.error = null;
        state.form.values = {};
        state.form.errors = {};
        console.log("Inside logout reducer last step")
    },
    loadUser: (state) => {
      const storedUser = localStorage.getItem('authUser');
      const expiration = localStorage.getItem('authExpiration');

      // Clean up any invalid data in localStorage
      if (storedUser === 'undefined' || storedUser === 'null') {
        localStorage.removeItem('authUser');
        localStorage.removeItem('authExpiration');
        state.user = null;
        state.loading = false;
        return;
      }

      if (storedUser && expiration) {
        try {
          const expTime = parseInt(expiration);
          if (Date.now() < expTime) {
            state.user = JSON.parse(storedUser);
            state.loading = false;
            // Note: Auto-logout timer is set in the component
          } else {
            state.user = null;
            localStorage.removeItem('authUser');
            localStorage.removeItem('authExpiration');
            state.loading = false;
          }
        } catch (error) {
          // If JSON.parse fails, clear the invalid data and logout
          console.error('Error parsing stored user data:', error);
          state.user = null;
          localStorage.removeItem('authUser');
          localStorage.removeItem('authExpiration');
          state.loading = false;
        }
      } else {
        state.user = null;
        state.loading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Only set user and tokens if 2FA is not required
        if (!action.payload.requires_2fa) {
          state.user = action.payload.user;
          // Tokens are already stored in localStorage by the thunk
        }
        // If 2FA is required, we don't set the user yet - wait for OTP verification
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        const expirationTime = Date.now() + action.payload.expires_in * 1000;
        localStorage.setItem('authExpiration', expirationTime);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Only update user data if payload is valid
        if (action.payload && typeof action.payload === 'object') {
          state.user = action.payload;
          // Update localStorage with new user data
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        }
        // If payload is invalid, keep existing user data
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Only update user data if payload is valid
        if (action.payload && typeof action.payload === 'object') {
          state.user = action.payload;
          // Update localStorage with new user data
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        }
        // If payload is invalid, keep existing user data
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Toggle Two-Factor Authentication
      .addCase(toggleTwoFactorAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleTwoFactorAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Only update user data if payload is valid
        if (action.payload && typeof action.payload === 'object') {
          state.user = action.payload;
          // Update localStorage with new user data
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        }
        // If payload is invalid, keep existing user data
      })
      .addCase(toggleTwoFactorAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Verify Login OTP
      .addCase(verifyLoginOTP.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyLoginOTP.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        // Tokens are already stored in localStorage by the thunk
      })
      .addCase(verifyLoginOTP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCityStateByZip.pending, (state) => {
        state.locationStatus = 'loading';
        state.locationError = null;
      })
      .addCase(fetchCityStateByZip.fulfilled, (state, action) => {
        state.locationStatus = 'succeeded';
        state.location = action.payload;
        state.locationError = null;
      })
      .addCase(fetchCityStateByZip.rejected, (state, action) => {
        state.locationStatus = 'failed';
        state.locationError = action.payload;
        state.location = {
          city: "",
          state: "",
          zipcode: "",
        };
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        // Clear user data and localStorage
        state.user = null;
        localStorage.removeItem('authUser');
        localStorage.removeItem('authExpiration');
        state.error = null;
        state.form.values = {};
        state.form.errors = {};
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Even if logout API fails, clear local state
        state.user = null;
        localStorage.removeItem('authUser');
        localStorage.removeItem('authExpiration');
        state.form.values = {};
        state.form.errors = {};
      })
  },
});

export const { setFormValue, setFormError, resetForm, clearError, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
