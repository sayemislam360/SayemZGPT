
import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserRole } from './types';

// Store Pages
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Admin Pages
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLayout } from './admin/AdminLayout';
import { AdminProducts } from './admin/AdminProducts';
import { AdminOrders } from './admin/AdminOrders';
import { AdminOrderDetail } from './admin/AdminOrderDetail';
import { AdminCategories } from './admin/AdminCategories';

// User Dashboard Pages
import { UserLayout } from './dashboard/UserLayout';
import { UserDashboard } from './dashboard/UserDashboard';
import { UserOrders } from './dashboard/UserOrders';
import { UserOrderDetail } from './dashboard/UserOrderDetail';
import { UserSettings } from './dashboard/UserSettings';

const StorefrontLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 bg-slate-50">
      <Outlet />
    </main>
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-500 font-medium">© 2024 SayemZGPT E-commerce. Built for the modern web.</p>
      </div>
    </footer>
  </div>
);

export const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {/* Public Storefront Routes */}
              <Route element={<StorefrontLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Legacy redirect for old orders path */}
                <Route path="/orders" element={<Navigate to="/dashboard/orders" replace />} />
                
                {/* Single checkout related routes */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/success" element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                } />
              </Route>

              {/* Protected User Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }>
                <Route index element={<UserDashboard />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="orders/:id" element={<UserOrderDetail />} />
                <Route path="settings" element={<UserSettings />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="categories" element={<AdminCategories />} />
              </Route>
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HashRouter>
  );
};
