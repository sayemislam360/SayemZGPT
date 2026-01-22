
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useProducts();

  const userOrders = orders.filter(o => o.userId === user?.id);
  const recentOrders = userOrders.slice(0, 3);
  const totalSpent = userOrders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Hello, {user?.name.split(' ')[0]}!</h1>
        <p className="text-slate-500 mt-2">Manage your orders and account settings from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase">Total Orders</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{userOrders.length}</p>
        </div>
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 text-white">
          <p className="text-sm font-bold opacity-80 uppercase">Total Spent</p>
          <p className="text-3xl font-extrabold mt-1">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase">Account Status</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <p className="text-lg font-bold text-slate-800">Verified</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <Link to="/dashboard/orders" className="text-sm text-indigo-600 font-bold hover:underline">View All History</Link>
        </div>
        <div className="divide-y divide-slate-100">
            {recentOrders.map(order => (
                <div key={order.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="font-bold text-slate-800">Order #{order.id}</p>
                        <p className="text-sm text-slate-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="font-bold text-slate-900">${order.total.toFixed(2)}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                            'bg-slate-100 text-slate-600'
                        }`}>
                            {order.status}
                        </span>
                    </div>
                </div>
            ))}
            {recentOrders.length === 0 && (
                <div className="p-12 text-center">
                    <p className="text-slate-400">You haven't placed any orders yet.</p>
                    <Link to="/" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">Start Shopping</Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
