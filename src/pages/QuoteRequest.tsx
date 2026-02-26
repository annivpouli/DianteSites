import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  Info,
  Clock,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuoteRequest() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingStatus, setExistingStatus] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // ✅ Désactivé fetch pour Render Static Site
  useEffect(() => {
    setCheckingStatus(false);
    setExistingStatus(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    // ✅ Simule l'envoi sur Render
    setTimeout(() => {
      localStorage.setItem('diantesites_user_email', email);
      setSubmitted(true);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (existingStatus && !submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-amber-100 text-amber-600">
            <Clock size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Demande en cours</h2>
          <p className="text-slate-600 mb-8">
            Votre demande est en cours d'analyse. Nous vous répondrons très prochainement.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-emerald-600 font-bold hover:underline">
              Retour à l'accueil
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('diantesites_user_email');
                setExistingStatus(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              Faire une nouvelle demande avec un autre email
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-emerald-100 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Demande envoyée !</h2>
          <p className="text-slate-600 mb-8">
            Merci pour votre confiance. Nous analyserons votre projet et vous répondrons par email sous 24-48h.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
            <ArrowLeft size={20} /> Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form Side */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-100"
            >
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Demander un devis gratuit</h1>
              <p className="text-slate-500 mb-10">Remplissez ce formulaire pour nous aider à comprendre votre projet.</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input name="name" type="text" placeholder="Nom / Prénom" required className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none"/>
                  <input name="email" type="email" placeholder="Email" required className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none"/>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Type de site souhaité</label>
                  <select name="siteType" required className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none">
                    <option value="">Sélectionnez un type</option>
                    <option value="landing">Landing Page</option>
                    <option value="cv">Site CV</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="vitrine">Site vitrine</option>
                    <option value="restaurant">Site restaurant</option>
                    <option value="association">Site association</option>
                    <option value="event">Site événementiel</option>
                    <option value="blog">Blog simple</option>
                    <option value="autre">Autre projet</option>
                  </select>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3">
                  {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Envoyer ma demande <Send size={20}/></>}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}