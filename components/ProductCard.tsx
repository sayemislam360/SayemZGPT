
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-indigo-600 uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
          {product.featured && (
            <span className="bg-indigo-600 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
              Featured
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2 h-10">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};
