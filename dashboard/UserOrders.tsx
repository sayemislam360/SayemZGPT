
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/Button';

export const UserOrders: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useProducts();

  const userOrders = orders.filter(o => o.userId === user?.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900">My Order History</h1>

      <div className="space-y-6">
        {userOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
               <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Order Placed</p>
                    <p className="text-sm font-medium text-slate-700">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
                    <p className="text-sm font-medium text-slate-700">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-slate-400 uppercase">Order #</p>
                    <p className="text-sm font-bold text-slate-900">{order.id}</p>
                  </div>
               </div>
               <div className="text-right">
                  <Link to={`/dashboard/orders/${order.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
               </div>
            </div>
            
            <div className="p-6">
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    {order.items.slice(0, 4).map(item => (
                        <img key={item.id} src={item.image} className="w-16 h-16 rounded-lg object-cover border border-slate-100 flex-shrink-0" title={item.name} />
                    ))}
                    {order.items.length > 4 && (
                        <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            +{order.items.length - 4} more
                        </div>
                    )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        'bg-blue-100 text-blue-700'
                    }`}>
                        {order.status}
                    </span>
                    <p className="text-xs text-slate-400 italic">Delivery status: In transit</p>
                </div>
            </div>
          </div>
        ))}
        {userOrders.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg">No orders found.</p>
                <Link to="/" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">Start Shopping</Link>
            </div>
        )}
      </div>
    </div>
  );
};
