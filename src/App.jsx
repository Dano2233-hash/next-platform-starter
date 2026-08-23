import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
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
  const navigate = useNavigate();

  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addOrder,
    totalProducts,
    totalOrders,
    totalRevenue
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
    totalPrice
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  const handleBuyNow = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
      <Navbar
        cartCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetails
                products={products}
                onAddToCart={addToCart}
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
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                totalPrice={totalPrice}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                totalPrice={totalPrice}
                onAddOrder={addOrder}
                onClearCart={clearCart}
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
                  orders={orders}
                  totalProducts={totalProducts}
                  totalOrders={totalOrders}
                  totalRevenue={totalRevenue}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onUpdateStock={updateStock}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
