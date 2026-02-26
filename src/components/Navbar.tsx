import { Link } from 'react-router-dom';
import { Layout, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
              <Layout size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">DianteSites</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Accueil</Link>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Services</a>
            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Fonctionnement</a>
            <Link to="/devis" className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95">
              Demander un devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-900">Accueil</Link>
              <a href="#services" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-900">Services</a>
              <a href="#process" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-900">Fonctionnement</a>
              <Link to="/devis" onClick={() => setIsOpen(false)} className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-semibold">
                Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
