import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"



export function CartPage() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const cartContext = useContext(CartContext)
  if (!cartContext) return null

  // Check if user is authenticated
  if (!auth?.isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-4">Please sign in to view your cart.</p>
        <Link to="/" className="text-blue-600 underline">
          Go to Home
        </Link>
      </div>
    )
  }

  const { cart, addToCart, removeFromCart, clearCart } = cartContext

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain"
            />

            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 w-full">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => addToCart(item, -1)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => addToCart(item, 1)}
                >
                  +
                </button>

                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-4">
        <p className="text-lg font-bold">
          Total ({totalItems} items): ${totalPrice.toFixed(2)}
        </p>

        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
