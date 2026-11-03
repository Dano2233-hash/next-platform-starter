import { useState, useEffect, createContext, useContext } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext(null);
const STORAGE_KEY = 'dano_products';

export function ProductsProvider({ children }) {
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
      console.error('Failed reading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithDefaults = {
      id: newProduct.id || `prod-${Date.now()}`,
      slug: newProduct.slug || (newProduct.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newProduct.category || 'pc',
      platform: newProduct.platform || 'PC',
      type: newProduct.type || 'Game',
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      description: newProduct.description || '',
      image: newProduct.image || '',
      packages: newProduct.packages && newProduct.packages.length > 0
        ? newProduct.packages
        : [{ name: 'Standard Edition', price: Number(newProduct.price) || 0 }],
      stock: Number(newProduct.stock) ?? 100,
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      tag: newProduct.tag || '',
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated,
      ...newProduct,
    };
    setProducts((prev) => [productWithDefaults, ...prev]);
    return productWithDefaults;
  };

  const editProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, stock: Math.max(0, Number(newStock)) } : prod))
    );
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock,
        resetToDefault,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
