import React from 'react';
import Sidebar from '../../components/Sidebar';
import Doctors from '../Doctors';

const PatientBookAppointment = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Doctors />
      </main>
    </div>
  );
};

export default PatientBookAppointment;
