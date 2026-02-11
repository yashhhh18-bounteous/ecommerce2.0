import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

import { CartContext } from "../../context/CartContext"
import type { Product as CartProduct } from "../../context/CartContext"

import { WishlistContext } from "../../context/WishlistContext"

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Cart
  const { addToCart } = useContext(CartContext)!

  // Wishlist
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext)!

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-4">Loading products...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => {
        const isWishlisted = isInWishlist(product.id)

        return (
          <div
            key={product.id}
            className="relative border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition"
          >
            {/* ❤️ Wishlist Heart */}
            <button
              className="absolute top-3 right-3 z-10"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()

                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product as CartProduct)
              }}
            >
              <Heart
                size={22}
                className={`transition ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>

            {/* Product Image + Title */}
            <Link
              to={`/product/${product.id}`}
              className="w-full flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 text-center line-clamp-2">
                {product.title}
              </h3>
            </Link>

            <p className="text-gray-600 mb-2">{product.category}</p>
            <p className="font-bold text-xl mb-4">
              ${product.price.toFixed(2)}
            </p>

            {/* 🛒 Add to Cart */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              onClick={() => addToCart(product as CartProduct)}
            >
              Add to Cart
            </button>
          </div>
        )
      })}
    </div>
  )
}
