import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const LOCAL_STORAGE_KEY = 'dano_products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading dano_products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving dano_products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd = {
      id: `custom-${Date.now()}`,
      slug: slug || `prod-${Date.now()}`,
      stock: 100,
      rating: 5.0,
      soldCount: 0,
      tag: 'New',
      isFeatured: false,
      isTrending: false,
      isFlashDeal: false,
      isTopRated: false,
      isComingSoon: false,
      packages: [],
      ...newProd,
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.stock > 0 ? 0 : 100 }
          : item
      )
    );
  };

  const toggleFlag = (id, flagKey) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [flagKey]: !item[flagKey] } : item
      )
    );
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleFlag,
    resetToDefault,
  };
}
