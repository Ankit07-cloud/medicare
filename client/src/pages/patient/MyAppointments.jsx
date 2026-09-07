import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/api';
import { Calendar, Clock, Stethoscope, AlertCircle, CheckCircle, XCircle, Star, MessageCircle } from 'lucide-react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [feedbackData, setFeedbackData] = useState({});
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await API.get('/appointments/my');
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await API.delete(`/appointments/${id}`);
      setMsg('Appointment cancelled successfully.');
      fetchAppointments();
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  const handleFeedbackChange = (id, field, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSubmitFeedback = async (id) => {
    const values = feedbackData[id] || { rating: 5, comment: '' };
    setSubmittingFeedback(id);
    setFeedbackMsg('');

    try {
      await API.post(`/appointments/${id}/feedback`, {
        rating: Number(values.rating || 5),
        comment: values.comment || 'Great consultation and care.'
      });
      setFeedbackMsg('Your feedback has been submitted. Thank you!');
      setFeedbackData((prev) => ({ ...prev, [id]: { rating: 5, comment: '' } }));
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setSubmittingFeedback(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">My Booked Appointments</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track consultation status, doctor details, and payment confirmations.</p>
        </div>

        {msg && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-bold">
            {msg}
          </div>
        )}
        {feedbackMsg && (
          <div className="p-4 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 text-sky-800 dark:text-sky-300 rounded-2xl text-xs font-bold">
            {feedbackMsg}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-2" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Appointments Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">You currently have no scheduled appointments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointments.map((appt) => (
              <div key={appt._id} className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={appt.doctor?.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
                      alt={appt.doctor?.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{appt.doctor?.name}</h3>
                      <p className="text-xs font-semibold text-primary">{appt.doctor?.specialization}</p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    appt.status === 'Approved'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                      : appt.status === 'Rejected' || appt.status === 'Cancelled'
                      ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                  }`}>
                    {appt.status}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Date & Slot:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{appt.date} ({appt.timeSlot})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Symptoms:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{appt.symptoms || 'General Consultation'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Payment Status:</span>
                    <strong className={appt.feePaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                      {appt.feePaid ? 'Paid Online' : 'Pending'}
                    </strong>
                  </div>
                </div>

                {appt.prescription && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60 rounded-2xl text-xs space-y-1">
                    <span className="font-bold text-primary block">Doctor Notes / Prescription:</span>
                    <p className="text-slate-700 dark:text-slate-300">{appt.prescription}</p>
                  </div>
                )}

                {appt.status === 'Completed' && !appt.reviewed && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <MessageCircle className="w-4 h-4 text-primary" /> Share feedback for this visit
                    </div>
                    <div className="grid gap-3">
                      <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Rating</label>
                      <select
                        value={(feedbackData[appt._id]?.rating ?? 5).toString()}
                        onChange={(e) => handleFeedbackChange(appt._id, 'rating', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {[5, 4, 3, 2, 1].map((value) => (
                          <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      <textarea
                        rows={3}
                        placeholder="Leave a short review about your consultation..."
                        value={feedbackData[appt._id]?.comment || ''}
                        onChange={(e) => handleFeedbackChange(appt._id, 'comment', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        onClick={() => handleSubmitFeedback(appt._id)}
                        disabled={submittingFeedback === appt._id}
                        className="w-full py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-md"
                      >
                        {submittingFeedback === appt._id ? 'Submitting...' : 'Submit Feedback'}
                      </button>
                    </div>
                  </div>
                )}

                {appt.reviewed && appt.review && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl text-sm text-slate-800 dark:text-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold">Your review</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-amber-500" /> {appt.review.rating}
                      </span>
                    </div>
                    <p>{appt.review.comment}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Reviewed on {new Date(appt.review.date).toLocaleDateString()}</p>
                  </div>
                )}

                {appt.status !== 'Cancelled' && appt.status !== 'Rejected' && (
                  <button
                    onClick={() => handleCancel(appt._id)}
                    className="w-full py-2.5 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyAppointments;

