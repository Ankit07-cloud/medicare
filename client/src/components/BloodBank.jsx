import React, { useEffect, useState } from 'react';
import { Droplet } from 'lucide-react';
import API from '../services/api';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodBank = ({ adminMode = false, onGroupSelect }) => {
  const [availability, setAvailability] = useState(bloodGroups.map((group) => ({ group, available: false })));
  const [loading, setLoading] = useState(false);
  const [savingGroup, setSavingGroup] = useState('');

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await API.get('/blood-bank');
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching blood availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const updateAvailability = async (group, available) => {
    setSavingGroup(group);
    try {
      await API.put('/blood-bank', { group, available });
      setAvailability((current) => current.map((item) => item.group === group ? { ...item, available } : item));
    } catch (error) {
      console.error('Error updating blood availability:', error);
    } finally {
      setSavingGroup('');
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
          <Droplet className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Available Blood Groups</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">MediCare Blood Bank, Kathmandu</p>
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-500">Loading blood availability...</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {availability.map(({ group, available }) => {
            const Tile = onGroupSelect ? 'button' : 'div';
            return (
            <Tile key={group} type={onGroupSelect ? 'button' : undefined} onClick={onGroupSelect ? () => onGroupSelect({ group, available }) : undefined} className={`rounded-2xl border p-3 text-center transition-colors ${available ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/40' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'} ${onGroupSelect ? 'cursor-pointer hover:border-primary hover:ring-2 hover:ring-primary/10' : ''}`}>
              <span className="block text-lg font-extrabold text-rose-600 dark:text-rose-400">{group}</span>
              <span className={`block text-[11px] font-semibold ${available ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}>{available ? 'Available' : 'Not available'}</span>
              {adminMode && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <button type="button" disabled={savingGroup === group} onClick={() => updateAvailability(group, true)} className="rounded-lg bg-emerald-600 px-1 py-1 text-[10px] font-bold text-white disabled:opacity-50">Accept</button>
                  <button type="button" disabled={savingGroup === group} onClick={() => updateAvailability(group, false)} className="rounded-lg bg-slate-600 px-1 py-1 text-[10px] font-bold text-white disabled:opacity-50">Deny</button>
                </div>
              )}
            </Tile>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BloodBank;
