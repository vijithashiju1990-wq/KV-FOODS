import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, MapPin, Sparkles, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function Cart({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onClearCart }: CartProps) {
  // Checkout sequence state
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  
  // Checkout forms state
  const [names, setNames] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Karuvachery, Nileshwar');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const subTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cart]);

  const deliveryCharges = useMemo(() => {
    if (deliveryMethod === 'pickup') return 0;
    return subTotal > 500 ? 0 : 30; // Free delivery above 500
  }, [subTotal, deliveryMethod]);

  const totalPayable = subTotal + deliveryCharges;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!names.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in your name, contact phone, and delivery address to seal your harvest order.");
      return;
    }
    setCheckoutStep('success');
  };

  const resetAllAfterSuccess = () => {
    onClearCart();
    setCheckoutStep('cart');
    setNames('');
    setPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Sliding panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 sm:pl-16">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col h-full text-left"
            >
              
              {/* Header inside drawer */}
              <div className="p-6 border-b border-stone-150 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-brand-beet" />
                  <h3 className="font-serif italic font-bold text-stone-900 text-lg sm:text-xl">
                    {checkoutStep === 'success' ? 'Order Confirmed!' : 'Your Nutrition Basket'}
                  </h3>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="p-1 px-[7.5px] py-[6px] rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content depending on state */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Cart listing */}
                  {checkoutStep === 'cart' && (
                    <motion.div
                      key="cart-listing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 h-full"
                    >
                      {cart.length === 0 ? (
                        <div className="pt-20 text-center space-y-4 max-w-xs mx-auto">
                          <div className="w-16 h-16 rounded-full bg-brand-carrot/10 text-brand-carrot flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-8 h-8 text-brand-carrot" />
                          </div>
                          <h4 className="font-serif text-base font-bold text-stone-800">Your Basket is Empty</h4>
                          <p className="text-stone-400 text-xs leading-relaxed">
                            Start adding sweet root beetcrops or crunchy almonds from our premium catalogue to activate the checkout process!
                          </p>
                          <button
                            id="back-to-shop-btn"
                            onClick={onClose}
                            className="bg-brand-beet text-white font-semibold text-xs py-2.5 px-4 rounded-xl cursor-pointer shadow-sm glow-btn-beet whitespace-nowrap"
                          >
                            Explore Marketplace
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cart.map((item) => {
                            const isCustomBox = item.product.id.startsWith('custom-box');
                            return (
                              <div
                                key={item.product.id}
                                className="flex items-center space-x-3 bg-stone-50 p-3 rounded-2xl border border-stone-200"
                              >
                                {/* product avatar */}
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                                  <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      e.currentTarget.src = "https://images.unsplash.com/photo-1596560548464-f01068e3c7eb?auto=format&fit=crop&q=80&w=600";
                                    }}
                                  />
                                </div>

                                {/* core descriptions */}
                                <div className="flex-1 min-w-0 space-y-1">
                                  <h4 className="text-xs font-bold text-stone-900 leading-tight truncate">
                                    {item.product.name}
                                  </h4>
                                  <p className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">
                                    ₹{item.product.price} per {item.product.unit}
                                  </p>
                                  
                                  {/* customized details line */}
                                  {isCustomBox && (
                                    <p className="text-[9px] text-stone-500 italic line-clamp-1">
                                      Custom composite mix builder
                                    </p>
                                  )}

                                  {/* Counters controllers */}
                                  <div className="flex items-center space-x-1.5 pt-1">
                                    <button
                                      id={`qty-dec-${item.product.id}`}
                                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      className={`w-5.5 h-5.5 bg-white border border-stone-250 rounded flex items-center justify-center font-bold text-[10px] cursor-pointer focus:outline-none ${item.quantity <= 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
                                    >
                                      <Minus className="w-2.5 h-2.5 text-stone-500" />
                                    </button>
                                    <span className="font-mono text-xs font-semibold w-5 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      id={`qty-inc-${item.product.id}`}
                                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                                      className="w-5.5 h-5.5 bg-white border border-stone-250 rounded flex items-center justify-center font-bold text-[10px] cursor-pointer focus:outline-none"
                                    >
                                      <Plus className="w-2.5 h-2.5 text-brand-beet" />
                                    </button>
                                  </div>

                                </div>

                                {/* Right action buttons & multipliers */}
                                <div className="text-right flex flex-col justify-between h-16 shrink-0">
                                  <button
                                    id={`remove-${item.product.id}`}
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="p-1 rounded-md text-stone-400 hover:text-red-500 transition-colors focus:outline-none ml-auto"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <span className="font-mono text-sm font-bold text-stone-900 leading-none">
                                    ₹{item.product.price * item.quantity}
                                  </span>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Shipping and contact checkout form */}
                  {checkoutStep === 'shipping' && (
                    <motion.form
                      key="shipping-form"
                      onSubmit={handlePlaceOrder}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5 text-left"
                    >
                      <span className="text-[10px] font-bold text-brand-beet uppercase tracking-widest block">
                        Finalizing delivery coordinates
                      </span>

                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-500 uppercase tracking-wider block">
                          Your Complete Name
                        </label>
                        <input
                          id="checkout-name"
                          type="text"
                          required
                          value={names}
                          onChange={(e) => setNames(e.target.value)}
                          placeholder="Shaji Varghese"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-beet transition-colors"
                        />
                      </div>

                      {/* Contact phone number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-500 uppercase tracking-wider flex items-center justify-between">
                          <span>Contact WhatsApp/Mobile</span>
                          <Phone className="w-3.5 h-3.5 text-brand-carrot" />
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9845722130"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-beet transition-colors"
                        />
                      </div>

                      {/* Delivery Mode options */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-stone-500 uppercase tracking-wider block">
                          Fulfillment Choice
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`p-3.5 rounded-xl border text-sm font-semibold transition-all focus:outline-none ${
                              deliveryMethod === 'delivery'
                                ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            Home Delivery
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('pickup')}
                            className={`p-3.5 rounded-xl border text-sm font-semibold transition-all focus:outline-none ${
                              deliveryMethod === 'pickup'
                                ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            Boutique Pickup
                          </button>
                        </div>
                      </div>

                      {/* Address / Pick notes */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-500 uppercase tracking-wider block">
                          {deliveryMethod === 'delivery' ? 'Home/Office Shipping Address' : 'Boutique Store Location'}
                        </label>
                        {deliveryMethod === 'delivery' ? (
                          <textarea
                            id="checkout-address"
                            required
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="House No. 34, Karuvachery Hill, Nileshwar, Kasaragod district, Kerala - 671314"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:border-brand-beet transition-colors"
                          />
                        ) : (
                          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-1.5">
                            <span className="font-extrabold text-brand-carrot block">📍 KV Foods Boutique Outlet</span>
                            <p>Near Karuvachery Junction, Nileshwar Main Road, Nileshwar, Kerala - 671314.</p>
                            <p className="font-semibold text-stone-500">Pick hours: Mon-Sat 09:00 AM - 08:30 PM</p>
                          </div>
                        )}
                      </div>

                    </motion.form>
                  )}

                  {/* Step 3: Receipt Success display */}
                  {checkoutStep === 'success' && (
                    <motion.div
                      key="checkout-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-6 pt-6"
                    >
                      <div className="w-16 h-16 bg-green-500/10 border border-green-500/25 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-9 h-9" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif italic font-bold text-stone-900 text-xl">Thank you, {names}!</h4>
                        <p className="text-stone-400 text-[11px] font-sans">
                          Your fresh selection has been logged under ID <strong className="text-stone-600 font-mono font-bold">KVF-{Math.floor(Date.now()/10000)}</strong>.
                        </p>
                      </div>

                      {/* Structured Receipt Summary card */}
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 divide-y divide-stone-200/55 text-left text-xs font-sans space-y-3">
                        
                        <div className="space-y-1 text-stone-650 pt-1">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                            LOGISTICS SPECS
                          </span>
                          <p><strong>Fulfillment Method:</strong> {deliveryMethod === 'delivery' ? 'Kasaragod Premium Home Shipping' : 'Karuvachery Shop Pick-up'}</p>
                          <p><strong>Registered Phone:</strong> {phone}</p>
                          {deliveryMethod === 'delivery' && (
                            <p className="line-clamp-2"><strong>Dispatch Address:</strong> {address}</p>
                          )}
                        </div>

                        <div className="pt-3 font-mono space-y-0.5">
                          <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block mb-1">
                            FINANCIAL RECAP
                          </span>
                          <div className="flex justify-between font-sans text-xs">
                            <span className="text-stone-500">Items Gross:</span>
                            <span className="font-semibold text-stone-850">₹{subTotal}</span>
                          </div>
                          <div className="flex justify-between font-sans text-xs">
                            <span className="text-stone-500">Ship Charge:</span>
                            <span className="font-semibold text-stone-850">₹{deliveryCharges}</span>
                          </div>
                          <div className="flex justify-between font-mono text-sm font-bold text-brand-beet border-t border-dashed border-stone-200 pt-2 mt-1">
                            <span>TOTAL PAID:</span>
                            <span>₹{totalPayable}</span>
                          </div>
                        </div>

                      </div>

                      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-left text-[11px] leading-relaxed text-stone-650 flex items-start space-x-2 animate-pulse">
                        <Sparkles className="w-5 h-5 text-brand-carrot shrink-0 mt-0.5" />
                        <span>Our delivery specialists near Nileshwar coordinate routes daily. A dispatch SMS will update pathing schedules synchronously!</span>
                      </div>

                      <button
                        id="receipt-return-btn"
                        onClick={resetAllAfterSuccess}
                        className="w-full py-4 rounded-2xl bg-stone-900 border border-stone-900 text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-stone-800 active:scale-97 cursor-pointer"
                      >
                        Keep Browsing Harvests
                      </button>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Sticky bottom panel summary for Step 1 & 2 */}
              {checkoutStep !== 'success' && cart.length > 0 && (
                <div className="border-t border-stone-150 p-6 bg-stone-50 space-y-4">
                  
                  <div className="space-y-1.5 font-sans">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-500 font-semibold">Net subtotal:</span>
                      <span className="font-bold text-stone-900 text-sm">₹{subTotal}</span>
                    </div>
                    {checkoutStep === 'shipping' && (
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500 font-semibold">Logistics charge:</span>
                        <span className="font-bold text-stone-950 text-sm">₹{deliveryCharges}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-end border-t border-stone-200/80 pt-2.5">
                      <span className="text-xs font-bold text-stone-800">Total payable estimate:</span>
                      <span className="font-serif italic font-semibold text-xl text-brand-beet">₹{totalPayable}</span>
                    </div>
                  </div>

                  {checkoutStep === 'cart' ? (
                    <button
                      id="proceed-to-shipping-btn"
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full py-3.5 rounded-2xl bg-brand-beet text-white font-semibold text-sm shadow-md flex items-center justify-center space-x-1.5 hover:bg-brand-beet-dark glow-btn-beet cursor-pointer"
                    >
                      <span>Proceed to Delivery details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="col-span-1 py-3.5 rounded-xl border border-stone-300 text-xs font-bold hover:bg-stone-100 text-stone-700 transition"
                      >
                        Go Back
                      </button>
                      
                      <button
                        id="finalize-place-order-btn"
                        onClick={handlePlaceOrder}
                        className="col-span-2 py-3.5 rounded-xl bg-brand-carrot text-white font-semibold text-xs tracking-wider uppercase shadow-md flex items-center justify-center space-x-1.5 hover:bg-brand-carrot/95 glow-btn-carrot cursor-pointer"
                      >
                        <span>Lock In Order Plan</span>
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
