import React, { useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import { Stethoscope, Award, Phone, CheckCircle } from 'lucide-react';

const DoctorProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fees: user?.fees || 150,
    phone: user?.phone || '+1 555-0100',
    about: user?.about || 'Senior Specialist Physician'
  });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/doctors/${user._id}`, formData);
      setMsg('Doctor Profile details saved successfully!');
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      alert('Failed to save profile');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Doctor Profile & Fees</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage consultation fee structure and bio.</p>
        </div>

        {msg && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {msg}
          </div>
        )}

        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Doctor Name</label>
              <input
                type="text"
                disabled
                value={user?.name || ''}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-not-allowed opacity-80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Consultation Fee (₹ INR)</label>
              <input
                type="number"
                value={formData.fees}
                onChange={(e) => setFormData({ ...formData, fees: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Clinic Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">About / Clinical Bio</label>
              <textarea
                rows={4}
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-md shadow-secondary/20 transition-all"
            >
              Update Doctor Settings
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfile;

