import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const PRODUCTS_STORAGE_KEY = 'dano_products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading dano_products from localStorage', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error writing dano_products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const slug = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productToAdd = {
      ...newProd,
      id: newProd.id || `prod-${Date.now()}`,
      slug,
      rating: parseFloat(newProd.rating) || 5.0,
      soldCount: parseInt(newProd.soldCount, 10) || 0,
      stock: parseInt(newProd.stock, 10) || 0,
      price: parseFloat(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? parseFloat(newProd.oldPrice) : null,
      packages: newProd.packages || [],
      isFeatured: !!newProd.isFeatured,
      isTrending: !!newProd.isTrending,
      isFlashDeal: !!newProd.isFlashDeal,
      isTopRated: !!newProd.isTopRated,
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (updatedProd) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? { ...p, ...updatedProd } : p))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  const toggleFlag = (productId, flagName) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, [flagName]: !p[flagName] } : p
      )
    );
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetToDefault,
  };
}
