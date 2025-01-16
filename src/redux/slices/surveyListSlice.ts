import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { REST_API_BASE_URL } from '../../constants';

type SurveySummary = {
  title: string;
  slug: string;
};

type SurveySummaryState = {
  data: SurveySummary[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: SurveySummaryState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk to fetch patient details
export const fetchSurveySummaries = createAsyncThunk(
  'survey/',
  async () => {
    const response = await fetch(`${REST_API_BASE_URL}/survey/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return (await response.json()) as SurveySummary[];
  }
);

// Patient detail slice
const surveyList = createSlice({
  name: 'surveyList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveySummaries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchSurveySummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSurveySummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patient details';
      });
  },
});

export default surveyList.reducer;
