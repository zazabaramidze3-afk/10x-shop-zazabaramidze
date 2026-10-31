import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products.api'
import type { Product } from '../types/product'

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
        <div className='space-y-4'>
            <h1 className='text-2xl font-semibold'>Catalog</h1>
            <ul className='space-y-1'>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default CatalogPage
