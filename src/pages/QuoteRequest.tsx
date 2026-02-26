import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  Info,
  CreditCard,
  FileSignature,
  Rocket,
  Clock,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuoteRequest() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingStatus, setExistingStatus] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const savedEmail = localStorage.getItem('diantesites_user_email');
      if (savedEmail) {
        try {
          const response = await fetch(`/api/quotes/status/${savedEmail}`);
          const data = await response.json();
          if (data && data.status) {
            setExistingStatus(data.status);
          }
        } catch (error) {
          console.error("Error checking status:", error);
        }
      }
      setCheckingStatus(false);
    };
    checkUserStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const data = {
      name: formData.get('name'),
      email: email,
      siteType: formData.get('siteType'),
      description: formData.get('description'),
      pages: parseInt(formData.get('pages') as string) || 0,
      budget: parseInt(formData.get('budget') as string) || 0,
      deadline: formData.get('deadline'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.setItem('diantesites_user_email', email);
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert("Une erreur est survenue lors de l'envoi de votre demande.");
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
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
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            existingStatus === 'pending' ? 'bg-amber-100 text-amber-600' : 
            existingStatus === 'processed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {existingStatus === 'pending' ? <Clock size={40} /> : 
             existingStatus === 'processed' ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {existingStatus === 'pending' ? 'Demande en cours' : 
             existingStatus === 'processed' ? 'Demande traitée' : 'Demande rejetée'}
          </h2>
          <p className="text-slate-600 mb-8">
            {existingStatus === 'pending' ? 
              "Votre demande est en cours d'analyse. Nous vous répondrons très prochainement." : 
              existingStatus === 'processed' ? 
              "Votre demande a été traitée ! Veuillez vérifier votre boîte mail (et vos spams) pour voir notre réponse." : 
              "Votre demande a malheureusement été rejetée. N'hésitez pas à vérifier vos emails pour plus d'informations."}
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
            Merci pour votre confiance. Nous analysons votre projet et nous vous répondrons par email sous 24 à 48h.
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
              <p className="text-slate-500 mb-10">Remplissez ce formulaire détaillé pour nous aider à comprendre votre projet.</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nom / Prénom</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="jean@exemple.fr"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Type de site souhaité</label>
                  <select 
                    required
                    name="siteType"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="landing">Landing Page (dès 200€)</option>
                    <option value="cv">Site CV (dès 220€)</option>
                    <option value="portfolio">Portfolio (dès 300€)</option>
                    <option value="vitrine">Site vitrine (dès 450€)</option>
                    <option value="restaurant">Site restaurant (dès 500€)</option>
                    <option value="association">Site association (dès 400€)</option>
                    <option value="event">Site événementiel (dès 250€)</option>
                    <option value="blog">Blog simple (dès 550€)</option>
                    <option value="autre">Autre projet simple</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Description détaillée du projet</label>
                  <textarea 
                    required
                    name="description"
                    rows={5}
                    placeholder="Décrivez votre activité, vos objectifs et ce que vous attendez du site..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nombre de pages</label>
                    <select 
                      name="pages"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none"
                    >
                      <option value="1">1 page</option>
                      <option value="2">2 pages</option>
                      <option value="3">3 pages</option>
                      <option value="4">4 pages</option>
                      <option value="5">5 pages +</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Budget estimé</label>
                    <select 
                      name="budget"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none"
                    >
                      <option value="200">200€ - 300€</option>
                      <option value="300">300€ - 500€</option>
                      <option value="500">500€ - 800€</option>
                      <option value="800">800€ +</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Délai souhaité</label>
                    <select 
                      name="deadline"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none"
                    >
                      <option value="1 semaine">Moins d'une semaine</option>
                      <option value="2 semaines">1 à 2 semaines</option>
                      <option value="1 mois">Environ 1 mois</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Besoins particuliers / Questions</label>
                  <textarea 
                    name="details"
                    rows={3}
                    placeholder="Avez-vous des demandes spécifiques ?"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                  <Info className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    En soumettant ce formulaire, vous acceptez d'être recontacté pour l'établissement d'un devis. Réponse sous 24-48h.
                  </p>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl text-lg font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200/50 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Envoyer ma demande
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Info Side */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl"
            >
              <h3 className="text-xl font-bold mb-6">Notre engagement</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <FileSignature size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Devis clair</h4>
                    <p className="text-xs text-slate-400 mt-1">Un document détaillé sans frais cachés.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Paiement sécurisé</h4>
                    <p className="text-xs text-slate-400 mt-1">Acompte de 50% via PayPal après signature.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Livraison rapide</h4>
                    <p className="text-xs text-slate-400 mt-1">Développement efficace et livraison soignée.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
              <h3 className="font-bold text-slate-900 mb-4">Rappel du processus</h3>
              <ul className="space-y-4">
                {[
                  "Signature du devis obligatoire",
                  "Acompte de 50% avant début",
                  "Validation de la maquette",
                  "Paiement du solde à la livraison",
                  "Transfert des droits d'utilisation",
                  "Tutoriel d'hébergement inclus"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
