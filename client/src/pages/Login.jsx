import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HeartPulse, Mail, Lock, AlertCircle, LogIn } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await login(email, password);
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');
    try {
      const userData = await login(demoEmail, demoPassword);
      if (userData.role === 'admin') navigate('/admin');
      else if (userData.role === 'doctor') navigate('/doctor/dashboard');
      else navigate('/patient/dashboard');
    } catch (err) {
      setError('Demo login failed. Make sure server is running and seeded.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 backdrop-blur-xl transition-colors duration-200">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-lg shadow-primary/25">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome Back to MediCare</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to access your healthcare portal</p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1.5">Email Address</label>
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1.5">Password</label>
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        {/* Quick Demo Credentials Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 text-center uppercase tracking-wider">Quick Demo Login Shortcuts</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('patient@medicare.com', 'patient123')}
              className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-[11px] font-bold transition-colors"
            >
              Patient Demo
            </button>
            <button
              onClick={() => handleDemoLogin('aarti.mehta@medicare.com', 'doctor123')}
              className="py-2 px-2 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 rounded-xl text-[11px] font-bold transition-colors"
            >
              Doctor Demo
            </button>
            <button
              onClick={() => handleDemoLogin('admin@medicare.com', 'admin123')}
              className="py-2 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-[11px] font-bold transition-colors"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have a patient account yet?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

