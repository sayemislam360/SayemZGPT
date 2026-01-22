
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';

export const Success: React.FC = () => {
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get('orderId');

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Order Confirmed!</h1>
      <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
        Thank you for your purchase. We've received your order <span className="font-mono font-bold text-indigo-600">#{orderId}</span> and we're getting it ready for shipment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/orders">
          <Button variant="outline" className="px-10">View My Orders</Button>
        </Link>
        <Link to="/">
          <Button className="px-10">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};
