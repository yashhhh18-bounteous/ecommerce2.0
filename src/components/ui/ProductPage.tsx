import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart } from "lucide-react"

import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import { AuthContext } from "../../context/AuthContext"

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const auth = useContext(AuthContext)
  const cartContext = useContext(CartContext)
  const wishlistContext = useContext(WishlistContext)

  if (!cartContext || !wishlistContext || !auth) return null

  const { addToCart } = cartContext
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    wishlistContext

  useEffect(() => {
    if (!id) return
    setLoading(true)

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="p-6">Loading product...</div>
  if (!product) return <div className="p-6">Product not found</div>

  const isWishlisted = isInWishlist(product.id)

  return (
    <div className="container mx-auto py-6 px-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">
        &larr; Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col gap-4">

          {/* Title + Wishlist */}
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">
              {product.title}
            </h1>

            <button
              onClick={() => {
                if (!auth.isAuthenticated) {
                  alert("Please sign in to add items to your wishlist")
                  return
                }
                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }}
            >
              <Heart
                size={26}
                className={`transition ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          <p className="text-gray-600">{product.category}</p>

          <p className="text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700">{product.description}</p>

          {/* Add to Cart Button */}
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            onClick={() => {
              if (!auth.isAuthenticated) {
                alert("Please sign in to add items to your cart")
                return
              }
              addToCart(product)
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
