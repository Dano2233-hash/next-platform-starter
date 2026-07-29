import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Custom Hooks
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
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount, getCartTotal } = useCart();
  const { products, addProduct, editProduct, deleteProduct, changeStock } = useProducts();
  const { isAdmin, login, logout } = useAuth();

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black">

        {/* Navigation Head */}
        <Navbar
          cartCount={getCartCount()}
          onOpenCart={() => setIsCartDrawerOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
            <Route path="/products" element={<Products products={products} onAddToCart={addToCart} />} />
            <Route path="/products/:id" element={<ProductDetails products={products} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* Admin Authentications */}
            <Route
              path="/admin-login"
              element={
                isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin onLoginSuccess={() => {}} />
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin
                    products={products}
                    addProduct={addProduct}
                    editProduct={editProduct}
                    deleteProduct={deleteProduct}
                    changeStock={changeStock}
                    onLogout={logout}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer Area */}
        <Footer />

        {/* Cart Drawer Overlay */}
        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => setIsCartDrawerOpen(false)}
        />

      </div>
    </Router>
  );
}
