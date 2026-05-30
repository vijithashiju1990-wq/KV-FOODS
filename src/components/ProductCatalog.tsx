import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Eye, ShoppingCart, Star, X, Check, Box, Plus, Minus, Wheat } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onAddProductToCart: (product: Product, quantity?: number) => void;
  onAddCustomBoxToCart: (customItem: Product) => void;
}

export default function ProductCatalog({ products, onAddProductToCart, onAddCustomBoxToCart }: ProductCatalogProps) {
  // Catalog states
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Box Builder state
  const [boxName, setBoxName] = useState<string>('Daily Juicer Wellness Box');
  const [boxIngredients, setBoxIngredients] = useState<Record<string, number>>({
    'v2': 1, // Crimson Glory Beetroot (in kg)
    'df1': 1, // Almonds (in 250g quantities)
    'df3': 0, // dates
    'df4': 1  // walnuts
  });

  const availableCatalogCategories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Harvests' },
    { id: 'dryfruits', label: 'Premium Dry Fruits' },
    { id: 'vegetables', label: 'Fresh Beetroots' },
    { id: 'powders', label: 'Pure Organic Powders 🍌' },
    { id: 'combos', label: 'Gourmet Wellness Combos' }
  ];

  // Filter and Sort implementation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.nutrients.some(n => n.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'caliber') {
      result.sort((a, b) => b.nutrients.length - a.nutrients.length);
    } else {
      // popular
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Box Builder values
  const builderProducts = useMemo(() => {
    return products.filter(p => !p.id.startsWith('c')); // No pre-made combos to avoid infinite combos
  }, [products]);

  const customBoxCalculations = useMemo(() => {
    let totalPrice = 0;
    const descParts: string[] = [];

    Object.entries(boxIngredients).forEach(([pid, qtyVal]) => {
      const qty = qtyVal as number;
      if (qty > 0) {
        const prod = products.find(p => p.id === pid);
        if (prod) {
          totalPrice += prod.price * qty;
          descParts.push(`${qty} x ${prod.name.replace("Fresh ", "").replace("Royal ", "")} (${prod.unit})`);
        }
      }
    });

    return {
      price: totalPrice,
      description: `Custom formulated box containing: ${descParts.join(', ')}.`
    };
  }, [boxIngredients, products]);

  const handleAdjustBoxIngredient = (pid: string, increment: boolean) => {
    const current = boxIngredients[pid] || 0;
    const nextValue = increment ? current + 1 : Math.max(0, current - 1);
    setBoxIngredients({
      ...boxIngredients,
      [pid]: nextValue
    });
  };

  const handleAddCustomBoxToCart = () => {
    if (customBoxCalculations.price === 0) {
      alert("Please add at least one ingredient to your custom box!");
      return;
    }

    const uniqueId = `custom-box-${Date.now()}`;
    const customProductEntry: Product = {
      id: uniqueId,
      name: `🎁 ${boxName}`,
      category: 'combos',
      price: customBoxCalculations.price,
      unit: "Custom Bundle Box",
      description: customBoxCalculations.description,
      imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=600",
      badge: "Formulated By You",
      nutrients: ["Tailored Wellness Boost"],
      rating: 5.0,
      reviewsCount: 1,
      stock: 99
    };

    onAddCustomBoxToCart(customProductEntry);
    alert(`Added your custom designed pack "${boxName}" directly to your checkout cart!`);
  };

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION 1: STANDARD CATALOGUE --- */}
        <div className="space-y-12">
          
          {/* Header titles */}
          <div className="text-left md:flex md:items-end md:justify-between border-b border-stone-200/60 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-brand-beet uppercase block">
                Fresh Farm Marketplace
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
                Our Premium Catalogue
              </h2>
              <p className="text-stone-500 text-sm max-w-xl font-sans">
                Browse our pristine dry fruits, nuts, sweet beetroots and premium organic health powders sourced directly from Karuvachery and Nileshwar farms.
              </p>
            </div>

            {/* Sorting controls */}
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2 items-center">
              <label className="text-xs font-bold text-stone-500 uppercase flex items-center mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1" /> Sort Catalog:
              </label>
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-beet"
              >
                <option value="popular">Bestsellers & Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="caliber">Highest Nutrients Count</option>
              </select>
            </div>
          </div>

          {/* Search bar & Category filters */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Categories */}
            <div id="catalog-category-tabs" className="flex flex-wrap gap-1.5 order-2 md:order-1">
              {availableCatalogCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-beet text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative order-1 md:order-2 w-full md:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nuts, beets, powders..."
                className="w-full bg-stone-50 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-200 focus:outline-none focus:border-brand-beet focus:bg-white transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Product Grid */}
          <div id="product-grid-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => {
                const isVeg = p.category === 'vegetables';
                return (
                  <motion.div
                    key={p.id}
                    id={`product-card-${p.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl border border-stone-150/80 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group relative"
                  >
                    
                    {/* Badge */}
                    {p.badge && (
                      <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded bg-stone-900/90 text-white font-mono text-[9px] uppercase font-bold tracking-widest bg-opacity-95">
                        {p.badge}
                      </span>
                    )}

                    {/* Image Area */}
                    <div className="relative aspect-[4/3] w-full bg-stone-50 overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1596560548464-f01068e3c7eb?auto=format&fit=crop&q=80&w=600";
                        }}
                      />
                      <button
                        id="view-overlay-btn"
                        onClick={() => setSelectedProduct(p)}
                        className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300"
                      >
                        <span className="bg-white/95 text-stone-800 rounded-full px-4 py-2 font-semibold text-xs tracking-wide shadow flex items-center space-x-1 hover:scale-105 active:scale-95 transition-all">
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          <span>View Nutrition details</span>
                        </span>
                      </button>
                    </div>

                    {/* Body Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                          {p.category === 'dryfruits' ? 'Premium Dryfruits' : p.category === 'vegetables' ? 'Fresh Beetroot' : p.category === 'powders' ? 'Organic Powders' : 'Gourmet Packs'}
                        </span>
                        <h3 className="font-serif italic font-bold text-stone-900 leading-snug group-hover:text-brand-beet transition-colors">
                          {p.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-stone-850">{p.rating}</span>
                          <span className="text-stone-400 font-medium">({p.reviewsCount} reviews)</span>
                        </div>
                      </div>

                      {/* Brief text description */}
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      {/* Nutrients tags */}
                      <div className="flex flex-wrap gap-1">
                        {p.nutrients.slice(0, 3).map((nu, idx) => (
                          <span key={idx} className="bg-stone-50 border border-stone-200 text-stone-600 font-medium text-[9px] px-1.5 py-0.5 rounded-md">
                            {nu}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Action bar */}
                    <div className="border-t border-stone-100 p-4 flex items-center justify-between text-left bg-stone-50/70">
                      
                      {/* Price box */}
                      <div>
                        <span className="font-sans font-extrabold text-stone-900 text-base sm:text-lg">
                          ₹{p.price}
                        </span>
                        <span className="text-stone-500 text-[10px] uppercase font-bold tracking-wider ml-1 block leading-none">
                          per {p.unit}
                        </span>
                      </div>

                      {/* ATC Button */}
                      <button
                        id={`atc-button-${p.id}`}
                        onClick={() => onAddProductToCart(p, 1)}
                        className={`text-xs p-2.5 rounded-xl border flex items-center justify-center space-x-1.5 shadow-sm font-semibold transition-all cursor-pointer ${
                          isVeg 
                            ? 'bg-transparent border-brand-carrot text-brand-carrot hover:bg-brand-carrot hover:text-white glow-btn-carrot'
                            : 'bg-brand-beet border-brand-beet text-white hover:bg-brand-beet-dark glow-btn-beet'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add To Basket</span>
                      </button>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State under Filter */}
          {filteredProducts.length === 0 && (
            <div className="py-16 text-center border border-dashed border-stone-200 rounded-3xl max-w-sm mx-auto">
              <Box className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-sm font-bold text-stone-700">No Matching items</h3>
              <p className="text-stone-400 text-xs mt-1.5 leading-relaxed">
                We couldn't locate products under "{searchQuery}". Try searching for categories directly like root, beet, almonds, carrots.
              </p>
            </div>
          )}

        </div>

        {/* --- SECTION 2: CUSTOM WELLNESS BOX BUILDER --- */}
        <div id="box-builder" className="mt-28 bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-850 shadow-2xl relative overflow-hidden text-left">
          
          {/* Subtle background overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-carrot/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-beet/15 rounded-full filter blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
            
            {/* Builder Configuration Panel */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-brand-carrot text-xs uppercase font-extrabold tracking-widest block">
                  🛠️ Interactive Creator Station
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-white">
                  Formulate Premium <br className="hidden sm:inline"/>
                  Wellness Selection-Boxes
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Avoid standard pre-packs! Tailor custom quantities of organic root veggies and fresh seedless nuts. We seal them cleanly in a custom organic fiber container.
                </p>
              </div>

              {/* Title input */}
              <div className="space-y-1.5 max-w-sm">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  Name Your Custom Bundle Box
                </label>
                <input
                  id="builder-box-name"
                  type="text"
                  value={boxName}
                  onChange={(e) => setBoxName(e.target.value)}
                  placeholder="My Juicer Booster Box"
                  className="w-full bg-stone-800/80 border border-stone-750 text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-carrot transition-colors"
                />
              </div>

              {/* Slider / Controls listing */}
              <div id="builder-controls-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {builderProducts.map((p) => {
                  const qty = boxIngredients[p.id] || 0;
                  const isBeet = p.id === 'v2';
                  return (
                    <div
                      key={p.id}
                      className="bg-stone-850 border border-stone-800 p-3 rounded-2xl flex items-center justify-between"
                    >
                      <div className="text-left space-y-0.5">
                        <h4 className="text-xs font-bold text-stone-200 line-clamp-1">{p.name}</h4>
                        <span className="text-[10px] font-semibold text-stone-500">
                          ₹{p.price} per {p.unit}
                        </span>
                      </div>

                      {/* Adjusted Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAdjustBoxIngredient(p.id, false)}
                          className="w-7 h-7 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer focus:outline-none active:scale-95 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleAdjustBoxIngredient(p.id, true)}
                          className="w-7 h-7 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer focus:outline-none active:scale-95 transition-all"
                        >
                          <Plus className="w-3 h-3 text-brand-carrot" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Live Visual Graphic Showcase Box */}
            <div className="lg:col-span-5 bg-stone-850 p-6 rounded-3xl border border-stone-800/80 shadow-inner flex flex-col justify-between space-y-8 h-full">
              
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <Box className="w-5 h-5 text-brand-carrot animate-bounce" />
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">
                    Pack Manifest View
                  </h4>
                </div>
                <div className="border-t border-stone-800/80 pt-2 h-44 overflow-y-auto space-y-1 scrollbar-thin">
                  {Object.entries(boxIngredients).map(([pid, qty]) => {
                    if (qty === 0) return null;
                    const prod = products.find(p => p.id === pid);
                    if (!prod) return null;
                    return (
                      <div key={pid} className="flex justify-between items-center text-xs font-sans">
                        <span className="text-stone-300">• {prod.name} ({prod.unit})</span>
                        <span className="font-mono text-stone-400 font-bold">x{qty}</span>
                      </div>
                    );
                  })}
                  {Object.values(boxIngredients).every(qty => qty === 0) && (
                    <p className="text-xs text-stone-500 italic mt-6 text-center leading-relaxed">
                      "Please add clean roots or deluxe dry fruits using coordinates controller to fill this wellness selection carrier"
                    </p>
                  )}
                </div>
              </div>

              {/* Formulated Pricing Section */}
              <div className="border-t border-stone-800 pt-4 space-y-4 text-left">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">
                      Estimated Combined Price
                    </span>
                    <h4 className="font-serif italic font-semibold text-2xl sm:text-3xl text-brand-carrot leading-none mt-1">
                      ₹{customBoxCalculations.price}
                    </h4>
                  </div>
                  <span className="bg-stone-800 border border-stone-700 font-mono text-[9px] text-stone-400 uppercase font-bold tracking-widest px-2.5 py-1 rounded-md leading-none">
                    Excluding shipping
                  </span>
                </div>

                <button
                  id="checkout-custom-box-btn"
                  onClick={handleAddCustomBoxToCart}
                  className="w-full py-3.5 rounded-2xl bg-brand-carrot hover:bg-brand-carrot/95 text-white font-semibold text-sm transition-all focus:outline-none shadow-md cursor-pointer active:scale-98 glow-btn-carrot text-center"
                >
                  <span>Lock In Custom Pack 📦</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* --- MODAL DIALOGUE: NUTRITIONAL SPOTLIGHT DETAIL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 z-10 text-left"
            >
              
              {/* Close Button */}
              <button
                id="close-detail-modal-btn"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100/85 hover:bg-stone-200/90 text-stone-600 hover:text-stone-900 transition-all focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Main Display banner photo */}
              <div className="relative aspect-video w-full bg-stone-100">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent p-5 sm:p-6 flex items-end">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-carrot">
                      Nutrition Spotlight Key
                    </span>
                    <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-white">
                      {selectedProduct.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Detail list contents */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Description Text */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                    Sourcing Narrative
                  </h4>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Micro Nutrients list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                    High Concentrated Micronutrients
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.nutrients.map((nut, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                        <Check className="w-3.5 h-3.5 text-brand-carrot" />
                        <span className="text-xs font-bold text-stone-700">{nut}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra specifics & Checkout button */}
                <div className="border-t border-stone-100 pt-5 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Individual Pricing unit
                    </span>
                    <span className="font-sans font-extrabold text-stone-900 text-xl leading-none">
                      ₹{selectedProduct.price}
                    </span>
                    <span className="text-stone-500 text-xs ml-1 font-semibold">
                      per {selectedProduct.unit}
                    </span>
                  </div>

                  <button
                    id="modal-quick-atc-btn"
                    onClick={() => {
                      onAddProductToCart(selectedProduct, 1);
                      setSelectedProduct(null);
                    }}
                    className="px-5 py-3 rounded-xl bg-brand-beet text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-brand-beet-dark glow-btn-beet active:scale-97 cursor-pointer"
                  >
                    Add Direct to Basket
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
