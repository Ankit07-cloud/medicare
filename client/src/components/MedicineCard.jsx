import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Pill, ShieldCheck, Check } from 'lucide-react';

const MedicineCard = ({ medicine }) => {
  const { addToCart, cart } = useContext(CartContext);

  const cartItem = cart.find((item) => item._id === medicine._id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group backdrop-blur-sm">
      <div>
        {/* Medicine Image & Tag */}
        <div className="relative h-48 bg-slate-50 dark:bg-slate-800/80 overflow-hidden flex items-center justify-center p-4">
          <img
            src={medicine.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'}
            alt={medicine.name}
            className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-slate-900/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border border-white/10">
            {medicine.category}
          </span>
          {medicine.requiresPrescription && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-extrabold shadow-sm" title="Rx Required">
              Rx Required
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {medicine.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {medicine.description}
          </p>

          <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
            <Pill className="w-3.5 h-3.5 text-secondary" />
            <span>{medicine.dosage || 'Take as directed by doctor'}</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase text-slate-400 dark:text-slate-500 font-semibold">Price</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">₹{medicine.price.toFixed(2)}</span>
        </div>

        <button
          onClick={() => addToCart(medicine)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            qtyInCart > 0
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20 hover:shadow-lg'
          }`}
        >
          {qtyInCart > 0 ? (
            <>
              <Check className="w-4 h-4" /> Added ({qtyInCart})
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;

