
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Product not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8 flex items-center text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* Product Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">In Stock</span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Out of Stock</span>
              )}
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          <div className="mt-auto space-y-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-bold text-slate-700">Quantity:</label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-slate-100 text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="p-2 hover:bg-slate-100 text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                fullWidth 
                className="py-4"
                disabled={product.stock === 0}
                onClick={() => addToCart(product, quantity)}
              >
                {product.stock === 0 ? 'Currently Unavailable' : 'Add to Cart'}
              </Button>
              <Button size="lg" variant="outline" className="p-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Button>
            </div>
            
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              Fast delivery within 2-3 business days. Free returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
