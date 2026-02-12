import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/ui/navbar"
import { ImageCarousel } from "./components/ui/ImageCarousel"
import { ProductList } from "./components/ui/ProductList"
import { ProductPage } from "./components/ui/ProductPage"
import { CartProvider } from "./context/CartContext"
import { CartPage } from "./components/ui/CartPage"
import { WishlistProvider } from "./context/WishlistContext"
import { WishlistPage } from "./components/ui/WishlistPage"
import Checkout from "./components/ui/checkout"
import { OrderHistory } from "./components/ui/OrderHistory"







function App() {
  return (
    <BrowserRouter>

    <CartProvider>
       <WishlistProvider>
   
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-6 px-4 md:px-8">
          <Routes>
            
            <Route
              path="/"
              element={
                <>
                  <ImageCarousel />
                  <div className="mt-8">
                    <ProductList />
                  </div>
                </>
              }
            />

           


            <Route path="/product/:id" element={<ProductPage />} />

          
            <Route path="/features" element={<div>Features Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />


            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/wishlist" element={<WishlistPage />} />


          </Routes>
        </main>
      </div>
</WishlistProvider>
       </CartProvider>
    </BrowserRouter>
  )
}

export default App
