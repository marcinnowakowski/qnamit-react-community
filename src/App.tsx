import React, { useState } from 'react';
import PatientNumberInput from './components/PatientRegister';
import SurveySelect from './components/SurveySelect';
import SurveySubmit from './components/SurveySubmit';
import SurveyRecap from './components/SurveyRecap';

const App: React.FC = () => {
  const [selectedPatientNumber, setSelectedPatientNumber] = useState<string | null>(null);
  const [selectedSurveySlug, setSelectedSurveySlug] = useState<string | null>(null);
  const [recapDisplayed, setRecapDisplayed] = useState<boolean | null>(null);

  return (
    <div>

      {!selectedPatientNumber && <PatientNumberInput setPatientNumber={setSelectedPatientNumber} />}
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

export default App;
