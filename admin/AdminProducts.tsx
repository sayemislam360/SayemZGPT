
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Product } from '../types';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: categories[0]?.name || '',
    stock: 0,
    image: 'https://picsum.photos/400/400'
  });

  const handleSave = () => {
    if (editingId) {
      updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      addProduct(formData as any);
      setIsAdding(false);
    }
    setFormData({ name: '', description: '', price: 0, category: categories[0]?.name || '', stock: 0, image: 'https://picsum.photos/400/400' });
  };

  const startEdit = (p: Product) => {
    setFormData(p);
    setEditingId(p.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Manage Products</h1>
        <Button onClick={() => setIsAdding(true)}>Add New Product</Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-2xl">
          <h3 className="text-xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <div className="space-y-4">
            <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <Input label="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
              <Input label="Stock" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select 
                className="w-full border border-slate-300 rounded-lg p-2"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <Input label="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
            <div className="flex gap-4 pt-4">
              <Button fullWidth onClick={handleSave}>Save Product</Button>
              <Button variant="outline" fullWidth onClick={() => { setIsAdding(false); setEditingId(null); }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-bold text-slate-800">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{p.category}</td>
                <td className="px-6 py-4 font-bold text-slate-900">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => startEdit(p)} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-800 font-bold text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
