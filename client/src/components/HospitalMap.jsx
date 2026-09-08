import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';

const hospitalBranches = [
  {
    id: 1,
    city: 'Kathmandu (Top 10 Healthcare Hub)',
    address: 'MediCare Plaza, Kathmandu, Nepal — Top 10 healthcare destination in Nepal',
    phone: '+977 1 4590 1100',
    hours: '24 Hours Emergency & Trauma Unit',
    lat: 27.7172,
    lng: 85.3240,
    embedUrl: 'https://maps.google.com/maps?q=Kathmandu+Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 2,
    city: 'Pokhara (Gandaki Regional Unit)',
    address: 'MediCare Lakeside, Pokhara, Gandaki Province, Nepal',
    phone: '+977 61 550 4400',
    hours: '24 Hours OPD & In-Patient Facility',
    lat: 28.2096,
    lng: 83.9856,
    embedUrl: 'https://maps.google.com/maps?q=Pokhara+Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 3,
    city: 'Biratnagar (Koshi Regional Unit)',
    address: 'MediCare Koshi Center, Biratnagar, Koshi Province, Nepal',
    phone: '+977 21 520 8800',
    hours: '24 Hours Super-Specialty Center',
    lat: 26.4525,
    lng: 87.2718,
    embedUrl: 'https://maps.google.com/maps?q=Biratnagar+Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed'
  }
];

const HospitalMap = () => {
  const [selectedBranch, setSelectedBranch] = useState(hospitalBranches[0]);

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Interactive Hospital Location Map
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Locate MediCare Hospitals & Clinics
          </h3>
        </div>

        {/* Branch Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {hospitalBranches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedBranch.id === branch.id
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {branch.city.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Branch Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> {selectedBranch.city}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {selectedBranch.address}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="font-bold">{selectedBranch.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-primary" />
                <span>{selectedBranch.hours}</span>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Get Live Driving Directions <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Map Embed Frame */}
        <div className="lg:col-span-7 h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-800">
          <iframe
            title={`MediCare Hospital Location - ${selectedBranch.city}`}
            src={selectedBranch.embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

      </div>

    </div>
  );
};

export default HospitalMap;

