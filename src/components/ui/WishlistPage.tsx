import { useContext } from "react"
import { WishlistContext } from "../../context/WishlistContext"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

export function WishlistPage() {
  const auth = useContext(AuthContext)
  const wishlistContext = useContext(WishlistContext)
  const cartContext = useContext(CartContext)

  if (!wishlistContext || !cartContext) return null

  // Check if user is authenticated
  if (!auth?.isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-4">Please sign in to view your wishlist.</p>
        <Link to="/" className="text-blue-600 underline">
          Go to Home
        </Link>
      </div>
    )
  }

  const { wishlist, removeFromWishlist } = wishlistContext
  const { addToCart } = cartContext

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 object-contain mx-auto mb-4"
            />

            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-600 mb-3">
              ${item.price.toFixed(2)}
            </p>

            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => addToCart(item)}
              >
                Move to Cart
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
