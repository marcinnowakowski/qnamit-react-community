import React, { useState } from 'react';
import PatientNumberInput from './components/PatientRegister';
import SurveySelect from './components/SurveySelect';

const App: React.FC = () => {
  const [selectedPatientNumber, setSelectedPatientNumber] = useState<string | null>(null);
  const [selectedSurveySlug, setSelectedSurveySlug] = useState<string | null>(null);

  return (
    <div>

      {!selectedPatientNumber && <PatientNumberInput setPatientNumber={setSelectedPatientNumber} />}
      {selectedPatientNumber && <SurveySelect 
          patient_number={selectedPatientNumber} 
          setPatientNumber={setSelectedPatientNumber}
          setSurveySlug={setSelectedSurveySlug}
          />}
      {selectedPatientNumber && selectedSurveySlug && <SurveySubmission/>}
    </div>
  );
};

export default App;
