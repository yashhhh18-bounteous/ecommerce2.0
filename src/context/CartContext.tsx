import { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

// Product type from API
export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

// CartItem extends Product with quantity
export type CartItem = Product & {
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart")
      return storedCart ? JSON.parse(storedCart) : []
    }
    return []
  })

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ✅ Add to cart with quantity support
const addToCart = (product: Product, qty: number = 1) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id)
    if (existing) {
      // Update quantity by qty (can be +1 or -1)
      return prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
        .filter((item) => item.quantity > 0) // remove if quantity <= 0
    }
    // Only add if qty > 0
    return qty > 0 ? [...prev, { ...product, quantity: qty }] : prev
  })
}


  // ✅ Remove item completely from cart
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // ✅ Clear entire cart
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
