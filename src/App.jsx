import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

import useProducts from './hooks/useProducts';
import useCart from './hooks/useCart';

export default function App() {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-gray-200">
      {/* Global Navbar */}
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Content Viewport */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products products={products} onAddToCart={addToCart} />} />
          <Route path="/product/:slug" element={<ProductDetails products={products} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdateQty={updateQuantity} onRemove={removeFromCart} cartTotal={cartTotal} />} />
          <Route path="/checkout" element={<Checkout cart={cart} cartTotal={cartTotal} onClearCart={clearCart} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onEditProduct={editProduct}
                  onDeleteProduct={deleteProduct}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Slide-out Global Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
        cartTotal={cartTotal}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
