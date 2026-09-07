import React, { useState } from 'react';
import { TestTube, Clock, Home, ShieldCheck, CheckCircle2, Calendar, FileText } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const LabTests = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState('');

  const labTests = [
    {
      id: 'L101',
      name: 'Full Body Health Screening (68 Parameters)',
      category: 'Preventive Health',
      price: 79.00,
      turnaround: '24 Hours',
      fasting: '10-12 Hours Fasting Required',
      description: 'Comprehensive evaluation covering Lipid Profile, Kidney Function, Liver Function, Blood Sugar & Complete Blood Count.'
    },
    {
      id: 'L102',
      name: 'Cardiac Risk Profile',
      category: 'Cardiology',
      price: 99.00,
      turnaround: '12 Hours',
      fasting: '8 Hours Fasting Required',
      description: 'Evaluates High-Sensitivity C-Reactive Protein (hs-CRP), ApoB, Lipid panel, and Troponin markers for early heart disease detection.'
    },
    {
      id: 'L103',
      name: 'Thyroid Care Panel (T3, T4, TSH)',
      category: 'Endocrinology',
      price: 39.00,
      turnaround: 'Same Day (6 Hours)',
      fasting: 'No Fasting Required',
      description: 'Detects thyroid dysfunction, hypothyroidism, hyperthyroidism, and hormone imbalance.'
    },
    {
      id: 'L104',
      name: 'Vitamin D & B12 Vitality Test',
      category: 'Nutritional Care',
      price: 49.00,
      turnaround: '24 Hours',
      fasting: 'No Fasting Required',
      description: 'Monitors essential micronutrient levels vital for bone density, nerve system function, and daily energy boost.'
    }
  ];

  const handlePaymentSuccess = (paymentId) => {
    setBookingSuccess(`Home sample collection scheduled for ${selectedTest.name}! Reference ID: ${paymentId}`);
    setSelectedTest(null);
    setTimeout(() => setBookingSuccess(''), 7000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
          MediCare Diagnostic Labs
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Book Diagnostic Lab Tests & Home Sample Collection
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Certified ISO/CAP accredited diagnostic testing with free home phlebotomist sample collection and digital report downloads.
        </p>
      </div>

      {bookingSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-emerald-800 dark:text-emerald-300 font-medium text-sm flex items-center justify-between shadow">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {bookingSuccess}
          </span>
          <button onClick={() => setBookingSuccess('')} className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Dismiss</button>
        </div>
      )}

      {/* Lab Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labTests.map((test) => (
          <div key={test.id} className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300 flex flex-col justify-between space-y-4 backdrop-blur-sm">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {test.category}
                </span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">₹{test.price.toFixed(2)}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{test.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{test.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-secondary" /> {test.turnaround}
                </span>
                <span className="flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-primary" /> Free Home Pickup
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  {test.fasting}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTest(test)}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Home Sample Collection
            </button>
          </div>
        ))}
      </div>

      {selectedTest && (
        <PaymentModal
          amount={selectedTest.price}
          onClose={() => setSelectedTest(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default LabTests;

