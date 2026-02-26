import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  User, 
  Mail, 
  Calendar, 
  Euro, 
  Layers, 
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';

interface Quote {
  id: number;
  name: string;
  email: string;
  siteType: string;
  description: string;
  pages: number;
  budget: number;
  deadline: string;
  details: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuotes();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'DianteSitesAdmin') {
      setIsAuthenticated(true);
      setLoading(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getGmailLink = (email: string, name: string) => {
    const subject = encodeURIComponent(`Votre demande de devis chez DianteSites - ${name}`);
    const body = encodeURIComponent(`Bonjour ${name},\n\nMerci pour votre demande de devis sur DianteSites.\n\n`);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Accès réservé</h2>
          <p className="text-slate-500 text-center mb-8 text-sm">Veuillez saisir le mot de passe administrateur.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
              />
              {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Se connecter
              <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Tableau de bord</h1>
            <p className="text-slate-500">Gérez vos demandes de devis entrantes.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
            {quotes.length} demandes au total
          </div>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-300 text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune demande pour le moment</h3>
            <p className="text-slate-500">Les demandes de devis apparaîtront ici dès qu'un client remplira le formulaire.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <motion.div 
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{quote.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Mail size={14} />
                          {quote.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        quote.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {quote.status === 'pending' ? 'En attente' : 'Traité'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Reçu le {new Date(quote.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                        <Layers size={14} /> Type de site
                      </div>
                      <div className="text-slate-900 font-bold capitalize">{quote.siteType}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                        <Euro size={14} /> Budget
                      </div>
                      <div className="text-slate-900 font-bold">{quote.budget} €</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                        <Clock size={14} /> Délai
                      </div>
                      <div className="text-slate-900 font-bold">{quote.deadline}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                        <Calendar size={14} /> Pages
                      </div>
                      <div className="text-slate-900 font-bold">{quote.pages}</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2">Description du projet</h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {quote.description}
                      </p>
                    </div>
                    {quote.details && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Besoins particuliers</h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          {quote.details}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-end gap-3">
                  <button 
                    onClick={() => handleStatusUpdate(quote.id, 'rejected')}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                      quote.status === 'rejected' ? 'text-red-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <XCircle size={18} /> {quote.status === 'rejected' ? 'Rejeté' : 'Rejeter'}
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(quote.id, 'processed')}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                      quote.status === 'processed' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle size={18} /> {quote.status === 'processed' ? 'Traité' : 'Marquer comme traité'}
                  </button>
                  <a 
                    href={getGmailLink(quote.email, quote.name)} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all"
                  >
                    Répondre via Gmail <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
