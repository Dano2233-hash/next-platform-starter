import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
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
      console.error('Failed to parse dano_products', e);
    }
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse dano_orders', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dano_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProduct) => {
    const formattedSlug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `prod_${Date.now()}`,
      slug: formattedSlug,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      stock: Number(newProduct.stock) || 0,
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      packages: Array.isArray(newProduct.packages) ? newProduct.packages : [],
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated
    };

    setProducts(prev => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
          oldPrice: updatedFields.oldPrice !== undefined ? (updatedFields.oldPrice ? Number(updatedFields.oldPrice) : null) : p.oldPrice,
          stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock
        };
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (orderData) => {
    setOrders(prev => [orderData, ...prev]);
  };

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider value={{
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      resetToDefaultProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export default useProducts;
