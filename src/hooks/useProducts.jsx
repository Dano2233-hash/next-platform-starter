import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('dano_products');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading dano_products from localStorage", e);
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const id = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = id;
    const productToAdd = {
      ...newProduct,
      id,
      slug,
      stock: parseInt(newProduct.stock) || 0,
      price: parseInt(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? parseInt(newProduct.oldPrice) : null,
      rating: parseFloat(newProduct.rating) || 5.0,
      soldCount: parseInt(newProduct.soldCount) || 0,
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? {
        ...updatedProduct,
        stock: parseInt(updatedProduct.stock) || 0,
        price: parseInt(updatedProduct.price) || 0,
        oldPrice: updatedProduct.oldPrice ? parseInt(updatedProduct.oldPrice) : null,
        rating: parseFloat(updatedProduct.rating) || 5.0,
        soldCount: parseInt(updatedProduct.soldCount) || 0,
        isFeatured: !!updatedProduct.isFeatured,
        isTrending: !!updatedProduct.isTrending,
        isFlashDeal: !!updatedProduct.isFlashDeal,
        isTopRated: !!updatedProduct.isTopRated
      } : p))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, parseInt(newStock) || 0) } : p))
    );
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock
  };
}
