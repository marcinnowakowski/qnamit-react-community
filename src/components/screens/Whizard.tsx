import React, { useState } from 'react';
import './Whizard.css';
import PatientRegister from './PatientRegister';
import SurveySelect from './SurveySelect';
import SurveySubmit from './SurveySubmit';
import SurveyRecap from './SurveyRecap';

const Whizard: React.FC = () => {
  const [selectedPatientNumber, setSelectedPatientNumber] = useState<string | null>(null);
  const [selectedSurveySlug, setSelectedSurveySlug] = useState<string | null>(null);
  const [recapDisplayed, setRecapDisplayed] = useState<boolean | null>(null);

  return (
    <div className="whizard-container">
      {!selectedPatientNumber && <PatientRegister setPatientNumber={setSelectedPatientNumber} />}
      {selectedPatientNumber && !selectedSurveySlug && <SurveySelect 
          patientNumber={selectedPatientNumber} 
          setPatientNumber={setSelectedPatientNumber}
          setSurveySlug={setSelectedSurveySlug}
          />}
      {selectedPatientNumber && selectedSurveySlug && !recapDisplayed && <SurveySubmit
          patientNumber={selectedPatientNumber}
          surveySlug={selectedSurveySlug}
          setPatientNumber={setSelectedPatientNumber}
          setSurveySlug={setSelectedSurveySlug}
          setRecapDisplayed={setRecapDisplayed}
          />}
      {selectedPatientNumber && selectedSurveySlug && recapDisplayed && <SurveyRecap
          patientNumber={selectedPatientNumber}
          surveySlug={selectedSurveySlug}
          setPatientNumber={setSelectedPatientNumber}
          setSurveySlug={setSelectedSurveySlug}
          setRecapDisplayed={setRecapDisplayed}
          />}
    </div>
  );
};

export default Whizard;
