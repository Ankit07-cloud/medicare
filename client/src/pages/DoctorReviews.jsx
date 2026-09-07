import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { ArrowLeft, Star, Award, MessageCircle, ShieldCheck } from 'lucide-react';

const DoctorReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchDoctor();
  }, [id]);

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
        <h2 className="text-2xl font-bold text-slate-800">Doctor Not Found</h2>
        <button
          onClick={() => navigate('/doctors')}
          className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm"
        >
          Return to Doctors
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={() => navigate(`/doctors/${doctor._id}`)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Doctor Profile
      </button>

      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="flex items-center justify-center">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-100 dark:border-slate-800"
            />
          </div>

          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5" /> {doctor.specialization} Specialist
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">{doctor.name}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{doctor.qualification}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Rating</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {doctor.rating?.toFixed(1) || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Performance</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{doctor.performanceScore?.toFixed(1) || doctor.rating?.toFixed(1) || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Feedback</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{doctor.feedbackCount || doctor.feedback?.length || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Consultation Fee</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹{doctor.fees}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Patient Reviews</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Read full consultation feedback from patients.</p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <MessageCircle className="w-4 h-4 text-primary" /> Verified Patient Reviews
          </div>
        </div>

        {doctor.feedback && doctor.feedback.length > 0 ? (
          <div className="space-y-4">
            {doctor.feedback.slice().reverse().map((item, index) => (
              <div key={index} className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.patientName || 'Patient'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-amber-500 border border-amber-200/60 dark:border-amber-800/40">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {item.rating}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-4">{item.comment || 'No comment provided.'}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-14 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400">
            <MessageCircle className="mx-auto mb-4 w-10 h-10 text-slate-400 dark:text-slate-600" />
            <p className="text-sm font-semibold">No reviews have been submitted for this doctor yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorReviews;

