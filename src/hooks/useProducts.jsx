import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

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
      console.error('Error loading products from Local Storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to Local Storage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithDefaults = {
      id: newProduct.id || `prod-${Date.now()}`,
      slug: newProduct.slug || (newProduct.name ? newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `prod-${Date.now()}`),
      name: newProduct.name || 'Untitled Product',
      category: newProduct.category || 'Others',
      platform: newProduct.platform || 'PC',
      type: newProduct.type || 'Game',
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      description: newProduct.description || '',
      image: newProduct.image || '',
      packages: newProduct.packages || [{ id: 'std', name: 'Standard', price: Number(newProduct.price) || 0 }],
      stock: newProduct.stock !== undefined ? Number(newProduct.stock) : 100,
      rating: newProduct.rating ? Number(newProduct.rating) : 5.0,
      soldCount: newProduct.soldCount ? Number(newProduct.soldCount) : 0,
      tag: newProduct.tag || 'NEW',
      isFeatured: Boolean(newProduct.isFeatured),
      isTrending: Boolean(newProduct.isTrending),
      isFlashDeal: Boolean(newProduct.isFlashDeal),
      isTopRated: Boolean(newProduct.isTopRated),
    };

    setProducts((prev) => [productWithDefaults, ...prev]);
    return productWithDefaults;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaults,
  };
}
