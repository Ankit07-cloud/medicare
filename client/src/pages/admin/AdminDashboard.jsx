import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import BloodBank from '../../components/BloodBank';
import API from '../../services/api';
import { Stethoscope, Users, Calendar, Pill, ShieldCheck, Activity, PlusCircle, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Welcome */}
        <div className="bg-slate-900 dark:bg-slate-900/90 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-800 backdrop-blur-sm">
          <div>
            <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Admin Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">MediCare Admin Control</h1>
            <p className="text-xs text-slate-400 mt-1">Hospital management, doctor onboarding, medicine inventory & appointment workflows.</p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/admin/doctors"
              className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs shadow transition-colors"
            >
              + Add Doctor
            </Link>
            <Link
              to="/admin/medicines"
              className="px-4 py-2.5 bg-secondary hover:bg-secondary-dark text-white rounded-xl font-bold text-xs shadow transition-colors"
            >
              + Add Medicine
            </Link>
          </div>
        </div>

        <BloodBank adminMode />

        {/* Analytics Cards */}
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">{stats?.totalDoctors || 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Active Specialists</span>
            </div>

            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">{stats?.totalPatients || 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Registered Patients</span>
            </div>

            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">{stats?.totalAppointments || 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Consultations</span>
            </div>

            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                <Pill className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">{stats?.totalMedicines || 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Pharmacy Stock Types</span>
            </div>
          </div>
        )}

        {/* Quick Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/doctors" className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary dark:hover:border-primary transition-colors flex justify-between items-center backdrop-blur-sm">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Manage Doctors</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Add, update or remove medical staff.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary" />
          </Link>

          <Link to="/admin/patients" className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-secondary dark:hover:border-secondary transition-colors flex justify-between items-center backdrop-blur-sm">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Patient Directory</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">View patient profiles & records.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-secondary" />
          </Link>

          <Link to="/admin/medicines" className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary dark:hover:border-primary transition-colors flex justify-between items-center backdrop-blur-sm">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Manage Pharmacy</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Control inventory stock & pricing.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary" />
          </Link>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;

