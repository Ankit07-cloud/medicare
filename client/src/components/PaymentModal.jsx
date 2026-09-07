import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, Smartphone, Wallet, DollarSign } from 'lucide-react';

const PaymentModal = ({ amount, onClose, onSuccess, doctorName, preferredPaymentMethod = 'eSewa' }) => {
  const [selectedMethod, setSelectedMethod] = useState(preferredPaymentMethod || 'eSewa');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [upiId, setUpiId] = useState('rajeev@okicici');
  const [walletId, setWalletId] = useState('9860123456');
  const [walletProvider, setWalletProvider] = useState(preferredPaymentMethod || 'eSewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [error, setError] = useState('');

  const handlePay = (e) => {
    e.preventDefault();

    if (selectedMethod === 'card' && (!cardNumber || !expiry || !cvv)) {
      setError('Please complete your card details.');
      return;
    }
    if (selectedMethod === 'upi' && !upiId) {
      setError('Please enter your UPI ID.');
      return;
    }
    if ((selectedMethod === 'wallet' || selectedMethod === 'esewa' || selectedMethod === 'khalti' || selectedMethod === 'imepay' || selectedMethod === 'connectips' || selectedMethod === 'bank') && (!walletProvider || !walletId)) {
      setError('Please select a Nepali payment method and enter the payment details.');
      return;
    }

    setError('');
    setIsProcessing(true);
    const generatedRef = `PAY_${Math.floor(100000 + Math.random() * 900000)}`;
    setPaymentRef(generatedRef);

    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        onSuccess(generatedRef, selectedMethod);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 dark:border-slate-800 transition-colors">
        
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {completed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Successful!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your payment of NPR {amount.toFixed(2)} is complete.</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Reference ID: {paymentRef}</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                {selectedMethod === 'card' ? (
                  <CreditCard className="w-5 h-5" />
                ) : selectedMethod === 'upi' || selectedMethod === 'imepay' ? (
                  <Smartphone className="w-5 h-5" />
                ) : selectedMethod === 'wallet' || selectedMethod === 'esewa' || selectedMethod === 'khalti' || selectedMethod === 'connectips' ? (
                  <Wallet className="w-5 h-5" />
                ) : selectedMethod === 'bank' ? (
                  <DollarSign className="w-5 h-5" />
                ) : (
                  <DollarSign className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure Payment Gateway</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pay safely with card, eSewa, Khalti, bank transfer or cash on delivery.</p>
              </div>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 text-white flex justify-between items-center shadow-lg border border-slate-700/50">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Total Amount</span>
                <span className="text-2xl font-extrabold text-white">NPR {amount.toFixed(2)}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" /> 256-Bit SSL
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { id: 'card', label: 'Card', icon: CreditCard },
                { id: 'esewa', label: 'eSewa', icon: Wallet },
                { id: 'khalti', label: 'Khalti', icon: Wallet },
                { id: 'imepay', label: 'IME Pay', icon: Smartphone },
                { id: 'connectips', label: 'Connect IPS', icon: Wallet },
                { id: 'bank', label: 'Bank', icon: DollarSign },
                { id: 'cod', label: 'COD', icon: DollarSign }
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {method.label}
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="mb-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handlePay} className="space-y-4">
              {selectedMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedMethod === 'upi' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">UPI ID</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@bank"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Enter your UPI ID to complete payment through your bank app.</p>
                </div>
              )}

              {(selectedMethod === 'wallet' || selectedMethod === 'esewa' || selectedMethod === 'khalti' || selectedMethod === 'imepay' || selectedMethod === 'connectips' || selectedMethod === 'bank') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nepali Payment Provider</label>
                    <select
                      value={walletProvider}
                      onChange={(e) => setWalletProvider(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="eSewa">eSewa</option>
                      <option value="Khalti">Khalti</option>
                      <option value="IME Pay">IME Pay</option>
                      <option value="Connect IPS">Connect IPS</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {walletProvider === 'Bank Transfer' ? 'Account Number / Bank Name' : 'Wallet / Mobile Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={walletId}
                      onChange={(e) => setWalletId(e.target.value)}
                      placeholder={walletProvider === 'Bank Transfer' ? 'NABIL / 9876543210' : 'Enter registered mobile or wallet number'}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'cod' && (
                <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 text-sm text-slate-700 dark:text-slate-300">
                  <p className="font-semibold text-slate-900 dark:text-white">Cash on Delivery</p>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Pay in cash when the delivery arrives. Applicable for pharmacy delivery orders only.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-4 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing Transaction...' : `Confirm ${selectedMethod === 'cod' ? 'COD' : selectedMethod === 'esewa' ? 'eSewa' : selectedMethod === 'khalti' ? 'Khalti' : selectedMethod === 'imepay' ? 'IME Pay' : selectedMethod === 'connectips' ? 'Connect IPS' : selectedMethod === 'bank' ? 'Bank Transfer' : selectedMethod.toUpperCase()} Payment`}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentModal;

