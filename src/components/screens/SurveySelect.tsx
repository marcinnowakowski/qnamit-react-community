import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientDetail } from '../../redux/slices/patientDetailSlice';
import { fetchSurveySummaries } from '../../redux/slices/surveyListSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './SurveySelect.css';

type SurveySelectProps = {
  patientNumber: string;
  setPatientNumber: (patientNumber: string | null) => void;
  setSurveySlug: (surveySlug: string | null) => void;
};

const SurveySelect: React.FC<SurveySelectProps> = ({ patientNumber, setPatientNumber, setSurveySlug }) => {
  const [selectedSurveySlug, setSelectedSurveySlug] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data: patientData, loading: patientLoading, error: patientError } = useSelector((state: RootState) => state.patientDetail);
  const { data: surveysData, loading: surveysLoading, error: surveysError } = useSelector((state: RootState) => state.surveyList);

  useEffect(() => {
    dispatch(fetchPatientDetail(patientNumber));
  }, [dispatch, patientNumber]);

  useEffect(() => {
    dispatch(fetchSurveySummaries());
  }, [dispatch]);

  // Format the `registered_at` field
  const formatDateTime = (dateString: Date | string): string => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    if (!selectedSurveySlug) {
      setInputError('Please select a survey.');
      return;
    }

    // Clear existing input errors
    setInputError(null);
    setSurveySlug(selectedSurveySlug); // Pass the survey slug to the parent component
  };

  const handleOtherPatient = () => {
    setPatientNumber(null);
  };

  if (patientLoading) return <p>Loading patient details...</p>;
  if (patientError) return <p>Error: {patientError}</p>;
  if (!patientData) return <p>No patient details available.</p>;

  if (surveysLoading) return <p>Loading surveys...</p>;
  if (surveysError) return <p>Error: {surveysError}</p>;
  if (!surveysData) return <p>No surveys available.</p>;

  return (
    <div className="select-survey">
      <h2>Patient Details</h2>
      <p><strong>Number:</strong> {patientData.patient_number}</p>
      <p><strong>Registered At:</strong> {formatDateTime(patientData.registered_at)}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="surveySlug">Select survey: </label>
          <select
            id="surveySlug"
            value={selectedSurveySlug}
            onChange={(e) => setSelectedSurveySlug(e.target.value)}
          >
            <option value="" disabled>
              -- Select a survey --
            </option>
            {surveysData.map((survey) => (
              <option key={survey.slug} value={survey.slug}>
                {survey.title}
              </option>
            ))}
          </select>
        </div>
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        <button type="submit">Select Survey</button>
        <button type="button" onClick={handleOtherPatient}>
          Other Patient
        </button>
      </form>
    </div>
  );
};

export default SurveySelect;
