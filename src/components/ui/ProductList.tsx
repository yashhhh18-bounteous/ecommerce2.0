import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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

  if (loading) return <div>Loading products...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <div className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.category}</p>
            <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
