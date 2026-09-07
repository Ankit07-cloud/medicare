import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/api';
import { Calendar, Trash2 } from 'lucide-react';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/appointments/${id}/status`, { status: newStatus });
      fetchAppointments();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Hospital Appointment Bookings</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Master view of all patient-doctor consultation schedules.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">No appointments scheduled.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <tr>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Date & Slot</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{appt.patient?.name || 'Patient'}</td>
                      <td className="p-3 font-semibold text-primary">{appt.doctor?.name || 'Doctor'}</td>
                      <td className="p-3 text-xs text-slate-500 dark:text-slate-400">{appt.date} ({appt.timeSlot})</td>
                      <td className="p-3 font-bold text-xs">
                        <span className={appt.feePaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                          {appt.feePaid ? 'Paid Online' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={appt.status}
                          onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewAppointments;

