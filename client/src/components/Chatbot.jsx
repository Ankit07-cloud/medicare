import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import API from '../services/api';

const defaultMessages = [
  { from: 'bot', text: 'Hi! I am MediCare Assistant. How can I help you today?' }
];

const quickReplies = [
  'Book an appointment',
  'Find a doctor',
  'Order medicine',
  'Contact support'
];

const Chatbot = ({ embedded = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMessage = { from: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/chat', { message: text.trim() });
      const botReply = response.data.reply || 'Sorry, I could not generate a response right now.';
      setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the chat service. Please try again.');
      setMessages((prev) => [...prev, { from: 'bot', text: 'I am having trouble answering right now. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={embedded ? 'w-full flex flex-col items-stretch' : 'fixed right-6 bottom-6 z-50 flex flex-col items-end'}>
      {isOpen ? (
        <div className={`${embedded ? 'w-full' : 'w-80 md:w-96'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl overflow-hidden`}>
          <div className="flex items-center justify-between gap-3 px-4 py-4 bg-primary text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">MediCare Assistant</p>
                <p className="text-[11px] opacity-80">Ask me about appointments, doctors, and pharmacy.</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-sm font-semibold opacity-90 hover:opacity-100"
            >
              Close
            </button>
          </div>

          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`flex ${message.from === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.from === 'bot'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'bg-primary text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 transition"
                >
                  {reply}
                </button>
              ))}
            </div>
            {error && <div className="mb-2 text-xs text-red-600 dark:text-red-400">{error}</div>}
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Send a message..."
                className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading}
                className="rounded-2xl bg-primary px-4 py-3 text-white hover:bg-primary-dark transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open MediCare AI Assistant"
          title="Open MediCare AI Assistant"
          className={`flex items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-primary-dark transition ${embedded ? 'w-12 h-12 self-end' : 'w-12 h-12'}`}
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
