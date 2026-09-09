import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

export function App() {
  const {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    resetToDefaultProducts,
  } = useProducts();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Header */}
      <Navbar cartCount={cartCount} isAdmin={isAdmin} />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route
            path="/"
            element={<Home products={products} onAddToCart={addToCart} />}
          />

          <Route
            path="/products"
            element={<Products products={products} onAddToCart={addToCart} />}
          />

          <Route
            path="/product/:slug"
            element={<ProductDetails products={products} onAddToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
                totalAmount={cartTotal}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                totalAmount={cartTotal}
                onOrderCreated={clearCart}
              />
            }
          />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route
            path="/admin-login"
            element={<AdminLogin onLoginSuccess={login} />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onEditProduct={editProduct}
                  onDeleteProduct={deleteProduct}
                  onUpdateStock={updateStock}
                  onResetProducts={resetToDefaultProducts}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
