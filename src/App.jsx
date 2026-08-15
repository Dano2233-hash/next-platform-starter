import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

// Hooks
import { useProducts } from './hooks/useProducts.jsx';
import { useCart } from './hooks/useCart.jsx';
import { useAuth } from './hooks/useAuth.jsx';

export default function App() {
  const navigate = useNavigate();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetToDefault
  } = useProducts();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  const handleBuyNow = (product, selectedPkg = null, qty = 1) => {
    addToCart(product, selectedPkg, qty);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans">
      <Navbar cartCount={cartCount} isAdmin={isAdmin} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={(p, pkg, qty) => addToCart(p, pkg, qty)}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={(p, pkg, qty) => addToCart(p, pkg, qty)}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/product/:idOrSlug"
            element={
              <ProductDetails
                products={products}
                onAddToCart={(p, pkg, qty) => addToCart(p, pkg, qty)}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
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
                clearCart={clearCart}
              />
            }
          />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route
            path="/admin-login"
            element={
              <AdminLogin
                onLoginSuccess={(u, p) => login(u, p)}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <Admin
                  products={products}
                  addProduct={addProduct}
                  updateProduct={updateProduct}
                  deleteProduct={deleteProduct}
                  updateStock={updateStock}
                  resetToDefault={resetToDefault}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
      />
    </div>
  );
}
