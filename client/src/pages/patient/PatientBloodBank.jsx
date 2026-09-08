import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import BloodBank from '../../components/BloodBank';
import API from '../../services/api';
import { CalendarDays, CheckCircle, Clock3, Droplet, FileText, Upload, XCircle } from 'lucide-react';

const initialForm = {
  bloodGroup: '',
  appointmentDate: '',
  timeSlot: '09:00 AM - 11:00 AM',
  quantity: 1,
  reason: ''
};

const requestStatusStyles = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
  Approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300',
  Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300',
  Cancelled: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
};

const PatientBloodBank = () => {
  const [form, setForm] = useState(initialForm);
  const [prescription, setPrescription] = useState(null);
  const [medicalReport, setMedicalReport] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await API.get('/blood-requests/my');
      setRequests(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Unable to load your blood requests.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGroupSelect = ({ group }) => {
    setForm((current) => ({ ...current, bloodGroup: group }));
    window.scrollTo({ top: 360, behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (prescription) payload.append('prescription', prescription);
      if (medicalReport) payload.append('medicalReport', medicalReport);

      await API.post('/blood-requests', payload);
      setForm(initialForm);
      setPrescription(null);
      setMedicalReport(null);
      document.getElementById('prescription-file').value = '';
      document.getElementById('medical-report-file').value = '';
      setMessage({ type: 'success', text: 'Blood appointment request submitted successfully.' });
      fetchRequests();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Unable to submit your blood request.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest bg-rose-100 dark:bg-rose-950/50 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800/60">Blood Bank Services</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">Book a blood appointment</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">Choose your required blood group, schedule a visit, and attach your prescription or medical report for faster coordination.</p>
        </div>

        <BloodBank onGroupSelect={handleGroupSelect} />

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center"><Droplet className="w-5 h-5" /></div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Request blood support</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Click a blood group above to select it.</p>
              </div>
            </div>

            {message.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'}`}>
                {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Blood Group
                <select required value={form.bloodGroup} onChange={(event) => setForm({ ...form, bloodGroup: event.target.value })} className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium">
                  <option value="">Select group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => <option key={group} value={group}>{group}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity (units)
                <input required type="number" min="1" max="10" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </label>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Appointment date
                <input required type="date" min={new Date().toISOString().split('T')[0]} value={form.appointmentDate} onChange={(event) => setForm({ ...form, appointmentDate: event.target.value })} className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </label>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Time slot
                <select required value={form.timeSlot} onChange={(event) => setForm({ ...form, timeSlot: event.target.value })} className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                  <option>09:00 AM - 11:00 AM</option>
                  <option>12:00 PM - 02:00 PM</option>
                  <option>03:00 PM - 05:00 PM</option>
                  <option>06:00 PM - 08:00 PM</option>
                </select>
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Reason / medical need
              <textarea required maxLength="500" rows="4" value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} placeholder="Tell us why blood support is needed..." className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none" />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer hover:border-primary">
                <span className="flex items-center gap-2"><Upload className="w-4 h-4 text-primary" /> Prescription</span>
                <input id="prescription-file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setPrescription(event.target.files[0] || null)} className="mt-3 w-full text-xs" />
                <span className="block mt-2 text-[11px] font-normal text-slate-500">PDF, JPG or PNG up to 5 MB</span>
              </label>
              <label className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer hover:border-primary">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Medical report</span>
                <input id="medical-report-file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setMedicalReport(event.target.files[0] || null)} className="mt-3 w-full text-xs" />
                <span className="block mt-2 text-[11px] font-normal text-slate-500">PDF, JPG or PNG up to 5 MB</span>
              </label>
            </div>

            <button disabled={submitting} type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold disabled:opacity-60">
              <CalendarDays className="w-4 h-4" /> {submitting ? 'Submitting request...' : 'Book Blood Appointment'}
            </button>
          </form>

          <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">My blood requests</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track booking status and uploaded documents.</p>
              </div>
              <Clock3 className="w-5 h-5 text-secondary" />
            </div>
            {loading ? <p className="py-8 text-center text-sm text-slate-500">Loading requests...</p> : requests.length === 0 ? <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">No blood appointments yet.</p> : (
              <div className="space-y-3">
                {requests.map((request) => (
                  <div key={request._id} className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{request.bloodGroup} · {request.quantity} unit{request.quantity === 1 ? '' : 's'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{request.appointmentDate} · {request.timeSlot}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${requestStatusStyles[request.status] || requestStatusStyles.Pending}`}>{request.status}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{request.reason}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {request.prescriptionFile?.originalName && <span className="inline-flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Prescription attached</span>}
                      {request.medicalReportFile?.originalName && <span className="inline-flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Report attached</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default PatientBloodBank;
