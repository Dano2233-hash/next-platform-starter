import { useState, useEffect, createContext, useContext } from 'react';
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
      console.error('Failed to parse products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage', e);
    }
  }, [products]);

  const addProduct = (productData) => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = {
      id: `prod-${Date.now()}`,
      slug: slug,
      stock: Number(productData.stock) || 10,
      rating: Number(productData.rating) || 5.0,
      soldCount: Number(productData.soldCount) || 0,
      isFeatured: Boolean(productData.isFeatured),
      isTrending: Boolean(productData.isTrending),
      isFlashDeal: Boolean(productData.isFlashDeal),
      isTopRated: Boolean(productData.isTopRated),
      packages: productData.packages && productData.packages.length > 0
        ? productData.packages
        : [{ id: `pkg-${Date.now()}`, name: 'Standard Edition', price: Number(productData.price) || 0, oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null }],
      ...productData,
      price: Number(productData.price) || 0,
      oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            ...updatedData,
            price: Number(updatedData.price ?? p.price),
            oldPrice: updatedData.oldPrice !== undefined ? (updatedData.oldPrice ? Number(updatedData.oldPrice) : null) : p.oldPrice,
            stock: updatedData.stock !== undefined ? Number(updatedData.stock) : p.stock,
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  const toggleSectionFlag = (productId, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        toggleSectionFlag,
        resetToDefaults,
      }}
    >
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
