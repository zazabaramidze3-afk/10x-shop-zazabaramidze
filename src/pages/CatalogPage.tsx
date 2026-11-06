import { useState, type ChangeEvent } from 'react'
import { fetchProducts } from '../api/products.api'
import type { SortOption } from '../types/product'
import ProductGrid from '../components/ProductGrid'
import { isSortOption } from '../utils/guards'
import { sortProducts } from '../utils/sortProducts'
import { useFetch } from '../hooks/useFetch'


const CatalogPage = () => {
    const [sortOption, setSortOption] = useState<SortOption>('default')
    const [query, setQuery] = useState<string>('')
    const { data, isLoading, error } = useFetch(fetchProducts)
    const products = data?.products ?? []

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {

        if (isSortOption(event.target.value)) {
            setSortOption(event.target.value)
        }
    }
    

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value)
    }


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
    const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(normalizedQuery))
    const visibleProducts = sortProducts(filteredProducts, sortOption)

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>Catalog</h1>
            <select
                value={sortOption}
                onChange={handleSortChange}
                aria-label='Sort products'
                className='input-field'
            >
                <option value='default'>Default</option>
                <option value='price-asc'>Price: low to high</option>
                <option value='price-desc'>Price: high to low</option>
                <option value='rating-desc'>Rating: high to low</option>
            </select>
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
