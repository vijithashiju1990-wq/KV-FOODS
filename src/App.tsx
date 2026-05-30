import { useState, useEffect } from 'react';
import { Sparkles, Leaf, ArrowRight, Sprout, Heart } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import AIChef from './components/AIChef';
import LocalHeritage from './components/LocalHeritage';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { PRODUCTS, HERO_IMAGE } from './data';
import { CartItem, Product } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load cart state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('kvfoods_cart_v1');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to restore index cart: ", e);
    }
  }, []);

  // Save cart state to localStorage on changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('kvfoods_cart_v1', JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Failed to commit cart save: ", e);
    }
  };

  // Dynamic active section spy via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // focused in center viewport
      threshold: 0
    };

    const sectionIds = ['home', 'shop', 'box-builder', 'ai-chef', 'heritage'];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id === 'home' ? 'hero-section' : id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id === 'home' ? 'hero-section' : id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Handler to navigate smoothly to a selected layout ID
  const handleNavigateToSection = (sectionId: string) => {
    const targetId = sectionId === 'home' ? 'hero-section' : sectionId;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Cart Operation Handlers
  const handleAddProductToCart = (prod: Product, quantityToAdd = 1) => {
    const existingIndex = cart.findIndex(item => item.product.id === prod.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantityToAdd;
    } else {
      updatedCart = [...cart, { product: prod, quantity: quantityToAdd }];
    }

    saveCartToStorage(updatedCart);
    setIsCartOpen(true); // Open the basket slide-out drawer to reassure user
  };

  const handleUpdateCartQty = (productId: string, nextQty: number) => {
    if (nextQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.product.id === productId ? { ...item, quantity: nextQty } : item
    );
    saveCartToStorage(updatedCart);
  };

  const handleRemoveCartItem = (productId: string) => {
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  return (
    <div id="application-layout-parent" className="min-h-screen bg-stone-50 select-none flex flex-col justify-between overflow-x-hidden">
      
      {/* Dynamic Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigateToSection}
      />

      {/* Main Sections flow */}
      <main className="flex-1">

        {/* Home Hero Banner */}
        <div id="home">
          <Hero
            onLearnMore={handleNavigateToSection}
            heroImage={HERO_IMAGE}
          />
        </div>

        {/* Boutique Catalog Selector */}
        <ProductCatalog
          products={PRODUCTS}
          onAddProductToCart={handleAddProductToCart}
          onAddCustomBoxToCart={(customBox) => handleAddProductToCart(customBox, 1)}
        />

        {/* Gemini-Powered Recipe Nutrition Intelligence */}
        <AIChef
          products={PRODUCTS}
          onAddProductToCart={(prod) => handleAddProductToCart(prod, 1)}
        />

        {/* Nileshwar Soil & Heritage block */}
        <LocalHeritage />

      </main>

      {/* Floating sliding checkout Cart tray */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Footer Branding coordinates & dials */}
      <Footer onNavigate={handleNavigateToSection} />

    </div>
  );
}
