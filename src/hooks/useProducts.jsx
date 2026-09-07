import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS } from '../data/products'

const STORAGE_KEY = 'dano_products'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Failed to load products from local storage:', e)
    }
    return INITIAL_PRODUCTS
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (e) {
      console.error('Failed to save products to local storage:', e)
    }
  }, [products])

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod_${Date.now()}`,
      slug: productData.slug || (productData.name ? productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `prod-${Date.now()}`),
      rating: productData.rating || 5.0,
      soldCount: productData.soldCount || 0,
      stock: Number(productData.stock ?? 100),
      packages: productData.packages || [{ name: 'Standard Edition', price: Number(productData.price) }]
    }
    setProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const updateStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Number(newStock) } : p))
  }

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS))
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
