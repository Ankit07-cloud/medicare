import React from 'react';
import { Award, ShieldCheck, HeartPulse, Users, CheckCircle2, Clock, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
          About MediCare Hospital System
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pioneering Advanced Healthcare & Patient-Centered Excellence
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          Founded with a commitment to human wellbeing, MediCare combines world-class medical expertise, cutting-edge diagnostic technology, and digital healthcare access for patients across the globe.
        </p>
      </div>

      {/* Hero Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
            alt="MediCare Modern Hospital Facility"
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
            Delivering Compassionate Care Backed By Decades of Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            At MediCare, we believe healthcare should be accessible, transparent, and seamlessly integrated into your daily life. Our multidisciplinary medical teams work round-the-clock to deliver individualized treatment plans.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              'Joint Commission Accredited',
              '24/7 Emergency & ICU',
              'Advanced Robotic Surgery',
              'Electronic Medical Records',
              'Top 10 Healthcare Destination in Nepal',
              '99.4% Patient Satisfaction'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-8 border border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-white">Our Guiding Values</h3>
          <p className="text-slate-400 text-sm">Empowering healthier communities through innovation and integrity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-800/80 dark:bg-slate-900/80 rounded-2xl border border-slate-700/60 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Patient First Always</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every medical decision is tailored to prioritize safety, comfort, and physical and emotional healing.
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 dark:bg-slate-900/80 rounded-2xl border border-slate-700/60 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Clinical Quality & Safety</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Adhering strictly to global healthcare protocols, infection control standards, and evidence-based medicine.
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 dark:bg-slate-900/80 rounded-2xl border border-slate-700/60 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Digital Health Access</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Bridging geographical barriers through telemedicine, digital prescriptions, and online health tracking.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;

