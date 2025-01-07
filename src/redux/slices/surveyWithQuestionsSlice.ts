import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../constants';

type Survey = {
  id: number
  title: string;
  description: string;
  slug: string
};

export type Question = {
  id: number
  title: string;
  question_text: string;
}

type SurveyWithQuestions = {
  survey: Survey;
  questions: Question[];
};

type SurveySummaryState = {
  data: SurveyWithQuestions | null;
  loading: boolean;
  error: string | null;
};

const initialState: SurveySummaryState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk to fetch patient details
export const fetchSurveyWithQuestions = createAsyncThunk(
  'survey/<slug>',
  async (slug: string) => {
    const response = await fetch(`${API_BASE_URL}/survey/${slug}/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return (await response.json()) as SurveyWithQuestions;
  }
);

// Patient detail slice
const surveyWithQuestions = createSlice({
  name: 'surveyWithQuestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyWithQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchSurveyWithQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSurveyWithQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patient details';
      });
  },
});

export default surveyWithQuestions.reducer;
