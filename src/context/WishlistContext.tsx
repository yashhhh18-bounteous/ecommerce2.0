import { createContext, useState, useEffect, useContext } from "react"
import type { ReactNode } from "react"
import type { Product } from "./CartContext"
import { AuthContext } from "./AuthContext"

type WishlistContextType = {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

export const WishlistContext =
  createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext)
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (auth?.user) {
      const userWishlistKey = `wishlist_${auth.user.id}`
      const stored = localStorage.getItem(userWishlistKey)
      return stored ? JSON.parse(stored) : []
    }
    return []
  })

  useEffect(() => {
    if (auth?.user) {
      const userWishlistKey = `wishlist_${auth.user.id}`
      const stored = localStorage.getItem(userWishlistKey)
      setWishlist(stored ? JSON.parse(stored) : [])
    } else {
      setWishlist([])
    }
  }, [auth?.user])

  useEffect(() => {
    if (auth?.user) {
      const userWishlistKey = `wishlist_${auth.user.id}`
      localStorage.setItem(userWishlistKey, JSON.stringify(wishlist))
    }
  }, [wishlist, auth?.user])

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
