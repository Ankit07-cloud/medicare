import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/api';
import { Plus, Trash2, Edit, Stethoscope, Search, X } from 'lucide-react';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'doctor123',
    specialization: 'Cardiology',
    experience: 5,
    qualification: 'MD, MBBS',
    fees: 150,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    about: 'Experienced medical specialist.'
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get('/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete doctor record from system?')) return;
    try {
      await API.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      alert('Failed to delete doctor');
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await API.post('/doctors', formData);
      setShowAddModal(false);
      fetchDoctors();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add doctor');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Manage Hospital Doctors</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Add new specialists, edit profiles, or remove doctors.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Onboard New Doctor
          </button>
        </div>

        {/* Doctor List */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">No doctors registered yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <tr>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Specialization</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Performance</th>
                    <th className="p-3">Feedback</th>
                    <th className="p-3">Fee</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {doctors.map((doc) => (
                    <tr key={doc._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={doc.photo} alt={doc.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{doc.name}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">{doc.email}</span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-primary">{doc.specialization}</td>
                      <td className="p-3">{doc.experience} Years</td>
                      <td className="p-3">{doc.performanceScore?.toFixed(1) || (doc.rating || 4.9)}</td>
                      <td className="p-3">{doc.feedbackCount || doc.feedback?.length || 0}</td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">₹{doc.fees}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                          title="Delete Doctor"
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

        {/* Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-4 relative border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New Specialist Doctor</h3>

              <form onSubmit={handleAddDoctor} className="space-y-3">
                <input
                  type="text"
                  placeholder="Doctor Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-slate-400 dark:placeholder-slate-500"
                />
                <input
                  type="email"
                  placeholder="Doctor Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-slate-400 dark:placeholder-slate-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Consultation Fee (₹)"
                    required
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Qualifications (e.g. MD, MBBS)"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-slate-400 dark:placeholder-slate-500"
                />
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-slate-400 dark:placeholder-slate-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow mt-2 transition-colors"
                >
                  Save & Register Doctor
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageDoctors;

