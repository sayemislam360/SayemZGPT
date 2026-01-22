
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export const UserOrderDetail: React.FC = () => {
  const { id } = useParams();
  const { orders } = useProducts();
  const { user } = useAuth();

  const order = orders.find(o => o.id === id && o.userId === user?.id);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Order not found</h2>
        <Link to="/dashboard/orders" className="text-indigo-600 hover:underline mt-4 block">Back to My Orders</Link>
      </div>
    );
  }

  const steps = [
    { name: 'Pending', status: 'pending', done: true },
    { name: 'Shipped', status: 'shipped', done: ['shipped', 'delivered'].includes(order.status) },
    { name: 'Delivered', status: 'delivered', done: order.status === 'delivered' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link to="/dashboard/orders" className="text-sm text-indigo-600 font-bold hover:underline mb-2 block flex items-center gap-1">
            ← Back to Orders
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">Order Details</h1>
          <p className="text-slate-500">Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-sm font-mono text-slate-400">Order ID: {order.id}</span>
            <span className={`mt-2 px-4 py-1 rounded-full text-xs font-bold uppercase ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                'bg-blue-100 text-blue-700'
            }`}>
                {order.status}
            </span>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0"></div>
            {steps.map((step, idx) => (
                <div key={step.name} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                        step.done ? 'bg-indigo-600 border-indigo-100 text-white' : 'bg-white border-slate-100 text-slate-300'
                    }`}>
                        {step.done ? '✓' : idx + 1}
                    </div>
                    <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${step.done ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {step.name}
                    </span>
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Order Items</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {order.items.map(item => (
                        <div key={item.id} className="p-6 flex items-center gap-4">
                            <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                            <div className="flex-1">
                                <Link to={`/product/${item.id}`} className="font-bold text-slate-900 hover:text-indigo-600">{item.name}</Link>
                                <p className="text-sm text-slate-500">{item.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-xs text-slate-400">{item.quantity} x ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-slate-50 flex justify-between items-center">
                    <span className="font-bold text-slate-600">Total Amount</span>
                    <span className="text-2xl font-extrabold text-indigo-600">${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Shipping Address
                </h3>
                <div className="text-sm text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">{user?.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                </div>
            </div>

            <div className="bg-indigo-900 p-6 rounded-3xl text-white">
                <h3 className="font-bold mb-4">Need help?</h3>
                <p className="text-indigo-200 text-sm mb-4">If you have any questions about your order, our support team is available 24/7.</p>
                <Button variant="outline" className="w-full !border-indigo-400 !text-white hover:!bg-indigo-800">
                    Contact Support
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
