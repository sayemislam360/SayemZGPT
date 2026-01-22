
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/Button';

export const AdminOrderDetail: React.FC = () => {
  const { id } = useParams();
  const { orders, updateOrderStatus } = useProducts();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/admin/orders" className="text-indigo-600 hover:underline mt-4 block">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/admin/orders" className="text-sm text-indigo-600 font-bold hover:underline mb-2 block flex items-center gap-1">
            ← Back to All Orders
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Manage Order {order.id}</h1>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>Print Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Items Ordered</h3>
                    <span className="text-sm text-slate-500">{order.items.length} items</span>
                </div>
                <div className="divide-y divide-slate-100">
                    {order.items.map(item => (
                        <div key={item.id} className="p-6 flex items-center gap-4">
                            <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                                <p className="font-bold text-slate-900">{item.name}</p>
                                <p className="text-xs text-slate-500">ID: {item.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-xs text-slate-400">{item.quantity} x ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Grand Total</span>
                        <span className="text-indigo-600">${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Customer Details</h4>
                    <p className="font-bold text-slate-900 mb-1">User ID: {order.userId}</p>
                    <p className="text-sm text-slate-500">Contact preference: Email</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Shipping Address</h4>
                    <p className="text-sm text-slate-700">{order.shippingAddress.address}</p>
                    <p className="text-sm text-slate-700">{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Status Management */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Update Order Status</h4>
                <div className="space-y-4">
                    <select 
                        className="w-full border border-slate-300 rounded-lg p-3 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <p className="text-xs text-slate-400 italic">Updating the status will notify the customer via their dashboard.</p>
                </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Quick Notes
                </h4>
                <textarea 
                    className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm text-slate-300 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500 h-32"
                    placeholder="Add an internal note for staff..."
                ></textarea>
                <Button fullWidth size="sm" className="mt-4">Save Note</Button>
            </div>
        </div>
      </div>
    </div>
  );
};
