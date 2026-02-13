import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthContext } from "../../context/AuthContext"

interface OrderItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

interface Order {
  orderId: string
  date: string
  fullName: string
  address: string
  phone: string
  payment: string
  items: OrderItem[]
  total: number
}

export function OrderHistory() {
  const auth = useContext(AuthContext)
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    // Load orders for current user
    if (auth?.user) {
      const userOrdersKey = `orders_${auth.user.id}`
      const savedOrders = JSON.parse(localStorage.getItem(userOrdersKey) || "[]")
      setOrders(savedOrders)
    } else {
      setOrders([])
    }
  }, [auth?.user])

  // Check if user is authenticated
  if (!auth?.isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-4">Please sign in to view your order history.</p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Go to Home
          </Button>
        </Link>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders. Start shopping now!
          </p>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold mb-2">Order History</h1>
      <p className="text-gray-600 mb-8">View all your orders and details</p>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.orderId} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Order Header */}
              <button
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order.orderId ? null : order.orderId
                  )
                }
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-bold text-lg">{order.orderId}</h3>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-semibold">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Items</p>
                      <p className="font-semibold">{order.items.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment</p>
                      <p className="font-semibold">{order.payment}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="font-bold text-lg text-blue-600">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedOrder === order.orderId ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </div>
              </button>

              {/* Order Details - Expandable */}
              {expandedOrder === order.orderId && (
                <div className="border-t bg-gray-50 p-6">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-bold mb-4">Delivery Address</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">Name:</span>{" "}
                          <span className="font-semibold">{order.fullName}</span>
                        </p>
                        <p>
                          <span className="text-gray-600">Address:</span>{" "}
                          <span className="font-semibold">{order.address}</span>
                        </p>
                        <p>
                          <span className="text-gray-600">Phone:</span>{" "}
                          <span className="font-semibold">{order.phone}</span>
                        </p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                      <h4 className="font-bold mb-4">Payment Method</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">Method:</span>{" "}
                          <span className="font-semibold">{order.payment}</span>
                        </p>
                        <p>
                          <span className="text-gray-600">Order ID:</span>{" "}
                          <span className="font-semibold">{order.orderId}</span>
                        </p>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h4 className="font-bold mb-4">Order Summary</h4>
                      <div className="space-y-2 text-sm border-l-2 border-blue-200 pl-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total:</span>
                          <span className="text-blue-600">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-6">
                    <h4 className="font-bold mb-4">Items Ordered</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 bg-white rounded-lg border"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm line-clamp-2">
                              {item.title}
                            </h5>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
