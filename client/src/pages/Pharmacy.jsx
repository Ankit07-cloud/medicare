import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../services/api';
import MedicineCard from '../components/MedicineCard';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Search, ShoppingBag, Filter, Pill, Trash2, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState('');

  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const categories = [
    'All',
    'Antibiotics',
    'Pain Relief',
    'Cardiology',
    'Vitamins & Supplements',
    'Allergy & Cold',
    'Gastroenterology'
  ];

  useEffect(() => {
    fetchMedicines();
  }, [selectedCategory, search]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await API.get('/medicines', {
        params: { category: selectedCategory, search }
      });
      setMedicines(res.data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutSuccess = async (paymentId, paymentMethod = 'card') => {
    setShowPayment(false);

    if (!user) {
      setOrderSuccess('Please log in to place your pharmacy order.');
      return;
    }

    try {
      const response = await API.post('/orders', {
        cartItems: cart,
        totalAmount: cartTotal,
        paymentMethod,
        paymentId,
        deliveryAddress: user.address || 'Home Delivery',
        notes: 'Pharmacy order placed via MediCare checkout'
      });

      setShowCartDrawer(false);
      clearCart();
      setOrderSuccess(`Order placed successfully! ${response.data.orderNumber || 'Pharmacy order'} confirmed. Transaction ID: ${paymentId}. Your medicines will be delivered within 24 hours.`);
    } catch (error) {
      setOrderSuccess(error.response?.data?.message || 'Payment went through, but the order could not be created. Please contact support.');
    }
  };

  if (user?.role === 'doctor') {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-secondary/10 px-3.5 py-1 rounded-full border border-secondary/20">
            MediCare Online Pharmacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            Order Medicines & Health Supplies
          </h1>
        </div>

        {/* View Cart Pill */}
        <button
          onClick={() => setShowCartDrawer(true)}
          className="px-5 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-lg flex items-center gap-3 border border-transparent dark:border-slate-700 transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-secondary" />
          <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          <span className="bg-secondary px-2.5 py-0.5 rounded-full text-xs font-black">
            ₹{cartTotal.toFixed(2)}
          </span>
        </button>
      </div>

      {orderSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-emerald-800 dark:text-emerald-300 font-medium text-sm flex items-center justify-between shadow">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {orderSuccess}
          </span>
          <button onClick={() => setOrderSuccess('')} className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Dismiss</button>
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-secondary/20">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search medicine name, category or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" /> Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading catalog...</p>
        </div>
      ) : medicines.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <Pill className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Medicines Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try resetting your search query or selecting another category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((med) => (
            <MedicineCard key={med._id} medicine={med} />
          ))}
        </div>
      )}

      {/* Cart Drawer */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 dark:border-slate-800 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-secondary" /> Pharmacy Cart
                </h3>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Your cart is currently empty</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 my-4">
                  {cart.map((item) => (
                    <div key={item._id} className="py-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-700"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">₹{item.price.toFixed(2)} each</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200 font-extrabold text-lg">
                  <span>Total Amount</span>
                  <span className="text-2xl text-secondary">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-lg shadow-secondary/25 transition-all flex items-center justify-center gap-2"
                >
                  Checkout & Place Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showPayment && (
        <PaymentModal
          amount={cartTotal}
          onClose={() => setShowPayment(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
};

export default Pharmacy;

