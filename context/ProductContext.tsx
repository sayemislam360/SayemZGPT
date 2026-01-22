
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../constants';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  // Fix: Omit 'status' from placeOrder input as it's defined internally
  placeOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);

  const addProduct = (p: Omit<Product, 'id'>) => {
    setProducts([...products, { ...p, id: `p-${Date.now()}` }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCategory = (c: Omit<Category, 'id'>) => {
    setCategories([...categories, { ...c, id: `c-${Date.now()}` }]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Fix: placeOrder implementation matching the updated interface
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders([newOrder, ...orders]);
    
    // Deduct stock with corrected logic
    orderData.items.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        updateProduct(item.id, { stock: Math.max(0, product.stock - item.quantity) });
      }
    });

    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <ProductContext.Provider value={{
      products, categories, orders,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory,
      placeOrder, updateOrderStatus
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
