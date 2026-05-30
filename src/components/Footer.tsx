import { MapPin, Phone, Mail, Clock, ShieldAlert, Heart, Info, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-outlet" className="bg-stone-900 text-stone-300 font-sans select-none border-t border-stone-850">
      
      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand & Narrative */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-serif italic text-2xl font-bold text-white">
              KV<span className="text-brand-carrot">foods</span>
            </h4>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Serving premium curated cashews, dates, almonds, pristine ruby beetroots & wellness powders. Driven by wellness science and direct farm collaborations near Karuvachery Junction, Nileshwar.
            </p>

            {/* Quick Sourcing Badges */}
            <div className="flex items-center space-x-2 bg-stone-850 border border-stone-800 p-2.5 rounded-xl max-w-xs">
              <ShieldAlert className="w-5 h-5 text-brand-carrot shrink-0" />
              <div className="text-[10px] leading-snug">
                <span className="text-stone-100 font-bold block">100% Traceability Lock</span>
                <span className="text-stone-450">Track root soil-harvest schedules.</span>
              </div>
            </div>

          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h5 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest font-mono">
              Boutique Sections
            </h5>
            <ul className="text-xs sm:text-sm space-y-2.5 text-stone-400 font-semibold font-sans">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-brand-carrot hover:underline focus:outline-none transition-all cursor-pointer">
                  Marketplace catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('box-builder')} className="hover:text-brand-carrot hover:underline focus:outline-none transition-all cursor-pointer">
                  Wellness Box Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-chef')} className="hover:text-brand-carrot hover:underline focus:outline-none transition-all cursor-pointer">
                  Gemini Recipe Chef
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('heritage')} className="hover:text-brand-carrot hover:underline focus:outline-none transition-all cursor-pointer">
                  Agricultural heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Coordinates Directions Grounding */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h5 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest font-mono">
              Outlet Coordinates
            </h5>
            <ul className="text-xs sm:text-sm space-y-3.5 text-stone-400 font-sans">
              
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-brand-beet shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Registered Outlet:</strong> <br/>
                  Near Karuvachery Junction, Main Road, Nileshwar, Kasaragod, Kerala - 671314.
                </div>
              </li>

              {/* Direct Grounding Map Anchor link as guidelines mandate */}
              <li className="pt-1.5 text-[11px]">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Karuvachery+Junction+Nileshwar+Kerala"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center space-x-1 px-3 py-2 bg-stone-800 border border-stone-750 rounded-xl text-stone-200 hover:text-white hover:border-stone-700 transition"
                >
                  <span>Launch Google Maps Route</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-carrot" />
                </a>
              </li>

            </ul>
          </div>

          {/* Hotlines details */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h5 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest font-mono">
              Contact & Hours
            </h5>
            <ul className="text-xs sm:text-sm space-y-3 text-stone-400 font-sans">
              
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4.5 h-4.5 text-brand-carrot shrink-0" />
                <div>
                  <strong>Order Hotline:</strong> <br/>
                  <a href="tel:+919048606406" className="hover:text-white transition font-mono">+91 90486 06406</a>
                </div>
              </li>

              <li className="flex items-center space-x-2.5">
                <Mail className="w-4.5 h-4.5 text-stone-500 shrink-0" />
                <div>
                  <strong>Support Address:</strong> <br/>
                  <a href="mailto:order@kvfoods.com" className="hover:text-white transition font-mono">order@kvfoods.com</a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <Clock className="w-4.5 h-4.5 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Boutique Store timings:</strong> <br/>
                  Monday - Saturday: 09:00 AM - 08:30 PM <br/>
                  Sunday: Closed for farm harvesting.
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Lower copyright bar */}
      <div className="bg-stone-950 text-stone-500 py-6 border-t border-stone-850 text-xs sm:text-sm select-none font-sans text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-[11px] sm:text-xs">
            &copy; {currentYear} <strong>KV Foods Nileshwar</strong>. All rights reserved. Sourced ethically from Karuvachery agrarian circles.
          </p>

          <p className="text-[10px] text-stone-600 flex items-center justify-center space-x-1 leading-none">
            <span>Formulated with</span>
            <Heart className="w-3 h-3 text-brand-beet fill-brand-beet/20" />
            <span>for natural health & stamina in Kasaragod district.</span>
          </p>

          <button
            onClick={handleScrollToTop}
            className="text-[10px] uppercase font-bold tracking-widest text-stone-450 hover:text-white transition font-mono"
          >
            Back to Top ↑
          </button>

        </div>
      </div>

    </footer>
  );
}
