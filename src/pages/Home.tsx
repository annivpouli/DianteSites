import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Euro, 
  Smartphone, 
  Zap, 
  Users, 
  FileText, 
  Search, 
  ArrowRight,
  Monitor,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Zap size={14} />
              Simple • Rapide • Abordable
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6"
            >
              Votre site web professionnel à <span className="text-emerald-600">petit prix</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed"
            >
              Des sites simples, modernes et accessibles dès 200€. La solution idéale pour entrepreneurs, freelances et artisans.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/devis" className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-200/50 flex items-center justify-center gap-2 group">
                Demander un devis gratuit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#services" className="w-full sm:w-auto text-slate-600 hover:text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                Voir nos offres
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir ? */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Nous avons simplifié le processus pour vous offrir le meilleur rapport qualité-prix du marché.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: Smartphone, title: "Sites modernes & responsive", desc: "Adaptés à tous les écrans." },
              { icon: Euro, title: "Prix accessibles", desc: "Dès 200€, sans frais cachés." },
              { icon: Clock, title: "Livraison rapide", desc: "Votre site en ligne en un temps record." },
              { icon: Users, title: "Accompagnement personnalisé", desc: "Un interlocuteur unique pour votre projet." },
              { icon: Zap, title: "Tutoriel d’hébergement", desc: "Inclus pour vous rendre autonome." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-tight">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types de sites proposés */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Nos types de sites</h2>
            <p className="text-slate-600">Choisissez la base qui correspond à votre besoin.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Site vitrine", price: "450€", desc: "Jusqu'à 4 pages pour votre entreprise.", popular: true },
              { title: "Landing Page", price: "200€", desc: "Une page unique pour convertir vos visiteurs." },
              { title: "Site CV", price: "220€", desc: "Présentez votre parcours professionnel." },
              { title: "Portfolio", price: "300€", desc: "Mettez en avant vos réalisations." },
              { title: "Site restaurant", price: "500€", desc: "Menu, galerie et contact." },
              { title: "Site association", price: "400€", desc: "Présentez vos missions et actions." },
              { title: "Site événementiel", price: "250€", desc: "Pour un mariage, une conférence..." },
              { title: "Blog simple", price: "550€", desc: "Partagez vos articles facilement." }
            ].map((site, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.05 }}
                className={`group p-8 rounded-3xl border transition-all relative ${
                  site.popular 
                    ? 'bg-white shadow-xl border-emerald-200 ring-4 ring-emerald-500/5' 
                    : 'border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-emerald-100'
                }`}
              >
                {site.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Populaire
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{site.title}</h3>
                <div className="text-emerald-600 font-bold text-2xl mb-4">
                  <span className="text-sm font-medium text-slate-400">à partir de</span> {site.price}
                </div>
                <p className="text-sm text-slate-500 mb-6">{site.desc}</p>
                <Link to="/devis" className="text-sm font-bold text-emerald-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Choisir ce modèle <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 italic">
              "Le prix final dépendra des fonctionnalités demandées. Un devis personnalisé sera envoyé après analyse du projet."
            </p>
          </div>
        </div>
      </section>

      {/* Comment ça fonctionne ? */}
      <section id="process" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Comment ça fonctionne ?</h2>
            <p className="text-slate-400">Un processus clair et transparent, de A à Z.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { step: "01", title: "Formulaire", desc: "Vous remplissez le formulaire détaillé de demande de devis." },
              { step: "02", title: "Analyse", desc: "Nous analysons votre projet et vos besoins spécifiques." },
              { step: "03", title: "Devis", desc: "Vous recevez un devis personnalisé par email sous 48h." },
              { step: "04", title: "Signature & Acompte", desc: "Signature du devis + paiement de 50% via PayPal." },
              { step: "05", title: "Développement", desc: "Nous créons votre site selon vos instructions." },
              { step: "06", title: "Solde", desc: "Paiement des 50% restants après validation finale." },
              { step: "07", title: "Livraison", desc: "Livraison des fichiers + tutoriel d’hébergement personnalisé." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-black text-white/5 absolute -top-8 -left-4 select-none">{item.step}</div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs">{i + 1}</span>
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Ce qui est inclus dans chaque offre</h2>
              <p className="text-slate-600 mb-8">Pas de compromis sur l'essentiel. Même à petit prix, votre site est complet.</p>
              <ul className="space-y-4">
                {[
                  "Design moderne et épuré",
                  "Site responsive (mobile, tablette, ordinateur)",
                  "1 formulaire de contact simple",
                  "Optimisation SEO de base",
                  "1 à 2 séries de modifications incluses",
                  "Guide écrit pour héberger votre site"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative"
            >
              <div className="absolute -top-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                Qualité Garantie
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
                    <Monitor size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Multi-plateforme</h4>
                    <p className="text-sm text-slate-500">Votre site s'adapte parfaitement à tous les écrans.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Sécurisé & Propre</h4>
                    <p className="text-sm text-slate-500">Code optimisé pour la rapidité et la sécurité.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Documentation</h4>
                    <p className="text-sm text-slate-500">Un guide complet pour gérer votre hébergement.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Limites de l’offre low-cost */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-3xl border border-amber-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-amber-600">
              <AlertCircle size={28} />
              <h2 className="text-2xl font-bold text-slate-900">Limites de l’offre low-cost</h2>
            </div>
            <p className="text-slate-600 mb-8">Pour maintenir ces tarifs exceptionnels, nous appliquons certaines limites nécessaires :</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Nombre de pages limité (selon forfait)",
                "Pas de e-commerce complexe",
                "Pas de fonctionnalités avancées (espace membre, etc.)",
                "Site en une seule langue",
                "Révisions limitées après livraison",
                "Hébergement à la charge du client"
              ].map((limit, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                  {limit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 relative">Prêt à lancer votre projet ?</h2>
            <p className="text-xl text-emerald-50 text-emerald-100 mb-12 max-w-2xl mx-auto relative">
              Obtenez un site web professionnel sans vous ruiner. Réponse garantie sous 24-48h.
            </p>
            <Link to="/devis" className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-emerald-50 transition-all shadow-2xl relative">
              Obtenir mon devis gratuit
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
