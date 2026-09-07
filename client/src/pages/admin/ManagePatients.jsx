import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/api';
import { Users, Trash2 } from 'lucide-react';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await API.get('/admin/patients');
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete patient record?')) return;
    try {
      await API.delete(`/admin/patients/${id}`);
      fetchPatients();
    } catch (err) {
      alert('Failed to remove patient');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Patient Registry Directory</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">View registered patients, contact info, and medical profiles.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">No registered patients found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <tr>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Blood Group</th>
                    <th className="p-3">Age / Gender</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patients.map((pat) => (
                    <tr key={pat._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{pat.name}</td>
                      <td className="p-3 text-xs text-slate-500 dark:text-slate-400">{pat.email}</td>
                      <td className="p-3 text-xs text-slate-500 dark:text-slate-400">{pat.phone}</td>
                      <td className="p-3 font-bold text-primary">{pat.bloodGroup || 'O+'}</td>
                      <td className="p-3 text-xs text-slate-500 dark:text-slate-400">{pat.age} yrs • {pat.gender}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(pat._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                          title="Delete Patient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManagePatients;

