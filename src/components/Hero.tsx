import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Sprout, Heart, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onLearnMore: (sectionId: string) => void;
  heroImage: string;
}

export default function Hero({ onLearnMore, heroImage }: HeroProps) {
  return (
    <section id="hero-section" className="relative pt-24 pb-16 md:pt-36 md:pb-24 lg:pb-32 overflow-hidden bg-gradient-to-b from-stone-50 via-stone-100/30 to-white">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-carrot/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-beet/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 z-10">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-beet/10 border border-brand-beet/20 text-xs sm:text-sm font-semibold tracking-wide text-brand-beet uppercase"
            >
              <Sprout className="w-4 h-4 mr-1 text-brand-beet fill-brand-beet/10" />
              <span>Nileshwar's Premier Organic Collective</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              <h1 className="font-serif leading-tight text-4xl sm:text-5xl lg:text-6.5xl font-semibold text-stone-900 tracking-tight">
                Premium Dry Fruits <br className="hidden sm:inline" />
                & Organic{" "}
                <span className="text-gradient">
                  Beetroots & Powders
                </span>
              </h1>
              <p className="font-sans text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
                Welcome to <strong className="text-stone-800">KV Foods</strong> in Karuvachery, Nileshwar. We supply handpicked elite nuts, natural dates, and premium farm-fresh soil-crops bursting with flavor, color, and maximum vitality.
              </p>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="hero-shop-cta"
                onClick={() => onLearnMore('shop')}
                className="group inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-brand-beet hover:bg-brand-beet-dark text-white font-semibold text-sm transition-all shadow-lg glow-btn-beet cursor-pointer hover:shadow-xl active:scale-98"
              >
                <span>Boutique Catalog</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-ai-cta"
                onClick={() => onLearnMore('ai-chef')}
                className="group inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-850 text-white font-semibold text-sm transition-all shadow-md cursor-pointer hover:shadow-lg active:scale-98"
              >
                <Sparkles className="w-4 h-4 mr-2 text-brand-carrot fill-brand-carrot/20 animate-pulse" />
                <span>Test Wellness AI Nutritionist</span>
              </button>
            </motion.div>

            {/* Quick Benefits Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 border-t border-stone-200/60 pt-6 sm:pt-8"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-green-500/10 text-green-700">
                  <Sprout className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-stone-800">Fresh Soil Grown</h4>
                  <p className="text-[10px] text-stone-500">Pure Karuvachery Clay</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-700">
                  <Heart className="w-4 h-4 text-brand-beet" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-stone-800">Omega-3 & Foliate</h4>
                  <p className="text-[10px] text-stone-500">Premium Dry Fruits</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
                  <ShieldCheck className="w-4 h-4 text-brand-carrot" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-stone-800">100% Selected</h4>
                  <p className="text-[10px] text-stone-500">Elite Grade Quality</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Banner Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center z-10"
          >
            <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 hover:scale-101 transition-all duration-500 bg-stone-100">
              
              <img
                src={heroImage}
                alt="KV Foods Premium Harvest of Beetroots, Powders and dry fruits"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image fails to resolve
                  e.currentTarget.src = "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=800";
                }}
              />
              
              {/* Overlaid Badges */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent p-6 text-left">
                <span className="px-2 py-0.5 rounded bg-brand-carrot text-white text-[10px] uppercase font-bold tracking-wider">
                  Live Showcase
                </span>
                <p className="text-white text-sm font-semibold mt-1 font-serif italic">
                  "Authentic Dry Fruits & Clean Karuvachery Powders"
                </p>
                <p className="text-stone-300 text-[11px] mt-0.5">
                  Hand-arranged & packaged freshly near Nileshwar.
                </p>
              </div>

              {/* Floating Widget */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-white/40 text-left flex items-center space-x-2 animate-bounce">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-stone-800">Fresh Harvest Today</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
