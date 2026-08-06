import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Hooks
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
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

  // Custom persistent logic hooks
  const { products, addProduct, editProduct, deleteProduct, changeStock } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated, login, logout } = useAuth();

  // Navigation Drawer visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-slate-100">
      {/* Navigation bar Header */}
      <Navbar cartCount={getCartCount()} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Core Viewport area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products products={products} onAddToCart={addToCart} />} />
          <Route
            path="/products/:slug"
            element={<ProductDetails products={products} onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                total={getCartTotal()}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} total={getCartTotal()} onClearCart={clearCart} />}
          />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Admin authorization system */}
          <Route path="/admin-login" element={<AdminLogin onLogin={login} />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onEditProduct={editProduct}
                  onDeleteProduct={deleteProduct}
                  onChangeStock={changeStock}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Standard sidebar drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={getCartTotal()}
      />

      {/* Main Footer layout */}
      <Footer />
    </div>
  );
}
