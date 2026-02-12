import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle, CheckCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"

interface FieldErrors {
  fullName: string
  address: string
  phone: string
}

export interface Order {
  orderId: string
  date: string
  fullName: string
  address: string
  phone: string
  payment: string
  items: any[]
  total: number
}

export default function Checkout() {
  const navigate = useNavigate()
  const cartContext = useContext(CartContext)
  const { cart } = cartContext || { cart: [] }

  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [payment, setPayment] = useState("COD")
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({
    fullName: "",
    address: "",
    phone: "",
  })

  // Calculate total from cart items
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const validateFields = (): boolean => {
    const newErrors: FieldErrors = {
      fullName: "",
      address: "",
      phone: "",
    }

    let isValid = true

    // Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters"
      isValid = false
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = "Address is required"
      isValid = false
    } else if (address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters"
      isValid = false
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleFieldChange = (field: keyof FieldErrors, value: string) => {
    if (field === "fullName") setFullName(value)
    else if (field === "address") setAddress(value)
    else if (field === "phone") setPhone(value)

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const handlePlaceOrder = () => {
    if (!validateFields()) {
      return
    }

    // Create order object
    const newOrder: Order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullName,
      address,
      phone,
      payment,
      items: cart,
      total: totalPrice,
    }

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    existingOrders.push(newOrder)
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    // Clear cart
    localStorage.removeItem("cart")

    setOpen(true)

    setTimeout(() => {
      setOpen(false)
      navigate("/") // redirect to homepage
    }, 2000)
  }

  const hasErrors = Object.values(errors).some((error) => error !== "")

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <Card className="flex-1">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-2">Checkout</h2>
            <p className="text-gray-600 mb-8">Complete your order details</p>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("fullName", e.target.value)
                  }
                  className={`${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.fullName}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-sm font-semibold mb-2 block">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  value={address}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleFieldChange("address", e.target.value)
                  }
                  className={`${
                    errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.address}</span>
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="10-digit phone number"
                  type="tel"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("phone", e.target.value)
                  }
                  className={`${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-sm font-semibold mb-4 block">
                  Payment Method
                </Label>

                <RadioGroup
                  value={payment}
                  onValueChange={(value: string) => setPayment(value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition">
                    <RadioGroupItem value="COD" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="cursor-pointer flex-1 font-medium"
                    >
                      Cash on Delivery
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition">
                    <RadioGroupItem value="CARD" id="card" />
                    <Label
                      htmlFor="card"
                      className="cursor-pointer flex-1 font-medium"
                    >
                      Credit/Debit Card
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition">
                    <RadioGroupItem value="UPI" id="upi" />
                    <Label
                      htmlFor="upi"
                      className="cursor-pointer flex-1 font-medium"
                    >
                      UPI
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                className={`w-full py-3 text-lg font-semibold rounded-lg transition ${
                  hasErrors
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={hasErrors}
              >
                Place Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="lg:w-80">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between py-3 font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-700">
                  ✓ Secure checkout powered by industry-leading encryption
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle size={24} />
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Thank you for your order. You will be redirected to the homepage.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
