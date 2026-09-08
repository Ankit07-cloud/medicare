import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import {
  HeartPulse,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Stethoscope,
  ShieldCheck,
  Calendar
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'doctor') return '/doctor/dashboard';
    return '/patient/dashboard';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Hospital', path: '/about' },
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'Pharmacy Store', path: '/pharmacy' },
    { name: 'Lab Tests', path: '/lab-tests' },
    { name: 'Medical Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
                Medi<span className="text-primary">Care</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-300 font-semibold">
                Healthcare System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          {!isAuthPage && (
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Action Buttons, Theme Switcher & Profile */}
          <div className="hidden md:flex items-center gap-3">
            
            {!isAuthPage && (
              <>
                <ThemeToggle />

                <Link
                  to="/pharmacy"
                  className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  title="View Pharmacy Cart"
                >
                  <ShoppingBag className="w-5 h-5 text-secondary" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                      {totalCartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {!isAuthPage && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-semibold truncate max-w-[100px]">
                      {user.name}
                    </span>
                    <span className="block text-[11px] capitalize text-primary font-medium">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-xl py-2 z-50 border border-slate-200 dark:border-slate-700"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>

                    <Link
                      to={getDashboardLink()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {user.role === 'admin' ? (
                        <ShieldCheck className="w-4 h-4 text-primary" />
                      ) : user.role === 'doctor' ? (
                        <Stethoscope className="w-4 h-4 text-primary" />
                      ) : (
                        <Calendar className="w-4 h-4 text-primary" />
                      )}
                      Dashboard & Portal
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold hover:text-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/25 hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button & Theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthPage ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200">Log In</Link>
                <Link to="/register" className="px-3 py-2 rounded-xl text-xs font-semibold bg-primary text-white">Register</Link>
              </div>
            ) : (
              <>
                <ThemeToggle />
                <Link
                  to="/pharmacy"
                  className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-semibold bg-primary text-white rounded-xl"
                >
                  Go to {user.role.toUpperCase()} Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-2.5 text-center font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-semibold bg-primary text-white rounded-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
