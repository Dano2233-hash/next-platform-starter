import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Hooks
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

// Components
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

export default function App() {
  const navigate = useNavigate();
  const { products, addProduct, editProduct, deleteProduct, updateStock } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount } = useCart();
  const { isAdmin, login, logout } = useAuth();

  // Search filter query string
  const [searchQuery, setSearchQuery] = useState('');

  // Drawer visibility control
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Short hand buy trigger helper that inserts into cart & redirects straight to checkout
  const handleBuyNow = (product, selectedPkg = null, qty = 1) => {
    const pkg = selectedPkg || (product.packages && product.packages.length > 0 ? product.packages[0] : 'Standard Edition');
    addToCart(product, pkg, qty);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-[#0066ff] selection:text-white">

      {/* Navigation Bar */}
      <Navbar
        cartItemCount={cartItemCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        isAdmin={isAdmin}
        onLogout={logout}
      />

      {/* Global Shopping Cart Side Drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
      />

      {/* Core application Router Routing */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={(p) => addToCart(p, p.packages?.[0] || 'Standard Edition', 1)}
                onBuyNow={(p) => handleBuyNow(p)}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={(p) => addToCart(p, p.packages?.[0] || 'Standard Edition', 1)}
                onBuyNow={(p) => handleBuyNow(p)}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
              />
            }
          />
          <Route
            path="/products/:slug"
            element={
              <ProductDetails
                products={products}
                onAddToCart={(p, pkg, qty) => addToCart(p, pkg, qty)}
                onBuyNow={(p, pkg, qty) => handleBuyNow(p, pkg, qty)}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                total={cartTotal}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                total={cartTotal}
                onOrderCreated={clearCart}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />

          <Route
            path="/admin-login"
            element={
              <AdminLogin
                onLogin={login}
                isAdmin={isAdmin}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onEditProduct={editProduct}
                  onDeleteProduct={deleteProduct}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
