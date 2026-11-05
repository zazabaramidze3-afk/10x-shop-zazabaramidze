import { useEffect, useState, type ChangeEvent } from 'react'
import { fetchProducts } from '../api/products.api'
import type { Product } from '../types/product'
import ProductGrid from '../components/ProductGrid'

const CatalogPage = () => {
    const [query, setQuery] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value)
    }

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

    const normalizedQuery = query.trim().toLowerCase()
    const visibleProducts = products.filter((product) => product.title.toLowerCase().includes(normalizedQuery))


    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>Catalog</h1>
            <input 
                type='search'
                value={query}
                onChange={handleQueryChange}
                aria-label='Search products'
                placeholder='Search products...'
                className='input-field'
            />

            { visibleProducts.length === 0 
                ? ( <p className='text-neutral-600'>No products match "{query}".</p>) 
                : (<ProductGrid products={visibleProducts} /> )
            }
        </div>
    )
}

export default CatalogPage
