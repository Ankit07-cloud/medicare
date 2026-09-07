import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import { Calendar, CheckCircle2, XCircle, FileText, User, Clock, AlertCircle, Award, MessageCircle, Truck } from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePrescriptionId, setActivePrescriptionId] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [doctorProfile, setDoctorProfile] = useState(null);

  useEffect(() => {
    fetchAppointments();
    if (user?._id) {
      fetchDoctorProfile();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/doctor');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching doctor appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorProfile = async () => {
    try {
      const res = await API.get(`/doctors/${user._id}`);
      setDoctorProfile(res.data);
    } catch (err) {
      console.error('Error fetching doctor profile:', err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSavePrescription = async (id) => {
    try {
      await API.put(`/appointments/${id}/status`, {
        prescription: prescriptionText,
        status: 'Completed'
      });
      setActivePrescriptionId(null);
      setPrescriptionText('');
      fetchAppointments();
    } catch (err) {
      alert('Failed to save prescription');
    }
  };

  const sampleDeliveryOrder = {
    orderNumber: 'MC-90421',
    patientName: 'Mr. Rajesh Kumar',
    store: 'MediCare Pharmacy',
    status: 'Out for delivery',
    eta: 'Today, 6:00 PM',
    progress: [
      { label: 'Order received', done: true },
      { label: 'Medication packed', done: true },
      { label: 'Out for delivery', done: false },
      { label: 'Delivered', done: false }
    ]
  };

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const approvedCount = appointments.filter(a => a.status === 'Approved').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const performanceScore = doctorProfile?.performanceScore ?? user?.performanceScore ?? 4.8;
  const feedbackCount = doctorProfile?.feedbackCount ?? doctorProfile?.feedback?.length ?? 0;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-sm">
          <div>
            <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              Doctor Clinical Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Welcome, {user?.name || 'Doctor'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Specialization: <strong className="text-slate-800 dark:text-slate-200">{user?.specialization || 'Consultant'}</strong></p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">{appointments.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Patient Queue</span>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <span className="block text-3xl font-extrabold text-amber-500">{pendingCount}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending Requests</span>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <span className="block text-3xl font-extrabold text-emerald-500">{approvedCount}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Confirmed Consultations</span>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">{performanceScore?.toFixed(1)}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Doctor Performance</span>
          </div>
        </div>

        {/* Delivery Tracker */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                Delivery Tracker
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3">Current Pharmacy Order</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Monitor the current medicine delivery for your patient.</p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-6 border border-slate-200 dark:border-slate-700/60 space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em]">Order</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{sampleDeliveryOrder.orderNumber}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>{sampleDeliveryOrder.store}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{sampleDeliveryOrder.status}</span>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Estimated arrival</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white">{sampleDeliveryOrder.eta}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white dark:bg-slate-900/80 p-6 border border-slate-200 dark:border-slate-700/60 space-y-3">
              {sampleDeliveryOrder.progress.map((step) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className={`h-3.5 w-3.5 rounded-full ${step.done ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  <span className={`text-sm ${step.done ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Appointment List */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Patient Appointments Management</h3>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-sm">No patient requests assigned yet.</div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt._id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{appt.patient?.name || 'Patient'}</h4>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          ({appt.patient?.gender || 'N/A'}, {appt.patient?.age || '30'} yrs)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Phone: {appt.patient?.phone} • Blood: <strong className="text-slate-800 dark:text-slate-200">{appt.patient?.bloodGroup}</strong>
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Slot: <strong>{appt.date} at {appt.timeSlot}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        appt.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                          : appt.status === 'Rejected'
                          ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60'
                          : appt.status === 'Completed'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                      }`}>
                        {appt.status}
                      </span>

                      {appt.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(appt._id, 'Approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appt._id, 'Rejected')}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <strong>Symptoms / Chief Concern:</strong> {appt.symptoms || 'General Checkup'}
                  </div>

                  {appt.prescription ? (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-200">
                      <strong>Prescription Provided:</strong> {appt.prescription}
                    </div>
                  ) : (
                    <div>
                      {activePrescriptionId === appt._id ? (
                        <div className="space-y-2 pt-2">
                          <textarea
                            rows={3}
                            placeholder="Type medical prescription, advice, dosage..."
                            value={prescriptionText}
                            onChange={(e) => setPrescriptionText(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSavePrescription(appt._id)}
                              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                            >
                              Save Prescription & Complete Visit
                            </button>
                            <button
                              onClick={() => setActivePrescriptionId(null)}
                              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActivePrescriptionId(appt._id);
                            setPrescriptionText(appt.prescription || '');
                          }}
                          className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-transparent dark:border-slate-700 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" /> Add Prescription
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;

