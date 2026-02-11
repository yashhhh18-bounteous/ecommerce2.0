import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/ui/navbar"
import { ImageCarousel } from "./components/ui/ImageCarousel"
import { ProductList } from "./components/ui/ProductList"
import { ProductPage } from "./components/ui/ProductPage"
import { CartProvider } from "./context/CartContext"
import { CartPage } from "./components/ui/CartPage"
import { WishlistProvider } from "./context/WishlistContext"
import { WishlistPage } from "./components/ui/WishlistPage"




function App() {
  return (
    <BrowserRouter>

    <CartProvider>
       <WishlistProvider>
   
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-6 px-4 md:px-8">
          <Routes>
            {/* Home page: Carousel + Product List */}
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

            {/* PDP page */}
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Other pages */}
            <Route path="/features" element={<div>Features Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />
            <Route path="/cart" element={<CartPage />} />
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
