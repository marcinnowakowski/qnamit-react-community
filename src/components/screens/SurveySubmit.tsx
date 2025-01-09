import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientDetail } from '../../redux/slices/patientDetailSlice';
import { fetchSurveyWithQuestions, Question } from '../../redux/slices/surveyWithQuestionsSlice';
import { submitSurveyWithAnswers, SurveySubmission, Answer } from '../../redux/slices/surveySubmitAnswersSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './SurveySubmit.css';

type SurveySubmitProps = {
  patientNumber: string;
  surveySlug: string;
  setPatientNumber: (patientNumber: string | null) => void;
  setSurveySlug: (surveySlug: string | null) => void;
  setRecapDisplayed: (recapDisplayed: boolean | null) => void;
};

const SurveySubmit: React.FC<SurveySubmitProps> = ({ patientNumber, surveySlug, setPatientNumber, setSurveySlug, setRecapDisplayed }) => {
  const [rawAnswers, setRawAnswers] = useState<{ [key: string]: string }>({});
  const [inputError, setInputError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data: patientData, loading: patientLoading, error: patientError } = useSelector((state: RootState) => state.patientDetail);
  const { data: surveyData, loading: surveyLoading, error: surveyError } = useSelector((state: RootState) => state.surveyWithQuestions);
  const { error: submitAnswersError } = useSelector((state: RootState) => state.surveySubmitAnswers);

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

  const handleAnswerChange = (questionId: string, value: string) => {
    setRawAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all answers
    const unanswered = Object.entries(rawAnswers).filter((entry) => !entry[1]);
    if (unanswered.length > 0) {
      setInputError('Please answer all questions.');
      return;
    }

    if(!surveyData) {
      setInputError('Survey setup incorrectly loaded. Please start again');
      return;
    }

    if(!patientData) {
      setInputError('Patient data incorrectly loaded. Please start again');
      return;
    }

    const transformedAnswers: Answer[] = Object.entries(rawAnswers).map(([key, value]) => ({
      question_id: Number(key),
      answer_text: value,
    }));

    const surveySubmission: SurveySubmission = {
      patient_id: patientData.id,
      survey_id: surveyData.survey.id,
      answers: transformedAnswers
    }

    const actionRegisterPatient = await dispatch(submitSurveyWithAnswers(surveySubmission));
    if (!submitSurveyWithAnswers.fulfilled.match(actionRegisterPatient)) {
      return;
    }

    setInputError(null);
    setRecapDisplayed(true)
  };

  const handleOtherSurvey = () => {
    setSurveySlug(null)
  };

  const handleOtherPatient = () => {
    setSurveySlug(null)
    setPatientNumber(null);
  };

  if (patientLoading) return <p>Loading patient details...</p>;
  if (patientError) return <p>Error: {patientError}</p>;
  if (!patientData) return <p>No patient details available.</p>;

  if (surveyLoading) return <p>Loading survey with questions...</p>;
  if (surveyError) return <p>Error: {surveyError}</p>;
  if (!surveyData) return <p>No survey with questions available.</p>;

  return (
    <div className="survey-submit">
      <h2>Patient Details</h2>
      <p><strong>Number:</strong> {patientData.patient_number}</p>
      <p><strong>Registered At:</strong> {formatDateTime(patientData.registered_at)}</p>
      <br></br>
      
      <h2>{surveyData.survey.title}</h2>
      <p>{surveyData.survey.description}</p>
      <br></br>

      <form onSubmit={handleSubmit}>
        {surveyData.questions.map((question: Question) => (
          <div key={question.id} className="question-item">
            <label htmlFor={`question-${question.id}`}>{question.question_text}</label>
            <input
              type="text"
              id={`question-${question.id}`}
              value={rawAnswers[question.id] || ''}
              onChange={(e) => handleAnswerChange("" + question.id, e.target.value)}
              placeholder="Enter your answer"
              required
            />
          </div>
        ))}

        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        {submitAnswersError && <p style={{ color: 'red' }}>{submitAnswersError}</p>}

        <button type="submit">Submit Survey</button>
        <button type="button" onClick={handleOtherSurvey}>Other Survey</button>
        <button type="button" onClick={handleOtherPatient}>Other Patient</button>
      </form>
    </div>
  );
};

export default SurveySubmit;
