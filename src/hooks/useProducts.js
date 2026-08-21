import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'dano_products';

export const useProducts = () => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: slug || `product-${Date.now()}`,
      rating: parseFloat(newProduct.rating) || 5.0,
      soldCount: parseInt(newProduct.soldCount, 10) || 0,
      stock: parseInt(newProduct.stock, 10) || 0,
      price: Number(newProduct.price) || 0,
      oldPrice: Number(newProduct.oldPrice) || 0,
      packages: newProduct.packages || [],
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedData,
            price: updatedData.price !== undefined ? Number(updatedData.price) : item.price,
            oldPrice: updatedData.oldPrice !== undefined ? Number(updatedData.oldPrice) : item.oldPrice,
            stock: updatedData.stock !== undefined ? parseInt(updatedData.stock, 10) : item.stock,
            rating: updatedData.rating !== undefined ? parseFloat(updatedData.rating) : item.rating,
            soldCount: updatedData.soldCount !== undefined ? parseInt(updatedData.soldCount, 10) : item.soldCount
          };
        }
        return item;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: parseInt(newStock, 10) || 0 } : item))
    );
  };

  const toggleProductFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [flagName]: !item[flagName] } : item))
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleProductFlag,
    resetToDefaults
  };
};
