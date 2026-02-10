import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

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

  if (loading) return <div>Loading product...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto py-6">
      <Link to="/" className="text-blue-500 mb-4 inline-block">
        &larr; Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm object-contain"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
