import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from local storage:', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage:', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const slug = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd = {
      ...newProd,
      id: newProd.id || `prod_${Date.now()}`,
      slug,
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
      stock: Number(newProd.stock) ?? 50,
      soldCount: Number(newProd.soldCount) || 0,
      rating: Number(newProd.rating) || 5.0,
      packages: newProd.packages || [],
      isFeatured: Boolean(newProd.isFeatured),
      isTrending: Boolean(newProd.isTrending),
      isFlashDeal: Boolean(newProd.isFlashDeal),
      isTopRated: Boolean(newProd.isTopRated),
      isComingSoon: Boolean(newProd.isComingSoon)
    };

    setProducts(prev => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, stock: Number(newStock) } : p))
    );
  };

  const resetProducts = () => {
    setProducts(initialProducts);
    localStorage.setItem('dano_products', JSON.stringify(initialProducts));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetProducts
  };
}
