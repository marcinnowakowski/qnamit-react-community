import { configureStore } from '@reduxjs/toolkit';
import patientDetailReducer from './slices/patientDetailSlice';
import patientRegisterReducer from './slices/patientRegisterSlice';
import surveyListReducer from './slices/surveyListSlice'

const store = configureStore({
  reducer: {
    patientDetail: patientDetailReducer,
    patientRegister: patientRegisterReducer,
    surveyList: surveyListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;