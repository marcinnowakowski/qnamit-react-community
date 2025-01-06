import { configureStore } from '@reduxjs/toolkit';
import patientDetailReducer from './apiSlice/patientDetailSlice';
import patientRegisterReducer from './apiSlice/patientRegisterSlice';

const store = configureStore({
  reducer: {
    patientDetail: patientDetailReducer,
    patientRegister: patientRegisterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;