import React, { useState } from 'react';
import PatientNumberInput from './components/PatientRegister';
import PatientDetail from './components/PatientDetail';

const App: React.FC = () => {
  const [selectedPatientNumber, setSelectedPatientNumber] = useState<string | null>(null);

  return (
    <div>

      {!selectedPatientNumber && <PatientNumberInput setPatientNumber={setSelectedPatientNumber} />}
      {selectedPatientNumber && <PatientDetail patient_number={selectedPatientNumber} setPatientNumber={setSelectedPatientNumber} />}
    </div>
  );
};

export default App;
