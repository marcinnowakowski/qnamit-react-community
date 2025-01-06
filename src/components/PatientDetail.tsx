import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientDetail } from '../redux/apiSlice/patientDetailSlice';
import { RootState, AppDispatch } from '../redux/store';
import './PatientDetail.css';

type PatientDetailProps = {
  patient_number: string;
  setPatientNumber: (patientNumber: string | null) => void;
};

const PatientDetail: React.FC<PatientDetailProps> = ({ patient_number, setPatientNumber }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.patientDetail);

  useEffect(() => {
    dispatch(fetchPatientDetail(patient_number));
  }, [dispatch, patient_number]);

  if (loading) return <p>Loading patient details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No details available.</p>;

  // Format the `registered_at` field
  const formatDateTime = (dateString: Date | string): string => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleOtherPatient = () => {
    setPatientNumber(null);
  };

  return (
    <div className="patient-detail">
      <h2>Patient Details</h2>
      <p><strong>Number:</strong> {data.patient_number}</p>
      <p><strong>Registered At:</strong> {formatDateTime(data.registered_at)}</p>
      <br></br>
      <button onClick={handleOtherPatient}>Other Patient</button>
    </div>
  );
};

export default PatientDetail;
