import { Link } from "react-router-dom";
import { Menu, User, ShoppingCart, Search } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
              className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side: User + Cart */}
        <div className="flex items-center gap-6 min-w-[140px]">
          {/* User Icon + Text */}
          <Link
            to="/signin"
            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
          >
            <User size={18} />
            Sign Up/Sign In
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
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
  );
}
