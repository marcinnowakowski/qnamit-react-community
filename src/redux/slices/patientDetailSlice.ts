import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../constants';

type PatientDetail = {
  id: number;
  patient_number: string;
  registered_at: Date;
};

type PatientDetailState = {
  data: PatientDetail | null;
  loading: boolean;
  error: string | null;
};

const initialState: PatientDetailState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk to fetch patient details
export const fetchPatientDetail = createAsyncThunk(
  'patient/<patient_number>/',
  async (patientNumber: string) => {
    const response = await fetch(`${API_BASE_URL}/patient/${patientNumber}/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return (await response.json()) as PatientDetail;
  }
);

// Patient detail slice
const patientDetail = createSlice({
  name: 'patientDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchPatientDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatientDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patient details';
      });
  },
});

export default patientDetail.reducer;
