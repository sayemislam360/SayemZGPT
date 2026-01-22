
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 7v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm5 7a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500 mt-4 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Check out our amazing products!</p>
        <Button className="mt-8 px-10" onClick={() => navigate('/')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group">
              <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-slate-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 px-3 hover:bg-slate-50 text-slate-600"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 px-3 hover:bg-slate-50 text-slate-600"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xl font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-indigo-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button size="lg" fullWidth onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
            <div className="mt-6 flex items-center justify-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-50" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-50" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
