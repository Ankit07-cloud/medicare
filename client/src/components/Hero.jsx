import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ShieldCheck, Stethoscope, Award, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchTerm)}&specialization=${encodeURIComponent(specialization)}`);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-slate-50/20 to-transparent dark:from-slate-950 dark:via-slate-900/40 dark:to-transparent pt-8 pb-20 transition-colors">
      
      {/* Background ambient blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/15 dark:bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/15 dark:bg-secondary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-center lg:max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Trusted Healthcare Management Platform
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mx-auto max-w-4xl">
              Your Health Is Our <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Highest Priority
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Connect with top-rated medical specialists, schedule instant physical or online consultations, order genuine medicines, and manage medical reports with ease.
            </p>

            {/* Quick Search Card */}
            <form 
              onSubmit={handleSearch}
              className="p-3 glass-panel rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-slate-950/60 flex flex-col sm:flex-row gap-3 max-w-2xl"
            >
              <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Doctor name, condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div className="sm:w-48 flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all">
                <Stethoscope className="w-5 h-5 text-primary flex-shrink-0" />
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="All" className="dark:bg-slate-800">All Specialties</option>
                  <option value="Cardiology" className="dark:bg-slate-800">Cardiology</option>
                  <option value="Neurology" className="dark:bg-slate-800">Neurology</option>
                  <option value="Pediatrics" className="dark:bg-slate-800">Pediatrics</option>
                  <option value="Orthopedics" className="dark:bg-slate-800">Orthopedics</option>
                  <option value="Dermatology" className="dark:bg-slate-800">Dermatology</option>
                  <option value="General Medicine" className="dark:bg-slate-800">General Medicine</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 text-sm"
              >
                Find Doctor <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto justify-items-center">
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">50+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Specialist Doctors</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">10k+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Patients Served</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">4.9★</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Patient Rating</span>
              </div>
            </div>

          </motion.div>

          {/* Right Image Feature */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-xl mx-auto lg:mx-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor with patient consultation"
                  className="w-full h-[450px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute top-6 -left-6 glass-panel rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-white/60 dark:border-slate-700/60 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Board Certified</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Top 1% Specialists</span>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-6 -right-6 glass-panel rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-white/60 dark:border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Instant Booking</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Same Day Slots</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;

