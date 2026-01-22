
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useProducts();
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory({ name: newCatName, slug: newCatName.toLowerCase().replace(/\s+/g, '-') });
      setNewCatName('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Category Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Create Category</h3>
            <form onSubmit={handleAdd} className="space-y-4">
                <Input 
                    label="Category Name" 
                    placeholder="e.g. Gaming Accessories" 
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                />
                <Button type="submit" fullWidth>Add Category</Button>
            </form>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Current Categories</h3>
            </div>
            <div className="divide-y divide-slate-100">
                {categories.map(cat => (
                    <div key={cat.id} className="p-4 flex items-center justify-between group">
                        <div>
                            <p className="font-bold text-slate-800">{cat.name}</p>
                            <p className="text-xs text-slate-400">/{cat.slug}</p>
                        </div>
                        <button 
                            onClick={() => deleteCategory(cat.id)}
                            className="text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
