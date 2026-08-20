import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const navigate = useNavigate();

  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    resetToDefaultProducts
  } = useProducts();

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  const handleBuyNow = (product, pkg) => {
    addToCart(product, pkg);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <div>
        <Navbar
          cartCounter={totalItems}
          onOpenCart={() => setIsCartOpen(true)}
          isAdmin={isAdmin}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  onAddToCart={(p, pkg) => addToCart(p, pkg)}
                  onBuyNow={handleBuyNow}
                />
              }
            />

            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  onAddToCart={(p, pkg) => addToCart(p, pkg)}
                  onBuyNow={handleBuyNow}
                />
              }
            />

            <Route
              path="/product/:slug"
              element={
                <ProductDetails
                  products={products}
                  onAddToCart={(p, pkg) => addToCart(p, pkg)}
                  onBuyNow={handleBuyNow}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                  onClearCart={clearCart}
                  subtotal={subtotal}
                />
              }
            />

            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  subtotal={subtotal}
                  onAddOrder={addOrder}
                  onClearCart={clearCart}
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
                    orders={orders}
                    onAddProduct={addProduct}
                    onUpdateProduct={updateProduct}
                    onDeleteProduct={deleteProduct}
                    onResetProducts={resetToDefaultProducts}
                    onLogout={logout}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        subtotal={subtotal}
      />

      <Footer />
    </div>
  );
}
