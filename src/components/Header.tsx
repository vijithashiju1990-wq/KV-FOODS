import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Leaf, Sparkles, MapPin, Apple, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cart, onOpenCart, activeSection, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Boutique Shop' },
    { id: 'box-builder', label: 'Custom Box Builder' },
    { id: 'ai-chef', label: 'Wellness AI', icon: <Sparkles className="w-3.5 h-3.5 text-brand-beet inline ml-1 mr-0.5 animate-pulse" /> },
    { id: 'heritage', label: 'Our Heritage' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200/50 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-beet/10 flex items-center justify-center text-brand-beet group-hover:bg-brand-beet/20 transition-all">
              <Leaf className="w-5 h-5 text-brand-beet fill-brand-beet/20" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-sans font-extrabold text-xl tracking-tight text-stone-900">KV</span>
                <span className="font-serif italic font-semibold text-xl text-brand-carrot ml-0.5">foods</span>
              </div>
              <div className="text-[10px] font-mono text-stone-500 tracking-wider uppercase flex items-center">
                <MapPin className="w-2.5 h-2.5 mr-0.5 text-brand-beet" /> Karuvachery, Nileshwar
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all relative ${
                  activeSection === item.id
                    ? 'text-brand-beet'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-stone-100 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
                {item.icon}
              </button>
            ))}
          </nav>

          {/* Action Buttons (Cart / Mobile Menu Toggle) */}
          <div className="flex items-center space-x-2">
            
            {/* Shopping Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-brand-beet hover:bg-stone-100 transition-all focus:outline-none"
              aria-label="Toggle Shopping Cart"
            >
              <ShoppingCart className="w-[22px] h-[22px]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    id="cart-badge-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-brand-beet text-white font-sans font-bold text-[10px] flex items-center justify-center border-2 border-white leading-none shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-stone-700 hover:text-brand-beet hover:bg-stone-100 transition-all focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden shadow-lg absolute w-full left-0 right-0"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activeSection === item.id
                      ? 'bg-brand-beet/5 text-brand-beet pl-6 border-l-4 border-brand-beet'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center">
                    {item.label}
                    {item.icon && <span className="ml-2">{item.icon}</span>}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
