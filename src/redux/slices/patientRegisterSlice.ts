import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { REST_API_BASE_URL } from '../../constants';

// Define the patient registration response type
type RegisterResponse = {
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
export const registerPatient = createAsyncThunk<
  RegisterResponse,
  { patient_number: string },
  { rejectValue: string }
>('POST:patient/', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch(`${REST_API_BASE_URL}/patient/`, {
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

    return (await response.json()) as RegisterResponse;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Slice definition
const patientRegister = createSlice({
  name: 'patientRegister',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred while registering the patient.';
      });
  },
});

export default patientRegister.reducer;
