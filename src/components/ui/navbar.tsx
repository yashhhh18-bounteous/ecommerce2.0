import { Link } from "react-router-dom"
import { Menu, User, ShoppingCart, Search, Heart } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const { cart } = useContext(CartContext)!
  const { wishlist } = useContext(WishlistContext)!

  // Total cart quantity
  const totalCartItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <header className="sticky top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center">

      <div className="w-full px-4 flex h-14 items-center justify-between gap-4">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-6 min-w-[120px]">
          <Link to="/" className="font-bold text-xl text-blue-600">
            MegaMart
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/features">Features</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/pricing">Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
              className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side: User + Wishlist + Cart */}
        <div className="flex items-center gap-6 min-w-[160px]">

          {/* User */}
          <Link
            to="/signin"
            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
          >
            <User size={18} />
            Sign Up/Sign In
          </Link>

          {/* ❤️ Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-red-500"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* 🛒 Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-6">
                  <Link to="/features" className="text-lg font-medium">
                    Features
                  </Link>
                  <Link to="/pricing" className="text-lg font-medium">
                    Pricing
                  </Link>
                  <Link to="/wishlist" className="text-lg font-medium">
                    Wishlist
                  </Link>
                  <Link to="/cart" className="text-lg font-medium">
                    Cart
                  </Link>
                  <hr />
                  <Button variant="ghost" className="justify-start">
                    Login
                  </Button>
                  <Button className="justify-start">Get Started</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
