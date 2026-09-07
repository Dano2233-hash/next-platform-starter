import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'dano_cart'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load cart from local storage:', e)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    } catch (e) {
      console.error('Failed to save cart to local storage:', e)
    }
  }, [cartItems])

  const addToCart = (product, selectedPackage, quantity = 1) => {
    const pkg = selectedPackage || (product.packages && product.packages[0]) || { name: 'Standard Edition', price: product.price }
    const cartItemId = `${product.id}_${pkg.name}`

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.cartItemId === cartItemId)
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        }
        return updated
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            platform: product.platform,
            category: product.category,
            type: product.type,
            selectedPackage: pkg.name,
            price: Number(pkg.price || product.price),
            quantity
          }
        ]
      }
    })
  }

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setCartItems(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
  }

  const clearCart = () => {
    setCartItems([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Failed to clear cart in local storage:', e)
    }
  }

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
