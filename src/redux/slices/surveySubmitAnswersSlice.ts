import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../constants';

export type Answer = {
  question_id: number;
  answer_text: string;
}

export type SurveySubmission = {
  patient_id: number;
  survey_id: number;
  answers: Answer[];
}

type SurveySubmissionResponse = {
  id: number;
};

type PatientRegisterState = {
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: PatientRegisterState = {
  loading: false,
  error: null,
};

// Async thunk for patient registration
export const submitSurveyWithAnswers = createAsyncThunk<
  SurveySubmissionResponse,
  SurveySubmission,
  { rejectValue: string }
>('POST:survey-submission/', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/survey-submission/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue(errorMessage || 'Failed to register patient.');
    }

    return (await response.json()) as SurveySubmissionResponse;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Slice definition
const surveySubmitAnswers = createSlice({
  name: 'surveySubmitAnswers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitSurveyWithAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSurveyWithAnswers.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitSurveyWithAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred while submitting survey.';
      });
  },
});

export default surveySubmitAnswers.reducer;
