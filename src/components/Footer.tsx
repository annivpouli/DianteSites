import { Link } from 'react-router-dom';
import { Layout, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                <Layout size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">DianteSites</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Des sites web professionnels, modernes et accessibles pour entrepreneurs, freelances et artisans.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Accueil</Link></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-emerald-400 transition-colors">Comment ça marche</a></li>
              <li><Link to="/devis" className="hover:text-emerald-400 transition-colors">Demander un devis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Légal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">CGV</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-400" />
                <span>diante1351@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DianteSites. Tous droits réservés. Création de sites web low-cost de qualité.</p>
        </div>
      </div>
    </footer>
  );
}
