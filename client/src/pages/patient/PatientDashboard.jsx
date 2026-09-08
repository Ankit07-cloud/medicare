import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import API from '../../services/api';
import Sidebar from '../../components/Sidebar';
import Chatbot from '../../components/Chatbot';
import { Calendar, Clock, Pill, User, CheckCircle, AlertCircle, ArrowRight, Activity, Plus, Minus, ShoppingCart, Trash2, Bike } from 'lucide-react';

const parseTime = (time) => {
  if (!time) return null;
  const [raw, meridiem] = time.split(' ');
  const [hourStr, minuteStr] = raw.split(':');
  let hour = Number(hourStr);
  let minute = Number(minuteStr || 0);
  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
};

const getScheduledTimes = (dosage = '') => {
  const text = dosage.toLowerCase();
  if (/every 6 hours/.test(text)) return ['06:00 AM', '12:00 PM', '06:00 PM', '12:00 AM'];
  if (/every 8 hours/.test(text)) return ['06:00 AM', '02:00 PM', '10:00 PM'];
  if (/every 12 hours|twice daily/.test(text)) return ['09:00 AM', '09:00 PM'];
  if (/once daily/.test(text)) return ['09:00 AM'];
  if (/before.*breakfast|before morning/.test(text)) return ['07:30 AM'];
  if (/after breakfast/.test(text)) return ['09:00 AM'];
  if (/bedtime/.test(text)) return ['10:00 PM'];
  if (/as needed/.test(text)) return [];
  return ['09:00 AM'];
};

const getNextTime = (times) => {
  const now = new Date();
  const todayTimes = times.map(parseTime).filter(Boolean);
  const upcoming = todayTimes.filter((time) => time > now);
  return upcoming.length ? upcoming[0] : todayTimes[0] || null;
};

const sampleDeliveryOrder = {
  orderNumber: 'MC-22871',
  store: 'MediCare Pharmacy',
  riderName: 'Aman Verma',
  riderPhone: '+91 98765 43210',
  bikeNumber: 'DL-4S-6740',
  status: 'Out for delivery',
  eta: 'Today, 10:10 AM',
  progress: [
    { label: 'Order confirmed', done: true },
    { label: 'Packed at pharmacy', done: true },
    { label: 'Out for delivery', done: true },
    { label: 'Delivered', done: true }
  ]
};

const formatTime = (date) => {
  if (!date) return 'Not scheduled';
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const normalized = hours % 12 === 0 ? 12 : hours % 12;
  return `${normalized}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const { cart, cartTotal, updateQuantity, removeFromCart } = useContext(CartContext);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchOrders();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await API.get('/appointments/my');
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/my');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching pharmacy orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppts = appointments.filter(a => a.status === 'Approved' || a.status === 'Pending');

  const getAppointmentDateTime = (appt) => {
    if (!appt?.date || !appt?.timeSlot) return null;
    const [rawTime, meridiem] = appt.timeSlot.split(' ');
    const [hourStr, minuteStr] = rawTime.split(':');
    let hour = Number(hourStr);
    const minute = Number(minuteStr || 0);
    if (meridiem === 'PM' && hour !== 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
    const date = new Date(appt.date);
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  const nextAppointment = upcomingAppts
    .map((appt) => ({ appt, date: getAppointmentDateTime(appt) }))
    .filter((item) => item.date)
    .sort((a, b) => a.date - b.date)[0]?.appt;

  const medicineSchedules = cart.map((item) => {
    const times = getScheduledTimes(item.dosage || '');
    return {
      item,
      times,
      next: getNextTime(times)
    };
  });

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          <div>
            <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Patient Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Hello, {user?.name}! 👋
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Blood Group: <strong className="text-slate-800 dark:text-slate-200">{user?.bloodGroup || 'O+'}</strong> • Age: <strong className="text-slate-800 dark:text-slate-200">{user?.age || 30}</strong>
            </p>
          </div>

          <Link
            to="/doctors"
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md shadow-primary/20 flex items-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" /> Find a Doctor &amp; Book
          </Link>
        </div>

        {/* Dashboard Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-primary flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-slate-900 dark:text-white">{appointments.length}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Appointments</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-slate-900 dark:text-white">{upcomingAppts.length}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Upcoming Visits</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-secondary flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-slate-900 dark:text-white">Active</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Health Monitoring Status</span>
            </div>
          </div>
        </div>

        {/* Schedule Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Next Appointment</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Stay informed about your upcoming consultation</p>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                <Clock className="w-4 h-4" /> {nextAppointment ? 'Upcoming' : 'None'}
              </span>
            </div>

            {nextAppointment ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Doctor</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{nextAppointment.doctor?.name || 'Dr. Specialist'}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{nextAppointment.date}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Time</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{nextAppointment.timeSlot}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-4 border border-emerald-100 dark:border-emerald-800/60">
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold uppercase">Reminder</p>
                  <p className="text-sm text-emerald-900 dark:text-emerald-200">We will remind you before your appointment. Please arrive 10 minutes early.</p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-6 border border-slate-100 dark:border-slate-700/60 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">No confirmed appointments yet.</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Medicine Schedule</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review your daily dose and next intake time</p>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
                <Pill className="w-4 h-4" /> {medicineSchedules.length} item{medicineSchedules.length === 1 ? '' : 's'}
              </span>
            </div>

            {medicineSchedules.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-6 border border-slate-100 dark:border-slate-700/60 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">No medicines added to your cart yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {medicineSchedules.map(({ item, times, next }) => (
                  <div key={item._id} className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.dosage || 'Take as directed by doctor'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Next dose</p>
                        <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{next ? formatTime(next) : 'As needed'}</p>
                      </div>
                    </div>
                    {times.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                        {times.map((t) => (
                          <span key={t} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Delivery Tracker</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track your medicine order status live.</p>
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                <Bike className="w-6 h-6" />
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60 space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Order</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{sampleDeliveryOrder.orderNumber}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Rider</p>
                  <p>{sampleDeliveryOrder.riderName}</p>
                  <p>{sampleDeliveryOrder.riderPhone}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Bike number</p>
                  <p>{sampleDeliveryOrder.bikeNumber}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Current status</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white">{sampleDeliveryOrder.status}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ETA: {sampleDeliveryOrder.eta}</p>
              </div>

              <div className="space-y-4">
                <div className="relative h-10">
                  <div className="absolute inset-y-4 left-8 w-[calc(100%-7rem)] border-t border-slate-300 dark:border-slate-700" />
                  {sampleDeliveryOrder.progress.map((step, index) => (
                    <div key={step.label} className="relative inline-flex flex-col items-center text-center w-1/4">
                      <span className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs ${step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                        {index + 1}
                      </span>
                      <span className="text-[11px] mt-2 w-20 text-slate-600 dark:text-slate-400">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-extrabold text-secondary uppercase tracking-widest">Pharmacy Cart</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Your medicines ready for checkout</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review quantities before placing your pharmacy order.</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20">
              <ShoppingCart className="w-4 h-4" /> {cart.reduce((total, item) => total + item.quantity, 0)} item(s)
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-7 border border-slate-100 dark:border-slate-700/60 text-center space-y-3">
              <ShoppingCart className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Your cart is empty</p>
              <Link to="/pharmacy" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white text-xs font-bold rounded-xl">
                Browse Pharmacy <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-5">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">₹{Number(item.price || 0).toFixed(2)} each</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <button onClick={() => updateQuantity(item._id, -1)} aria-label={`Decrease ${item.name} quantity`} className="p-2 text-slate-500 hover:text-secondary">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} aria-label={`Increase ${item.name} quantity`} className="p-2 text-slate-500 hover:text-secondary">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">₹{(Number(item.price || 0) * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item._id)} aria-label={`Remove ${item.name} from cart`} className="p-2 text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-slate-900 dark:bg-slate-800 p-5 text-white self-start space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                  <span className="text-sm font-bold">Total</span>
                  <span className="text-xl font-extrabold text-emerald-400">₹{cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/pharmacy" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-bold transition-colors">
                  Continue to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </section>

        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Pharmacy Orders</h3>
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              {orders.length} total
            </span>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-2" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Pill className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No pharmacy orders placed yet</p>
              <Link to="/pharmacy" className="inline-block px-4 py-2 bg-secondary text-white text-xs font-bold rounded-xl">
                Shop Medicines
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order._id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Order #{order.orderNumber}</p>
                      <p className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{Number(order.totalAmount || 0).toFixed(2)}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-bold">
                        {order.deliveryStatus || 'Order Confirmed'}
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">{(order.paymentMethod || 'card').toUpperCase()} • {order.paymentStatus || 'Paid'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item) => (
                      <span key={`${order._id}-${item.name}`} className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200">
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Appointments</h3>
            <Link to="/patient/appointments" className="text-xs font-bold text-primary flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No appointments scheduled yet</p>
              <Link to="/doctors" className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl">
                Find a Doctor
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {appointments.slice(0, 4).map((appt) => (
                <div key={appt._id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={appt.doctor?.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
                      alt={appt.doctor?.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{appt.doctor?.name || 'Dr. Specialist'}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{appt.doctor?.specialization} • {appt.date} at {appt.timeSlot}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      appt.status === 'Approved'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                        : appt.status === 'Rejected' || appt.status === 'Cancelled'
                        ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">MediCare AI Assistant</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get help with appointments, doctors, and medicines.</p>
          </div>
          <Chatbot embedded />
        </section>

      </main>
    </div>
  );
};

export default PatientDashboard;

