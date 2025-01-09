import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientDetail } from '../../redux/slices/patientDetailSlice';
import { fetchSurveyWithQuestions } from '../../redux/slices/surveyWithQuestionsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './SurveyRecap.css';

type SurveyRecapProps = {
  patientNumber: string;
  surveySlug: string;
  setPatientNumber: (patientNumber: string | null) => void;
  setSurveySlug: (surveySlug: string | null) => void;
  setRecapDisplayed: (recapDisplayed: boolean | null) => void;
};

const SurveyRecap: React.FC<SurveyRecapProps> = ({ patientNumber, surveySlug, setPatientNumber, setSurveySlug, setRecapDisplayed }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: patientData, loading: patientLoading, error: patientError } = useSelector((state: RootState) => state.patientDetail);
  const { data: surveyData, loading: surveyLoading, error: surveyError } = useSelector((state: RootState) => state.surveyWithQuestions);

  useEffect(() => {
    dispatch(fetchPatientDetail(patientNumber));
  }, [dispatch, patientNumber]);

  useEffect(() => {
    dispatch(fetchSurveyWithQuestions(surveySlug));
  }, [dispatch, surveySlug]);

  // Format the `registered_at` field
  const formatDateTime = (dateString: Date | string): string => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleRepeatSurvey = () => {
    setRecapDisplayed(null);
  };

  const handleOtherSurvey = () => {
    setSurveySlug(null);
    setRecapDisplayed(null);
  };

  const handleOtherPatient = () => {
    setSurveySlug(null);
    setPatientNumber(null);
    setRecapDisplayed(null);
  };

  if (patientLoading) return <p>Loading patient details...</p>;
  if (patientError) return <p>Error: {patientError}</p>;
  if (!patientData) return <p>No patient details available.</p>;

  if (surveyLoading) return <p>Loading survey with questions...</p>;
  if (surveyError) return <p>Error: {surveyError}</p>;
  if (!surveyData) return <p>No survey with questions available.</p>;

  return (
    <div className="survey-recap">
      <h2>Patient Details</h2>
      <p><strong>Number:</strong> {patientData.patient_number}</p>
      <p><strong>Registered At:</strong> {formatDateTime(patientData.registered_at)}</p>
      <br></br>
      
      <h2>{surveyData.survey.title}</h2>
      <p>{surveyData.survey.description}</p>
      <br></br>

      <h2>Submission status</h2>
      <p>Survey submitted sucessfully.</p>

      <button type="button" onClick={handleRepeatSurvey}>Repeat Survey</button>
      <button type="button" onClick={handleOtherSurvey}>Other Survey</button>
      <button type="button" onClick={handleOtherPatient}>Other Patient</button>
    </div>
  );
};

export default SurveyRecap;
