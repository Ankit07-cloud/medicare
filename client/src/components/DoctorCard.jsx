import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock, Award, ArrowRight } from 'lucide-react';

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300 overflow-hidden flex flex-col group backdrop-blur-sm">
      
      {/* Doctor Image Header */}
      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={doctor.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
          alt={doctor.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          {doctor.rating || 4.9} ({doctor.reviewsCount || 120})
        </div>
        <div className="absolute bottom-3 left-3 bg-primary text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          {doctor.specialization}
        </div>
      </div>

      {/* Doctor Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {doctor.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            {doctor.qualification}
          </p>

          <div className="mt-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-secondary" />
                {doctor.experience} Yrs Experience
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-slate-100 text-sm">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹</span>
                {doctor.fees} / Visit
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
              <span className="font-medium">Performance</span>
              <span className="text-slate-900 dark:text-slate-100 font-bold">{doctor.performanceScore?.toFixed(1) || (doctor.rating || 4.9)}</span>
            </div>
          </div>
        </div>

        {/* Available slots indicator */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>Next Available: <strong className="text-slate-800 dark:text-slate-200">Today, 2:00 PM</strong></span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            to={`/doctors/${doctor._id}`}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            View Profile
          </Link>

          <button
            onClick={() => onBook(doctor)}
            className="py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold text-center shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" /> Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

