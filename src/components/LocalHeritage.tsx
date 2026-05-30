import { Sprout, Users, Map, Star, GraduationCap } from 'lucide-react';
import { LOCAL_HERITAGE_FACTS, TESTIMONIALS } from '../data';

export default function LocalHeritage() {
  return (
    <section id="heritage" className="py-20 bg-stone-50 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-beet text-xs font-bold uppercase tracking-widest block">
            📍 Origin Heritage story
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
            Nurtured by the Soil of Karuvachery
          </h2>
          <p className="font-sans text-stone-500 text-sm sm:text-base leading-relaxed">
            Nileshwar (Nileshwaram), the legendary cultural capital of Kasaragod, is bounded by tranquil backwaters, rivers, and deep agricultural heritage. We source directly from small holdings centered around Karuvachery.
          </p>
        </div>

        {/* Heritage Facts Grid */}
        <div id="heritage-facts-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOCAL_HERITAGE_FACTS.map((fact, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-stone-250 p-6 sm:p-8 space-y-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-beet/10 text-brand-beet flex items-center justify-center">
                  {index === 0 ? (
                    <Map className="w-6 h-6" />
                  ) : index === 1 ? (
                    <Sprout className="w-6 h-6" />
                  ) : (
                    <GraduationCap className="w-6 h-6" />
                  )}
                </div>
                
                <h3 className="font-serif italic text-xl font-bold text-stone-900 leading-tight">
                  {fact.title}
                </h3>
                
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {fact.description}
                </p>

                <div className="border-t border-stone-100 pt-3 flex items-center text-[10px] font-bold text-brand-carrot uppercase tracking-wider">
                  <span className="bg-brand-carrot/10 p-1 rounded-md text-brand-carrot mr-1.5 font-sans leading-none">
                    ★
                  </span>
                  {fact.highlight}
                </div>
              </div>
            );
          })}
        </div>

        {/* farm-to-table sequence display map */}
        <div id="timeline-card" className="bg-stone-900 rounded-3xl text-white p-6 sm:p-10 border border-stone-850 shadow-xl overflow-hidden relative text-left">
          
          <div className="relative z-10 space-y-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 tracking-tight text-center">
              Our 3-Step Clean-Chain System
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
              
              {/* Connector line on desktop */}
              <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-stone-800" />
              
              {/* Step 1 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brand-carrot text-white font-mono text-sm font-extrabold flex items-center justify-center shadow-lg relative z-10 border-4 border-stone-900 leading-none">
                  01
                </div>
                <h4 className="text-sm font-bold text-stone-150 uppercase tracking-wider">Organic Extraction</h4>
                <p className="text-stone-400 text-xs max-w-xs leading-relaxed">
                  Root veggies are raised in pesticide-free deep clay loams of Karuvachery. We extract only in the cool morning dew window.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brand-beet text-white font-mono text-sm font-extrabold flex items-center justify-center shadow-lg relative z-10 border-4 border-stone-900 leading-none">
                  02
                </div>
                <h4 className="text-sm font-bold text-stone-150 uppercase tracking-wider">Arduous Selection</h4>
                <p className="text-stone-400 text-xs max-w-xs leading-relaxed">
                  We filter each almond, date, cashew, beetroot, and pure organic powder. De-cored, sorted, ensuring high standards on every parcel.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white font-mono text-sm font-extrabold flex items-center justify-center shadow-lg relative z-10 border-4 border-stone-900 leading-none">
                  03
                </div>
                <h4 className="text-sm font-bold text-stone-150 uppercase tracking-wider">Clean-Sealed Lock</h4>
                <p className="text-stone-400 text-xs max-w-xs leading-relaxed">
                  Dual-rinsed Root Crops and vacuum sealed Premium Dried fruits are stored in moisture-locked containers for perfect freshness.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Testimonials block */}
        <div id="testimonials-block" className="space-y-10">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h3 className="font-serif italic text-2xl font-semibold text-stone-950">
              Endorsed by Families of Nileshwar
            </h3>
            <p className="text-stone-400 text-xs font-sans">
              Real opinions of people choosing authentic nutrition.
            </p>
          </div>

          <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => {
              return (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 text-left flex flex-col justify-between shadow-sm relative hover:border-brand-beet/20 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm font-sans leading-relaxed tracking-tight select-none">
                      "{t.text}"
                    </p>
                  </div>
                  
                  <div className="border-t border-stone-100 pt-3 mt-4 flex justify-between items-center text-xs font-sans">
                    <div>
                      <h5 className="font-bold text-stone-900">{t.name}</h5>
                      <span className="text-stone-400 text-[10px] uppercase tracking-wider font-extrabold">{t.role}</span>
                    </div>
                    <span className="bg-stone-50 border border-stone-150 text-stone-600 font-bold px-2.5 py-1 rounded-full text-[10px]">
                      {t.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
