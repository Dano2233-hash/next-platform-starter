import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

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
  const [activePage, setActivePage] = useState(() => {
    return window.location.pathname || '/';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState(null);

  // History stack tracking for detail "back" navigation
  const [navigationHistory, setNavigationHistory] = useState([]);

  // Listening to popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    setNavigationHistory((prev) => [...prev, activePage]);
    window.history.pushState(null, '', path);
    setActivePage(path);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const prev = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((history) => history.slice(0, -1));
      window.history.pushState(null, '', prev);
      setActivePage(prev);
    } else {
      navigate('/products');
    }
  };

  // Determine current active page layout content
  const renderPageContent = () => {
    // Exact routes
    if (activePage === '/' || activePage === '') {
      return (
        <Home
          navigate={navigate}
          onProductSelect={setSelectedProduct}
        />
      );
    }

    if (activePage === '/products') {
      return (
        <Products
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    // Platform Specific Products redirects
    if (activePage === '/xbox') {
      return (
        <Products
          activePlatform="Xbox"
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    if (activePage === '/playstation') {
      return (
        <Products
          activePlatform="PlayStation"
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    if (activePage === '/pc') {
      return (
        <Products
          activePlatform="PC"
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    if (activePage === '/mobile') {
      return (
        <Products
          activePlatform="Mobile"
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    if (activePage === '/gift-cards') {
      return (
        <Products
          activePlatform="Gift Card"
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    // Category routing helpers for Subscriptions & Others
    if (activePage === '/subscriptions' || activePage === '/others') {
      return (
        <Products
          navigate={navigate}
          onProductSelect={setSelectedProduct}
          initialSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      );
    }

    if (activePage === '/cart') {
      return <Cart navigate={navigate} />;
    }

    if (activePage === '/checkout') {
      return <Checkout navigate={navigate} onOrderCreated={setLastCreatedOrder} />;
    }

    if (activePage === '/order-success') {
      return <OrderSuccess order={lastCreatedOrder} navigate={navigate} />;
    }

    if (activePage === '/admin-login') {
      return <AdminLogin navigate={navigate} />;
    }

    if (activePage === '/admin') {
      return (
        <ProtectedRoute navigate={navigate}>
          <Admin navigate={navigate} />
        </ProtectedRoute>
      );
    }

    // Product detail dynamic routing split (/products/:slug)
    if (activePage.startsWith('/products/') && activePage !== '/products') {
      const slug = activePage.split('/')[2];
      return (
        <ProductDetails
          slug={slug}
          navigate={navigate}
          onBack={handleBack}
        />
      );
    }

    // If none of the routes match, fallback to NotFound
    return <NotFound navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-between">

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 border-b border-white/5 py-2.5 px-4 text-center text-[11px] font-black uppercase tracking-wider text-cyan-300">
        🔥 Fast and Secure Digital Keys & Top-Ups in Kurdistan • 24/7 support via WhatsApp • Instant Delivery!
      </div>

      {/* Shared Header Navigation */}
      <Navbar
        activePage={activePage}
        navigate={navigate}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Page Body Frame */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {renderPageContent()}
      </main>

      {/* Shared Footer Navigation */}
      <Footer navigate={navigate} />

    </div>
  );
}
