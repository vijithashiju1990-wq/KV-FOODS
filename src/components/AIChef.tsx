import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingCart, Timer, Flame, Dumbbell, ShieldCheck, UserCheck, Heart, AlertCircle, RefreshCw } from 'lucide-react';
import { RecipeResult, Product } from '../types';

interface AIChefProps {
  products: Product[];
  onAddProductToCart: (product: Product) => void;
}

const NUTRITION_TIPS = [
  "beet beetroot is rich in inorganic nitrates, enabling better oxygen uptake to muscles—boosting stamina naturally.",
  "🥜 Walnuts boast extraordinary Alpha-Linolenic Acid (Omega-3), supporting brain synapse pathways and memory precision.",
  "🍯 Consuming Dates alongside almonds balances glycemic indexes, providing slow-burn glycogen instead of high sugar spikes.",
  "👶 Sprouted Ragi paired with Green Banana Powder hosts a calcium-dense starch structure ideal for smooth digestion and baby vitality."
];

export default function AIChef({ products, onAddProductToCart }: AIChefProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['Crimson Glory Beetroot', 'Royal Jumbo Almonds']);
  const [goal, setGoal] = useState<string>('Skin Glow & Blood Cleansing');
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<RecipeResult | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState<number>(0);

  const availableIngredients = products.filter(p => !p.id.startsWith('c')); // individual ingredients only

  const wellnessGoals = [
    { title: "Skin Glow & Blood Cleansing", desc: "For flawless radiance & hemoglobin reinforcement", icon: <Heart className="w-5 h-5 text-pink-600" /> },
    { title: "High-Energy Athletic stamina", desc: "Oxygen booster & power muscles recovery workout", icon: <Dumbbell className="w-5 h-5 text-amber-600" /> },
    { title: "Cognitive Focus & Brain Polish", desc: "Omega fatty brain fuel & nerves health support", icon: <Sparkles className="w-5 h-5 text-indigo-600" /> },
    { title: "Immunity Boost & Joint Shield", desc: "Anti-inflammatory curcuminoids & ginger digestive health", icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> }
  ];

  const handleToggleIngredient = (name: string) => {
    if (selectedIngredients.includes(name)) {
      if (selectedIngredients.length > 1) {
        setSelectedIngredients(selectedIngredients.filter(i => i !== name));
      }
    } else {
      setSelectedIngredients([...selectedIngredients, name]);
    }
  };

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe(null);
    setErrorCode(null);

    // Tip cycling interval
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % NUTRITION_TIPS.length);
    }, 4000);

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedIngredients,
          goal
        })
      });

      if (!response.ok) {
        const errObj = await response.json();
        throw new Error(errObj.error || "Failed server request.");
      }

      const data: RecipeResult = await response.json();
      setRecipe(data);
    } catch (err: any) {
      console.error(err);
      setErrorCode(err.message || "Something went wrong.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleAddAllIngredients = () => {
    if (!recipe) return;
    let productsAddedCount = 0;
    // Walk through selected ingredients and add matching products to cart
    selectedIngredients.forEach(ingName => {
      const matchedProduct = products.find(p => p.name === ingName);
      if (matchedProduct) {
        onAddProductToCart(matchedProduct);
        productsAddedCount++;
      }
    });

    // Flash small alert
    alert(`Successfully added ${productsAddedCount} raw items from this recipe direct to your cart! Check the checkout cart sidebar.`);
  };

  return (
    <section id="ai-chef" className="py-20 bg-stone-100/50 border-y border-stone-200/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-beet/10 text-brand-beet text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Wellness Assistant</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
            Gourmet Recipe & Wellness Planner
          </h2>
          <p className="font-sans text-stone-500 text-sm sm:text-base">
            Select ingredients available in our boutique shop, assign a personal wellness goal, and let our Gemini-powered culinary AI compose high-nutrition food blueprints.
          </p>
        </div>

        {/* Configuration Setup Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Ingredient & Goal Selection Column */}
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            
            {/* Step 1: Selector */}
            <div className="space-y-3 text-left">
              <label className="text-xs font-extrabold uppercase tracking-widest text-stone-500 flex items-center justify-between">
                <span>1. Choose Ingredients</span>
                <span className="text-[10px] font-medium text-brand-beet">({selectedIngredients.length} selected)</span>
              </label>
              
              <div id="ingredient-pills-container" className="flex flex-wrap gap-2">
                {availableIngredients.map((ing) => {
                  const isSelected = selectedIngredients.includes(ing.name);
                  const isCarrotOrBeet = ing.id === 'v2' || ing.id === 'p2' || ing.id === 'p3';
                  
                  const getIcon = (id: string, name: string) => {
                    if (id === 'v2' || id === 'p2') return '🔴';
                    if (id === 'p3') return '🥕';
                    if (id === 'p1') return '🍌';
                    if (id === 'p4') return '🍈';
                    if (id === 'p5') return '👶';
                    if (name.toLowerCase().includes('date')) return '🌴';
                    return '🥜';
                  };

                  return (
                    <button
                      key={ing.id}
                      id={`pill-${ing.id}`}
                      onClick={() => handleToggleIngredient(ing.name)}
                      className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold border transition-all text-left flex items-center space-x-1.5 focus:outline-none cursor-pointer ${
                        isSelected
                          ? isCarrotOrBeet
                            ? 'bg-brand-beet text-white border-brand-beet shadow-sm'
                            : 'bg-brand-carrot text-white border-brand-carrot shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <span>{getIcon(ing.id, ing.name)} {ing.name.replace("Fresh ", "").replace("Royal ", "").replace("Exquisite ", "").replace("Soft ", "").replace("Authentic ", "")}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Goal selector */}
            <div className="space-y-3 text-left">
              <label className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                2. Target Wellness Objective
              </label>
              <div id="goals-list-container" className="space-y-2">
                {wellnessGoals.map((g) => {
                  const isSelected = goal === g.title;
                  return (
                    <button
                      key={g.title}
                      id={`goal-${g.title.toLowerCase().replace(/ /g, '-')}`}
                      onClick={() => setGoal(g.title)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start space-x-3 focus:outline-none cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-white'}`}>
                        {g.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold leading-snug">{g.title}</h4>
                        <p className={`text-[10px] leading-snug mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {g.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trigger Button */}
            <button
              id="ai-generate-recipe-btn"
              onClick={generateRecipe}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all focus:outline-none shadow-md cursor-pointer flex items-center justify-center space-x-2 ${
                loading
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-brand-beet text-white hover:bg-brand-beet-dark glow-btn-beet active:scale-98'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-400" />
                  <span>Consulting Nutritionist Chef...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-brand-carrot fill-brand-carrot/25 animate-pulse" />
                  <span>Formulate Wellness Recipe</span>
                </>
              )}
            </button>

          </div>

          {/* AI Output Result Box Column */}
          <div className="md:col-span-7 h-full flex flex-col justify-stretch">
            
            <AnimatePresence mode="wait">
              {/* Scenario 1: Idle state */}
              {!loading && !recipe && !errorCode && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/70 border border-stone-200 p-8 rounded-3xl min-h-[460px] flex flex-col items-center justify-center text-center shadow-inner"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-beet/5 text-brand-beet flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-brand-beet animate-pulse" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800">Your Gourmet Recipe Appears Here</h3>
                  <p className="text-stone-500 text-sm max-w-sm mt-1.5 leading-relaxed">
                    Set your desired ingredients on the configure panel and trigger our AI. Perfect customized beet and carrot solutions await!
                  </p>
                </motion.div>
              )}

              {/* Scenario 2: Loading State */}
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-stone-200 p-8 rounded-3xl min-h-[460px] flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden"
                >
                  {/* Visual Background Ripple */}
                  <div className="absolute inset-0 bg-stone-50/50 -z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-brand-beet/15 rounded-full animate-ping opacity-50" />
                  
                  <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-stone-100 border-t-brand-beet animate-spin" />
                    <Sparkles className="w-8 h-8 text-brand-beet animate-bounce" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">Analyzing Nutrisigns...</h3>
                  <p className="text-brand-beet text-xs font-extrabold uppercase tracking-widest">
                    AI Kitchen is Active
                  </p>

                  {/* Fact Cycle Card */}
                  <div className="mt-8 p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-md w-full animate-pulse text-left shadow-sm">
                    <span className="text-[10px] font-bold text-brand-carrot uppercase tracking-widest block mb-1">
                      Wellness Science Insight
                    </span>
                    <p className="text-stone-600 text-xs leading-relaxed font-sans font-medium">
                      {NUTRITION_TIPS[tipIndex]}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Scenario 3: Error state */}
              {!loading && errorCode && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 p-8 rounded-3xl min-h-[460px] flex flex-col items-center justify-center text-center shadow-sm"
                >
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-red-900">API Key Authorization Needed</h3>
                  <p className="text-red-700 text-xs sm:text-sm max-w-sm mt-2 leading-relaxed">
                    The Express backend couldn't trace a valid <strong>GEMINI_API_KEY</strong>. Ensure you have authorized your API key in the <strong>Settings &gt; Secrets</strong> pane.
                  </p>
                  <button
                    id="retry-gen-btn"
                    onClick={generateRecipe}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md focus:outline-none cursor-pointer"
                  >
                    Attempt Retry
                  </button>
                </motion.div>
              )}

              {/* Scenario 4: Successful Output display */}
              {!loading && recipe && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl text-left shadow-lg space-y-6"
                >
                  {/* Top Badges Meta */}
                  <div className="flex flex-wrap items-center gap-3 border-b border-stone-100 pb-4">
                    <div className="p-1 px-3 bg-brand-beet/10 rounded-full text-brand-beet text-xs font-bold font-sans">
                      {goal}
                    </div>
                    <div className="flex items-center text-stone-500 text-xs font-semibold">
                      <Timer className="w-3.5 h-3.5 mr-1 text-stone-400" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center text-stone-500 text-xs font-semibold">
                      <UserCheck className="w-3.5 h-3.5 mr-1 text-stone-400" />
                      {recipe.servings}
                    </div>
                  </div>

                  {/* Main Header */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 leading-snug tracking-tight">
                      {recipe.recipeName}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed font-sans italic">
                      "{recipe.description}"
                    </p>
                  </div>

                  {/* Spotlight Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-200/50">
                    <span className="text-[10px] font-bold text-brand-carrot uppercase tracking-wider block mb-1">
                      ⭐ KV Foods Premium Spotlight
                    </span>
                    <p className="text-stone-700 text-xs leading-relaxed font-sans font-semibold">
                      {recipe.kvSpotlight}
                    </p>
                  </div>

                  {/* Split checklist & steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                    
                    {/* Ingredients Checklist */}
                    <div className="sm:col-span-5 space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                        Required Ingredients
                      </h4>
                      <ul id="recipe-ingredients-checklist" className="space-y-1.5 text-xs text-stone-700 font-sans">
                        {recipe.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-brand-beet font-bold select-none">•</span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step-by-Step cooking instructions */}
                    <div className="sm:col-span-7 space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                        Preparation Blueprint
                      </h4>
                      <ol id="recipe-steps-list" className="space-y-3 text-xs text-stone-700 font-sans">
                        {recipe.steps.map((st, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5">
                            <span className="w-5 h-5 rounded-full bg-brand-beet/15 border border-brand-beet/30 text-brand-beet text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 select-none">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                  </div>

                  {/* Key Benefits Spotlight banner */}
                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500 text-left">
                      Expected Wellness Payoffs
                    </h4>
                    <div id="recipe-benefits-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recipe.benefits.map((bn, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                          <Heart className="w-4 h-4 text-brand-beet shrink-0" />
                          <span className="text-[11px] font-bold text-stone-700 line-clamp-1">{bn}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cart Interaction Integration */}
                  <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-stone-800">Love this Wellness Setup?</h4>
                      <p className="text-[10px] text-stone-500">Get the exact soil-crops and handpicked nuts sent directly to you!</p>
                    </div>
                    <button
                      id="ai-add-raw-ingredients-btn"
                      onClick={handleAddAllIngredients}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-900 text-white font-semibold text-xs tracking-wide uppercase shadow-md hover:bg-stone-850 active:scale-97 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-brand-carrot" />
                      <span>Add Raw items to Cart</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
