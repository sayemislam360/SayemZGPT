
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { products, categories } = useProducts();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || '';
  const categoryFilter = queryParams.get('category') || '';

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                          p.description.toLowerCase().includes(searchTerm);
      const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      {!searchTerm && !categoryFilter && (
        <div className="relative rounded-3xl overflow-hidden bg-indigo-900 mb-12 py-16 px-8 sm:px-12 text-center sm:text-left">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Modern Shopping <br/>
              <span className="text-indigo-300">Reimagined.</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8">
              Explore our curated collection of high-end technology and minimalist essentials designed for the future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                Shop Now
              </button>
              <button className="border border-indigo-400 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-800 transition-colors">
                New Arrivals
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
             <img src="https://picsum.photos/seed/shop/800/800" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => window.location.hash = '/'}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${!categoryFilter ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => window.location.hash = `/?category=${encodeURIComponent(cat.name)}`}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${categoryFilter === cat.name ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {searchTerm ? `Search results for "${searchTerm}"` : categoryFilter || 'Featured Products'}
            </h2>
            <span className="text-slate-500 text-sm">{filteredProducts.length} items found</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">No products found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
              <button onClick={() => window.location.hash = '/'} className="mt-6 text-indigo-600 font-semibold hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
