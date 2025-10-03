// redux/persistConfig.js
import storage from 'redux-persist/lib/storage'; // localStorage

export const userPersistConfig = {
  key: 'user',               // storage key prefix
  storage,
  whitelist: ['user', 'status'] // persist user data and status
};