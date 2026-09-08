import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, PhoneCall, Mail, MapPin, ShieldCheck, Clock, Droplet, ArrowRight, Facebook, Instagram, Github, X, Globe2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Medi<span className="text-primary">Care</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              MediCare is a state-of-the-art Healthcare Management System dedicated to providing instant medical consultations, online medicine ordering, laboratory test bookings, and seamless hospital management.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-2 text-xs font-semibold text-secondary">
                <ShieldCheck className="w-4 h-4" /> HIPAA Compliant & Secure
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Clock className="w-4 h-4" /> 24/7 Emergency Care
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Our Hospital</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors">Specialist Doctors</Link></li>
              <li><Link to="/pharmacy" className="hover:text-primary transition-colors">Online Pharmacy</Link></li>
              <li><Link to="/lab-tests" className="hover:text-primary transition-colors">Lab Test Booking</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Medical Articles</Link></li>
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs">Specialties</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Cardiology & Heart Care</li>
              <li>Neurology & Spine</li>
              <li>Pediatrics & Child Care</li>
              <li>Physiotherapy & Rehabilitation</li>
              <li>Orthopedics & Joint Surgery</li>
              <li>Dermatology & Cosmetology</li>
            </ul>
          </div>

          {/* Emergency & Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs">Emergency Care</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 text-xs">Emergency Hotline (24/7)</p>
                  <a href="tel:+18004325273" className="text-white font-bold text-base hover:text-primary transition-colors">+1 (800) 432-5273</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 text-xs">Support Email</p>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=help@medicare-health.org" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-primary transition-colors">help@medicare-health.org</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplet className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 text-xs">Blood Bank Support (24/7)</p>
                  <a href="tel:+9118009991222" className="text-white font-bold text-base hover:text-primary transition-colors">+91 1800-999-1222</a>
                  <p className="text-slate-400 text-xs mt-1">Emergency blood & donor coordination available around the clock.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href="https://www.google.com/maps/search/?api=1&query=MediCare+Plaza+Kathmandu+Nepal" target="_blank" rel="noreferrer" className="text-slate-400 text-xs hover:text-secondary transition-colors">MediCare Plaza, Kathmandu, Nepal</a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-10 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/medicare-health" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <a href="https://www.instagram.com/medicare-health" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a href="https://github.com/Ankit07-cloud/medicare" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.x.com/medicare-health" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <X className="w-4 h-4" /> X
            </a>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <Globe2 className="w-4 h-4" />
            <a href="https://www.medicare-health.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">www.medicare-health.org</a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediCare Healthcare Management System. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Patient Rights</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
