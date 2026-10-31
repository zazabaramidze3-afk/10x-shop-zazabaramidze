import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products.api'
import type { Product } from '../types/product'
import ProductCard from '../components/ProductCard'

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadProducts = async (): Promise<void> => {
            try {
                const data = await fetchProducts()
                setProducts(data.products)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                setIsLoading(false)
            }
        }

        void loadProducts()
    }, [])

    if (isLoading) {
        return <p>Loading products...</p>
    }

    if (error) {
        return <p className='text-red-600'>{error}</p>
    }

    if (products.length === 0) {
        return <p>No products found.</p>
    }

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>Catalog</h1>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default CatalogPage
