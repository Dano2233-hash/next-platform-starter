import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { useAuth } from './hooks/useAuth';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

function AppContent() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, toggleFlag, resetToDefault } = useProducts();
  const { isAdmin, login, logout } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      <Navbar
        cartCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
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
            path="/products/:slug"
            element={<ProductDetails products={products} onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                totalPrice={totalPrice}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                totalPrice={totalPrice}
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
                  toggleFlag={toggleFlag}
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
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
