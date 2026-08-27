import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Layout & Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Custom Hooks
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const navigate = useNavigate();

  // Custom Hooks with Local Storage state sync
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts
  } = useProducts();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    totalItems
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Buy Now Handler: Adds product to cart and immediately opens checkout
  const handleBuyNow = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Add To Cart Handler: Adds item and opens cart drawer
  const handleAddToCart = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    setIsCartDrawerOpen(true);
  };

  const handleLoginSuccess = (username, password) => {
    login(username, password);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Navbar cartCount={totalItems} isAdmin={isAdmin} />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          {/* Customer Storefront Routes */}
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetails
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />

          {/* Cart & Checkout Flow */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                cartTotal={cartTotal}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                cartTotal={cartTotal}
                onClearCart={clearCart}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Admin Routes */}
          <Route
            path="/admin-login"
            element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onResetProducts={resetProducts}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        cartTotal={cartTotal}
      />
    </div>
  );
}
