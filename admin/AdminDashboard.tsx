
import React from 'react';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { products, orders, categories } = useProducts();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;

  const stats = [
    { name: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-500' },
    { name: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-500' },
    { name: 'Pending Orders', value: pendingOrders, icon: '⏳', color: 'bg-yellow-500' },
    { name: 'Categories', value: categories.length, icon: '🏷️', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back to the admin control center.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stats</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{order.id}</p>
                  <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">${order.total.toFixed(2)}</p>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="p-8 text-center text-slate-400">No orders yet</div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Low Stock Alerts</h3>
            <Link to="/admin/products" className="text-sm text-indigo-600 hover:underline">Manage Products</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {products.filter(p => p.stock < 10).slice(0, 5).map(product => (
              <div key={product.id} className="p-4 flex items-center gap-4">
                <img src={product.image} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${product.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                    {product.stock} left
                  </span>
                </div>
              </div>
            ))}
             {lowStockProducts === 0 && (
              <div className="p-8 text-center text-slate-400">All products are well stocked</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
