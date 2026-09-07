import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentModal from '../components/AppointmentModal';
import { Search, Filter, Stethoscope, CheckCircle } from 'lucide-react';

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSpecialization, setSelectedSpecialization] = useState(searchParams.get('specialization') || 'All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  const specializations = [
    'All',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'General Medicine'
  ];

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialization, searchTerm]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await API.get('/doctors', {
        params: {
          specialization: selectedSpecialization,
          search: searchTerm
        }
      });
      setDoctors(response.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (appointment) => {
    setSelectedDoctor(null);
    setBookingSuccessMsg(`Appointment booked with ${selectedDoctor.name} for ${appointment.date} at ${appointment.timeSlot}!`);
    setTimeout(() => setBookingSuccessMsg(''), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
          Medical Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Find & Book Our Top Specialist Doctors
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Browse certified doctors, view clinical experience, read patient reviews, and schedule instant appointments.
        </p>
      </div>

      {bookingSuccessMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-emerald-800 dark:text-emerald-300 font-medium text-sm flex items-center justify-between shadow">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {bookingSuccessMsg}
          </span>
          <button onClick={() => setBookingSuccessMsg('')} className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Dismiss</button>
        </div>
      )}

      {/* Search & Specialty Filters */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by doctor name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Specialization Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" /> Specialties:
          </span>
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialization(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSpecialization === spec
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading specialists...</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <Stethoscope className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Doctors Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn't find any medical specialists matching your filter query. Try selecting another specialty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onBook={(doctor) => setSelectedDoctor(doctor)}
            />
          ))}
        </div>
      )}

      {/* Appointment Modal */}
      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default Doctors;

