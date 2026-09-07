import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, X, Droplet } from 'lucide-react';
import HospitalMap from '../components/HospitalMap';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showBloodBank, setShowBloodBank] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    if (window.location.hash === '#blood-bank') {
      setShowBloodBank(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Contact MediCare Support & Emergency Desk
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Have a question about doctor appointments, pharmacy orders, or medical services? We are here 24/7 to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold">MediCare Central Hospital</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Reach out to our clinical support team, administration, or emergency helpline for immediate assistance.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Emergency Toll-Free (24/7)</span>
                  <a href="tel:+9118004325273" className="text-base font-bold text-white hover:text-primary transition-colors">+91 1800-432-5273</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center font-bold flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">General & Appointment Inquiries</span>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@medicare-health.org" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-secondary transition-colors">support@medicare-health.org</a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBloodBank(true)}
                className="w-full flex items-start gap-4 text-left hover:bg-white/5 rounded-2xl p-2 -m-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold flex-shrink-0">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Blood Bank Support (24/7)</span>
                  <span className="block text-base font-bold text-white">+91 1800-999-1222</span>
                  <span className="block text-xs text-slate-400 mt-1">Available round the clock for donor requests and emergency blood supply.</span>
                </div>
              </button>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Main Campus Address</span>
                  <a href="https://www.google.com/maps/search/?api=1&query=MediCare+Plaza+Kathmandu+Nepal" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-secondary transition-colors">MediCare Plaza, Kathmandu, Nepal</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Message Received!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Thank you for contacting MediCare. Our patient relations representative will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Send Us a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Appointment inquiry, billing, feedback..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Message Detail</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message or inquiry here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Hospital Locations Interactive Map */}
      <HospitalMap />

      {showBloodBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="blood-bank-title">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-rose-500">
                  <Droplet className="w-5 h-5" />
                  <h2 id="blood-bank-title" className="text-xl font-bold text-slate-900 dark:text-white">Blood Bank Availability</h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live support: +91 1800-999-1222</p>
              </div>
              <button type="button" onClick={() => setShowBloodBank(false)} aria-label="Close blood bank availability" className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                <div key={group} className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 p-3 text-center">
                  <span className="block text-lg font-extrabold text-rose-600 dark:text-rose-400">{group}</span>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">Available</span>
                </div>
              ))}
            </div>
            <a href="tel:+9118009991222" className="mt-5 w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-3 text-center text-sm font-bold transition-colors">Call Blood Bank</a>
          </div>
        </div>
      )}

    </div>
  );
};

export default Contact;
