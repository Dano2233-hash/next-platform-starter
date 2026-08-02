import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { ProductsProvider } from './hooks/useProducts';

// Import Pages
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Basic reactive SPA router
    setCurrentPath(window.location.pathname);

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Simple Router Switch matching standard routing requirements
  const renderPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <Home />;
    }
    // 2. Catalog
    if (currentPath === '/products' || currentPath === '/products/') {
      return <Products />;
    }
    // 3. Product Details - Matches /product/:slug
    if (currentPath.startsWith('/product/')) {
      return <ProductDetails />;
    }
    // 4. Cart View
    if (currentPath === '/cart' || currentPath === '/cart/') {
      return <Cart />;
    }
    // 5. Checkout
    if (currentPath === '/checkout' || currentPath === '/checkout/') {
      return <Checkout />;
    }
    // 6. Order Success
    if (currentPath.startsWith('/order-success')) {
      return <OrderSuccess />;
    }
    // 7. Admin Login
    if (currentPath === '/admin-login' || currentPath === '/admin-login/') {
      return <AdminLogin />;
    }
    // 8. Admin Dashboard
    if (currentPath === '/admin' || currentPath === '/admin/') {
      return <Admin />;
    }
    // 9. Not Found 404 Fallback
    return <NotFound />;
  };

  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-[#050505] text-gray-100">
            {/* Navigation Header */}
            <Navbar onOpenCart={() => setIsCartOpen(true)} />

            {/* Main Content Render Area */}
            <main className="flex-grow">
              {renderPage()}
            </main>

            {/* Shared Footer block */}
            <Footer />

            {/* Shopping Cart Slider Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
