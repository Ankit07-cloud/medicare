import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Pill,
  FileText,
  UserCheck,
  UserX,
  LogOut,
  PlusCircle,
  Clock,
  Heart
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  let navItems = [];

  if (user.role === 'patient') {
    navItems = [
      { name: 'Overview', path: '/patient/dashboard', icon: LayoutDashboard },
      { name: 'Book Appointment', path: '/doctors', icon: Calendar },
      { name: 'My Appointments', path: '/patient/appointments', icon: Clock },
      { name: 'My Profile', path: '/patient/profile', icon: Users }
    ];
  } else if (user.role === 'doctor') {
    navItems = [
      { name: 'Doctor Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
      { name: 'Today Appointments', path: '/doctor/appointments', icon: Calendar },
      { name: 'Doctor Profile', path: '/doctor/profile', icon: Stethoscope }
    ];
  } else if (user.role === 'admin') {
    navItems = [
      { name: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
      { name: 'Manage Doctors', path: '/admin/doctors', icon: Stethoscope },
      { name: 'Manage Patients', path: '/admin/patients', icon: Users },
      { name: 'Manage Medicines', path: '/admin/medicines', icon: Pill },
      { name: 'All Appointments', path: '/admin/appointments', icon: Calendar }
    ];
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-5 flex flex-col justify-between hidden md:flex border-r border-slate-800">
      <div className="space-y-6">
        
        {/* User Card */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-lg">
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-extrabold bg-primary/20 text-primary border border-primary/30">
              {user.role}
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
      >
        <LogOut className="w-5 h-5" /> Sign Out
      </button>
    </aside>
  );
};

export default Sidebar;
