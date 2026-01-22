
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useProducts();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Order Management</h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                    <Link to={`/admin/orders/${o.id}`} className="font-mono font-bold text-indigo-600 hover:underline">
                        {o.id}
                    </Link>
                    <p className="text-[10px] text-slate-400 mt-0.5">{new Date(o.date).toLocaleDateString()}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="font-bold text-slate-800">{o.userId}</p>
                    <p className="text-[10px] text-slate-400">{o.shippingAddress.city}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">${o.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                    o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                    o.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link to={`/admin/orders/${o.id}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                    View Info
                  </Link>
                  <select 
                    className="text-[10px] border rounded p-1 bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
            <div className="p-10 text-center text-slate-400">No orders recorded in the system yet.</div>
        )}
      </div>
    </div>
  );
};
