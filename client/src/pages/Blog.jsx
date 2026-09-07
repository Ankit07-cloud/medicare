import React from 'react';
import { BookOpen, Calendar, User, ArrowRight, HeartPulse, ShieldAlert } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: '10 Preventive Cardiology Habits Every Adult Should Adopt',
      category: 'Heart Health',
      date: 'August 02, 2026',
      author: 'Dr. Sarah Jenkins',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
      summary: 'Cardiovascular disease remains the leading cause of global health issues. Learn how simple lifestyle shifts, dietary adjustments, and early screenings protect heart vitality.'
    },
    {
      id: 2,
      title: 'Managing Seasonal Allergies & Respiratory Health',
      category: 'Wellness',
      date: 'July 28, 2026',
      author: 'Dr. Priya Sharma',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600',
      summary: 'High pollen counts and humidity triggers allergy symptoms. Understand effective antihistamine regimens, air purifier choices, and when to seek specialist advice.'
    },
    {
      id: 3,
      title: 'The Pediatric Guide to Childhood Vaccinations & Immunity',
      category: 'Pediatrics',
      date: 'July 20, 2026',
      author: 'Dr. Elena Rostova',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      summary: 'Key immunizations for infants and adolescents. Insights into booster schedules, safety guidelines, and building a robust immune foundation for growing children.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/20">
          MediCare Medical Journal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Health Insights, Wellness Tips & Medical Research
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Stay informed with evidence-based articles written and reviewed by licensed MediCare physicians.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((article) => (
          <article key={article.id} className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300 backdrop-blur-sm">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border border-white/10">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {article.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-secondary" /> {article.author}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;

