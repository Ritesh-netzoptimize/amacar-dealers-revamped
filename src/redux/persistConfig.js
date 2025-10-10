// redux/persistConfig.js
import storage from 'redux-persist/lib/storage'; // localStorage

export const userPersistConfig = {
  key: 'user',               // storage key prefix
  storage,
  whitelist: [
    'user', 
    'status', 
    'subscription', 
    'billing',
    'subscriptionLoading',
    'subscriptionError',
    'billingLoading',
    'billingError',
    'uploadProfilePictureLoading',
    'uploadProfilePictureError',
    'removeProfilePictureLoading',
    'removeProfilePictureError'
  ] // persist all user-related state
};