import { createContext, useState, useEffect, useContext } from "react"
import type { ReactNode } from "react"
import { AuthContext } from "./AuthContext"

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

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
  const auth = useContext(AuthContext)
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined" && auth?.user) {
      const userCartKey = `cart_${auth.user.id}`
      const storedCart = localStorage.getItem(userCartKey)
      return storedCart ? JSON.parse(storedCart) : []
    }
    return []
  })

  useEffect(() => {
    if (auth?.user) {
      const userCartKey = `cart_${auth.user.id}`
      const storedCart = localStorage.getItem(userCartKey)
      setCart(storedCart ? JSON.parse(storedCart) : [])
    } else {
      setCart([])
    }
  }, [auth?.user])

  useEffect(() => {
    if (auth?.user) {
      const userCartKey = `cart_${auth.user.id}`
      localStorage.setItem(userCartKey, JSON.stringify(cart))
    }
  }, [cart, auth?.user])

const addToCart = (product: Product, qty: number = 1) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id)
    if (existing) {
      return prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
        .filter((item) => item.quantity > 0)
    }
    return qty > 0 ? [...prev, { ...product, quantity: qty }] : prev
  })
}


  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
