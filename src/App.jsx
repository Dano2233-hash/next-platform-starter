import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Shared components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Dynamic Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

// Custom Hooks
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const { isAdmin, login, logout } = useAuth();

  // Keep track of the currently created order to show summary on success page safely
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleOrderSuccess = (order) => {
    setCurrentOrder(order);
    clearCart();
  };

  const handleLoginSuccess = (user, pass) => {
    return login(user, pass);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">

      {/* Universal Sticky Header */}
      <Navbar
        cartCount={getCartItemsCount()}
        isAdmin={isAdmin}
        cartTotal={getCartTotal()}
      />

      {/* Main layout container with top-bottom paddings */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products products={products} onAddToCart={addToCart} />} />
          <Route path="/products/:slug" element={<ProductDetails products={products} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} cartTotal={getCartTotal()} />} />
          <Route path="/checkout" element={<Checkout cart={cart} cartTotal={getCartTotal()} onOrderSuccess={handleOrderSuccess} />} />
          <Route path="/order-success" element={<OrderSuccess currentOrder={currentOrder} />} />

          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
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

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Universal footer info */}
      <Footer />
    </div>
  );
}
