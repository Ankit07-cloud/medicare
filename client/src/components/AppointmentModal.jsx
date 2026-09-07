import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { X, Calendar, Clock, Stethoscope, AlertCircle, CheckCircle } from 'lucide-react';
import PaymentModal from './PaymentModal';

const AppointmentModal = ({ doctor, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState(doctor?.timeSlots?.[0] || '09:00 AM');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  if (!doctor) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in as a patient to book an appointment');
      return;
    }
    if (user.role !== 'patient') {
      setError('Only logged-in patients can book doctor appointments');
      return;
    }
    // Proceed to Payment Demo
    setShowPayment(true);
  };

  const handlePaymentCompleted = async (paymentId) => {
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/appointments', {
        doctorId: doctor._id,
        date,
        timeSlot,
        symptoms: symptoms || 'General Checkup Consultation',
        paymentId
      });

      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete appointment booking');
      setLoading(false);
    }
  };

  if (showPayment) {
    return (
      <PaymentModal
        amount={doctor.fees}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentCompleted}
        doctorName={doctor.name}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 dark:border-slate-800 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Doctor Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={doctor.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20"
          />
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Book Consultation</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{doctor.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{doctor.specialization} • Fee: <strong className="text-emerald-600 dark:text-emerald-400">₹{doctor.fees}</strong></p>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
          
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" /> Select Consultation Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-secondary" /> Select Preferred Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(doctor.timeSlots && doctor.timeSlots.length > 0
                ? doctor.timeSlots
                : ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
              ).map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    timeSlot === slot
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-slate-500 dark:text-slate-400" /> Symptoms / Reason for Visit
            </label>
            <textarea
              rows={3}
              placeholder="Describe your current health concerns or reason for checking in..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
          >
            Proceed to Consultation Fee Payment (₹{doctor.fees})
          </button>
        </form>

      </div>
    </div>
  );
};

export default AppointmentModal;

