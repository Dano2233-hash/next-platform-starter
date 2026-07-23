import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigation } from './hooks/useNavigation';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import './styles/globals.css';

function App() {
  const { route } = useNavigation();

  // Simple state-driven routing dispatcher
  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products />;
      case 'product-details':
        return <ProductDetails />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'order-success':
        return <OrderSuccess />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin':
        return <Admin />;
      case 'not-found':
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-brand-blue/30 selection:text-white">
      {renderPage()}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
