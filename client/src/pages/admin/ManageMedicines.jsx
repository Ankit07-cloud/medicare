import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/api';
import { Pill, Plus, Trash2, Edit, X } from 'lucide-react';

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Pain Relief',
    price: 15.00,
    stock: 100,
    description: 'Essential therapeutic medication.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    requiresPrescription: false
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await API.get('/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete medicine from inventory?')) return;
    try {
      await API.delete(`/medicines/${id}`);
      fetchMedicines();
    } catch (err) {
      alert('Failed to delete medicine');
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      await API.post('/medicines', formData);
      setShowAddModal(false);
      fetchMedicines();
    } catch (err) {
      alert('Failed to create medicine entry');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Manage Pharmacy Stock</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Control medicine inventory, categories, pricing & stock levels.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Medicine Stock
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto" />
            </div>
          ) : medicines.length === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">No medicine items found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <tr>
                    <th className="p-3">Item</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock Qty</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {medicines.map((med) => (
                    <tr key={med._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={med.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'} onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'; }} alt={med.name} className="w-10 h-10 rounded-xl object-contain bg-slate-50 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{med.name}</span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500">{med.requiresPrescription ? 'Rx Required' : 'OTC Medicine'}</span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-secondary">{med.category}</td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">₹{med.price.toFixed(2)}</td>
                      <td className="p-3 font-bold text-slate-700 dark:text-slate-300">{med.stock} units</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(med._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                          title="Delete Medicine"
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

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Medicine Item</h3>

              <form onSubmit={handleAddMedicine} className="space-y-3">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder-slate-400 dark:placeholder-slate-500"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price (₹)"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Stock Qty"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={formData.requiresPrescription}
                      onChange={(e) => setFormData({ ...formData, requiresPrescription: e.target.checked })}
                      className="rounded text-secondary"
                    />
                    Rx Prescription Needed
                  </label>
                </div>

                <textarea
                  rows={2}
                  placeholder="Medicine Description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder-slate-400 dark:placeholder-slate-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow mt-2 transition-colors"
                >
                  Save Medicine Item
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageMedicines;

