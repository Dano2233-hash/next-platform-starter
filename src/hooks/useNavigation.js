import { useState, useEffect } from 'react';

/**
 * Robust Hash-based Router Hook for Single Page Application.
 * Supports Back/Forward browser buttons, query params, and easy page transitions.
 */
export function useNavigation() {
  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.location.hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (hash) => {
    window.location.hash = hash;
  };

  const getRouteInfo = () => {
    const hash = currentHash || '#/';

    if (hash.startsWith('#/product/')) {
      const slug = hash.replace('#/product/', '').split('?')[0];
      return { page: 'product-details', slug };
    }

    if (hash.startsWith('#/order-success')) {
      const parts = hash.split('?');
      const searchParams = new URLSearchParams(parts[1] || '');
      const orderId = searchParams.get('id') || '';
      return { page: 'order-success', orderId };
    }

    if (hash.startsWith('#/admin-login')) {
      return { page: 'admin-login' };
    }

    if (hash.startsWith('#/admin')) {
      return { page: 'admin' };
    }

    if (hash.startsWith('#/cart')) {
      return { page: 'cart' };
    }

    if (hash.startsWith('#/checkout')) {
      return { page: 'checkout' };
    }

    if (hash.startsWith('#/products')) {
      const parts = hash.split('?');
      const searchParams = new URLSearchParams(parts[1] || '');
      const category = searchParams.get('category') || null;
      const platform = searchParams.get('platform') || null;
      const search = searchParams.get('search') || null;
      return { page: 'products', category, platform, search };
    }

    if (hash === '#/' || hash === '') {
      return { page: 'home' };
    }

    return { page: 'not-found' };
  };

  return {
    currentHash,
    navigate,
    route: getRouteInfo()
  };
}
