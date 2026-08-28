import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const STORAGE_KEY = 'dano_products';

export function useProducts() {
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
      console.error('Failed to parse saved products from localStorage', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `product-${Date.now()}`,
      slug,
      rating: parseFloat(newProduct.rating) || 5.0,
      soldCount: parseInt(newProduct.soldCount, 10) || 0,
      stock: parseInt(newProduct.stock, 10) || 0,
      price: parseFloat(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : null,
      packages: newProduct.packages || [{ name: 'Standard', price: parseFloat(newProduct.price) || 0 }],
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated,
      isComingSoon: !!newProduct.isComingSoon,
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedFields,
            stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : p.stock,
            price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : p.price,
            oldPrice: updatedFields.oldPrice ? parseFloat(updatedFields.oldPrice) : null,
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    const stockVal = Math.max(0, parseInt(newStock, 10) || 0);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: stockVal } : p))
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, [flagName]: !p[flagName] };
        }
        return p;
      })
    );
  };

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetProducts,
  };
}

export default useProducts;
