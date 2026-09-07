import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import AppointmentModal from '../components/AppointmentModal';
import { Star, Award, Calendar, Phone, Mail, Clock, CheckCircle, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await API.get(`/doctors/${id}`);
      setDoctor(response.data);
    } catch (err) {
      console.error('Error fetching doctor details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (appointment) => {
    setShowBookingModal(false);
    setBookingSuccessMsg(`Appointment booked successfully for ${appointment.date} at ${appointment.timeSlot}!`);
    setTimeout(() => setBookingSuccessMsg(''), 6000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Doctor Profile Not Found</h2>
        <button onClick={() => navigate('/doctors')} className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm">
          Return to Doctors Directory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <button
        onClick={() => navigate('/doctors')}
        className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Doctor Directory
      </button>

      {bookingSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-medium text-sm flex items-center justify-between shadow">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            {bookingSuccessMsg}
          </span>
          <button onClick={() => setBookingSuccessMsg('')} className="text-xs font-bold text-emerald-700">Dismiss</button>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center backdrop-blur-sm">
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 shadow border border-slate-200/50 dark:border-slate-700/50">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {doctor.rating || 4.9} ({doctor.reviewsCount || 120})
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2">
              {doctor.specialization} Specialist
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{doctor.name}</h1>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">{doctor.qualification}</p>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {doctor.about || 'Senior specialist providing patient-centered healthcare consultations, diagnostic evaluations, and medical treatments.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
              <span className="block text-xs text-slate-400 dark:text-slate-400 font-medium">Experience</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">{doctor.experience} Years</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
              <span className="block text-xs text-slate-400 dark:text-slate-400 font-medium">Consultation Fee</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">₹{doctor.fees}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
              <span className="block text-xs text-slate-400 dark:text-slate-400 font-medium">Performance Score</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">{doctor.performanceScore?.toFixed(1) || (doctor.rating || 4.9)}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
              <span className="block text-xs text-slate-400 dark:text-slate-400 font-medium">Patient Feedback</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">{doctor.feedbackCount || doctor.feedback?.length || 0}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Appointment Now
            </button>
            <button
              onClick={() => navigate(`/doctors/${doctor._id}/reviews`)}
              className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold rounded-xl text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> View All Reviews
            </button>
          </div>
        </div>
      </div>

      {doctor.feedback && doctor.feedback.length > 0 && (
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Patient Feedback</h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Showing latest reviews</span>
          </div>
          <div className="grid gap-4">
            {doctor.feedback.slice(-3).reverse().map((item, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.patientName || 'Patient'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-xs text-amber-500 font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500" /> {item.rating}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">{item.comment || 'No additional comments provided.'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showBookingModal && (
        <AppointmentModal
          doctor={doctor}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default DoctorDetails;
