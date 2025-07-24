import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import userManagementReducer from './Admin/userManagementSlice';
import programReducer from './Admin/programSlice';
import { apiSlice } from './apiSlice';
import { userManagementApi } from './Admin/userManagementApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userManagementReducer,
    program: programReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(userManagementApi.middleware),
});