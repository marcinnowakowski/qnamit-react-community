import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { registerPatient, } from '../redux/slices/patientRegisterSlice';
import './PatientRegister.css';

type PatientNumberInputProps = {
  setPatientNumber: (patientNumber: string | null) => void;
};

const PatientNumberInput: React.FC<PatientNumberInputProps> = ({ setPatientNumber }) => {
  const [patientNumber, setLocalPatientNumber] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {error: registerError} = useSelector((state: RootState) => state.patientRegister);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    if (!patientNumber.trim()) {
      setInputError('Patient number is required.');
      return;
    }

    // Clear existing input errors
    setInputError(null);

    const actionRegisterPatient = await dispatch(registerPatient({ patient_number: patientNumber }));
    if (!registerPatient.fulfilled.match(actionRegisterPatient)) {
      return;
    }
    
    setPatientNumber(patientNumber); // Pass the patient number to parent component
  };

  return (
    <div className="patient-number-input">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientNumber">Patient Number: </label>
          <input
            type="text"
            id="patientNumber"
            value={patientNumber}
            onChange={(e) => setLocalPatientNumber(e.target.value)}
            placeholder="Enter patient number"
          />
        </div>
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default PatientNumberInput;
