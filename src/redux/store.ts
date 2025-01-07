import { configureStore } from '@reduxjs/toolkit';
import patientDetailReducer from './slices/patientDetailSlice';
import patientRegisterReducer from './slices/patientRegisterSlice';
import surveyListReducer from './slices/surveyListSlice'
import surveyWithQuestionsReducer from './slices/surveyWithQuestionsSlice'
import surveySubmitAnswersReducer from './slices/surveySubmitAnswersSlice'

const store = configureStore({
  reducer: {
    patientDetail: patientDetailReducer,
    patientRegister: patientRegisterReducer,
    surveyList: surveyListReducer,
    surveyWithQuestions: surveyWithQuestionsReducer,
    surveySubmitAnswers: surveySubmitAnswersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;