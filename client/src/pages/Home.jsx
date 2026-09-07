import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import DoctorCard from '../components/DoctorCard';
import MedicineCard from '../components/MedicineCard';
import AppointmentModal from '../components/AppointmentModal';
import API from '../services/api';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Pill,
  TestTube,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

const sampleFeaturedDoctors = [
  {
    _id: 'sample-1',
    name: 'Dr. Aditi Sharma',
    specialization: 'Cardiology',
    qualification: 'MD, FACC',
    experience: 16,
    fees: 1200,
    rating: 4.9,
    reviewsCount: 142,
    performanceScore: 4.8,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400'
  },
  {
    _id: 'sample-2',
    name: 'Dr. Arjun Mehta',
    specialization: 'Orthopedics',
    qualification: 'MBBS, MS Orthopedics',
    experience: 12,
    fees: 950,
    rating: 4.8,
    reviewsCount: 128,
    performanceScore: 4.7,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  },
  {
    _id: 'sample-3',
    name: 'Dr. Kavya Nair',
    specialization: 'Pediatrics',
    qualification: 'MD Pediatrics',
    experience: 10,
    fees: 850,
    rating: 4.9,
    reviewsCount: 118,
    performanceScore: 4.9,
    photo: 'https://images.unsplash.com/photo-1594824813566-78a933758f46?auto=format&fit=crop&q=80&w=400'
  }
];

const Home = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState(sampleFeaturedDoctors);
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');
  const [hasFetchError, setHasFetchError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const doctorsRes = await API.get('/doctors');
      if (doctorsRes.data && doctorsRes.data.length > 0) {
        setFeaturedDoctors(doctorsRes.data.slice(0, 3));
      }

      const medicinesRes = await API.get('/medicines');
      setFeaturedMedicines(medicinesRes.data.slice(0, 4));
    } catch (err) {
      console.log('Error fetching homepage data:', err);
      setHasFetchError(true);
    }
  };

  const handleBookingSuccess = (appointment) => {
    setSelectedDoctor(null);
    setBookingSuccessMsg(`Appointment successfully scheduled for ${appointment.date} at ${appointment.timeSlot}!`);
    setTimeout(() => setBookingSuccessMsg(''), 6000);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Specialist Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Meet Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Doctors by Name & Face
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Browse profiles of our trusted specialists with their pictures, names, and expertise.
          </p>
        </div>

        {hasFetchError && (
          <div className="mb-6 rounded-3xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 p-5 text-amber-900 dark:text-amber-200 text-sm font-medium">
            Doctor preview is showing sample data because the API server is not reachable. Start the backend at <code>http://localhost:5000</code> to load live doctor profiles.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDoctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onBook={(doctor) => setSelectedDoctor(doctor)}
            />
          ))}
        </div>
      </section>

      {/* Booking Success Toast */}
      {bookingSuccessMsg && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-emerald-800 dark:text-emerald-300 font-medium text-sm flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {bookingSuccessMsg}
            </span>
            <button onClick={() => setBookingSuccessMsg('')} className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Dismiss</button>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Our Core Healthcare Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Medical Solutions Under One Roof
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Specialist Consultations',
              desc: 'Book in-person or video checkups with top cardiologists, neurologists, and surgeons.',
              icon: Stethoscope,
              color: 'bg-blue-500',
              link: '/doctors'
            },
            {
              title: 'Doorstep Pharmacy',
              desc: 'Order genuine prescription and OTC medications with guaranteed fast delivery.',
              icon: Pill,
              color: 'bg-teal-500',
              link: '/pharmacy'
            },
            {
              title: 'Diagnostic Lab Tests',
              desc: 'Schedule home sample collection for blood work, MRI scans, and health checkups.',
              icon: TestTube,
              color: 'bg-indigo-500',
              link: '/lab-tests'
            },
            {
              title: 'Emergency 24/7 Care',
              desc: 'Round-the-clock intensive care unit support and immediate ambulance dispatch.',
              icon: HeartPulse,
              color: 'bg-rose-500',
              link: '/contact'
            }
          ].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <Link
                key={idx}
                to={srv.link}
                className="p-6 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className={`w-14 h-14 rounded-2xl ${srv.color} text-white flex items-center justify-center mb-5 shadow-lg shadow-slate-200 dark:shadow-slate-950/50 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                  {srv.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {srv.desc}
                </p>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/20">
              Expert Medical Team
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              Meet Our Specialist Doctors
            </h2>
          </div>
          <Link
            to="/doctors"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors flex items-center gap-2"
          >
            View All Doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDoctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onBook={(doctor) => setSelectedDoctor(doctor)}
            />
          ))}
        </div>
      </section>

      {/* Pharmacy Preview */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                Online Pharmacy Store
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
                Essential Medicines & Wellness Products
              </h2>
            </div>
            <Link
              to="/pharmacy"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-md border border-transparent dark:border-slate-700"
            >
              Shop Pharmacy Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  name: 'MediCare Pharmacy',
                  subtitle: 'Verified online medicine store',
                  badge: 'Trusted',
                  icon: Pill
                },
                {
                  name: 'HealthKart Express',
                  subtitle: 'Fast doorstep delivery',
                  badge: 'Express',
                  icon: Pill
                }
              ].map((store) => {
                const Icon = store.icon;
                return (
                  <div key={store.name} className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex items-start gap-4 backdrop-blur-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{store.name}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{store.subtitle}</p>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          {store.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Shop medicines online with reliable delivery and easy order tracking.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((med) => (
              <MedicineCard key={med._id} medicine={med} />
            ))}
          </div>
        </div>
      </section>

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

export default Home;
