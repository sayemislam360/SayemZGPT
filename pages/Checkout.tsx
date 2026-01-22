
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { placeOrder } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate('/login');

    const orderId = placeOrder({
      userId: user.id,
      items: cart,
      total: totalPrice,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode
      }
    });

    clearCart();
    navigate(`/success?orderId=${orderId}`);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Input 
                label="Full Address" 
                placeholder="123 Modern Ave, Apt 4" 
                required 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="City" 
                  placeholder="San Francisco" 
                  required 
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
                <Input 
                  label="Zip Code" 
                  placeholder="94103" 
                  required 
                  value={formData.zipCode}
                  onChange={e => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mt-12 mb-8">Payment Details</h2>
            <div className="space-y-6">
              <Input 
                label="Name on Card" 
                placeholder="Jane Doe" 
                required 
                value={formData.cardName}
                onChange={e => setFormData({...formData, cardName: e.target.value})}
              />
              <Input 
                label="Card Number" 
                placeholder="0000 0000 0000 0000" 
                required 
                value={formData.cardNumber}
                onChange={e => setFormData({...formData, cardNumber: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="Expiry Date" 
                  placeholder="MM/YY" 
                  required 
                  value={formData.expiry}
                  onChange={e => setFormData({...formData, expiry: e.target.value})}
                />
                <Input 
                  label="CVV" 
                  placeholder="123" 
                  required 
                  value={formData.cvv}
                  onChange={e => setFormData({...formData, cvv: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" size="lg" fullWidth className="mt-12 py-4">
              Place Order (${totalPrice.toFixed(2)})
            </Button>
          </form>
        </div>

        <div>
          <div className="bg-slate-50 p-8 rounded-3xl sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Your Order</h3>
            <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-slate-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 mt-8 pt-6 space-y-4">
               <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-bold text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-indigo-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
