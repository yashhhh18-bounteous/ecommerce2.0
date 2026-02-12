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
            className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition h-full flex flex-col bg-white"
          >
            {/* ❤️ Wishlist Heart */}
            <button
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()

                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product as CartProduct)
              }}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={20}
                className={`transition ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>

            {/* Product Image */}
            <Link
              to={`/product/${product.id}`}
              className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden border-b"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain p-2"
              />
            </Link>

            {/* Product Details - Flex to fill space */}
            <div className="p-4 flex flex-col flex-1">
              {/* Title */}
              <Link
                to={`/product/${product.id}`}
                className="hover:text-blue-600 transition"
              >
                <h3 className="font-semibold text-sm mb-2 text-center line-clamp-2 h-10 flex items-center justify-center">
                  {product.title}
                </h3>
              </Link>

              {/* Category */}
              <p className="text-gray-500 text-xs text-center mb-3 uppercase tracking-wide">
                {product.category}
              </p>

              {/* Price - sticky to bottom */}
              <div className="flex flex-col flex-1 justify-between">
                <p className="text-gray-600 text-xs mb-4 line-clamp-2 flex-1">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <p className="font-bold text-lg text-blue-600 text-center">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* 🛒 Add to Cart Button */}
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full font-medium text-sm"
                    onClick={() => addToCart(product as CartProduct)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
