import { useState, type ChangeEvent } from 'react'
import { fetchProducts } from '../api/products.api'
import type { SortOption } from '../types/product'
import ProductGrid from '../components/ProductGrid'
import { sortProducts } from '../utils/sortProducts'
import { useFetch } from '../hooks/useFetch'


const sortChoices: ReadonlyArray<{ value: SortOption; label: string }> = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price ↑' },
    { value: 'price-desc', label: 'Price ↓' },
    { value: 'rating-desc', label: 'Top rated' },
]

const ALL_CATEGORIES = 'all'
const COLLAPSED_CATEGORY_COUNT = 7

const CatalogPage = () => {
    const [sortOption, setSortOption] = useState<SortOption>('default')
    const [query, setQuery] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES)
    const [showAllCategories, setShowAllCategories] = useState<boolean>(false)
    const { data, isLoading, error } = useFetch(fetchProducts)
    const products = data?.products ?? []

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
    const categories = [ALL_CATEGORIES, ...Array.from(new Set(products.map((product) => product.category)))]
    const collapsedCategories = categories.slice(0, COLLAPSED_CATEGORY_COUNT)
    if (!collapsedCategories.includes(selectedCategory)) {
        collapsedCategories.push(selectedCategory)
    }
    const visibleCategories = showAllCategories ? categories : collapsedCategories
    const filteredProducts = products.filter(
        (product) =>
            (selectedCategory === ALL_CATEGORIES || product.category === selectedCategory) &&
            product.title.toLowerCase().includes(normalizedQuery),
    )
    const visibleProducts = sortProducts(filteredProducts, sortOption)

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>Catalog</h1>
            <div className='space-y-3'>
                <div className='relative'>
                    <svg
                        aria-hidden='true'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400'
                    >
                        <circle cx='11' cy='11' r='7' />
                        <path d='m20 20-3.5-3.5' />
                    </svg>
                    <input
                        type='search'
                        value={query}
                        onChange={handleQueryChange}
                        aria-label='Search products'
                        placeholder='Search products...'
                        className='catalog-control w-full pl-10'
                    />
                </div>
                <div className='flex flex-wrap items-center gap-2' role='group' aria-label='Filter by category'>
                    {visibleCategories.map((category) => (
                        <button
                            key={category}
                            type='button'
                            onClick={() => setSelectedCategory(category)}
                            aria-pressed={selectedCategory === category}
                            className={`rounded-full px-4 py-1.5 text-sm capitalize transition duration-200 ${
                                selectedCategory === category
                                    ? 'bg-neutral-900 text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            }`}
                        >
                            {category.replace(/-/g, ' ')}
                        </button>
                    ))}
                    {categories.length > COLLAPSED_CATEGORY_COUNT + 1 && (
                        <button
                            type='button'
                            onClick={() => setShowAllCategories((previous) => !previous)}
                            aria-expanded={showAllCategories}
                            className='rounded-full px-3 py-1.5 text-sm font-medium underline underline-offset-4 transition duration-200 hover:opacity-70'
                        >
                            {showAllCategories ? 'Show less' : 'More'}
                        </button>
                    )}
                </div>
                <div className='flex flex-wrap items-center gap-2' role='group' aria-label='Sort products'>
                    {sortChoices.map((choice) => (
                        <button
                            key={choice.value}
                            type='button'
                            onClick={() => setSortOption(choice.value)}
                            aria-pressed={sortOption === choice.value}
                            className={`rounded-full px-4 py-1.5 text-sm transition duration-200 ${
                                sortOption === choice.value
                                    ? 'bg-neutral-900 text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            }`}
                        >
                            {choice.label}
                        </button>
                    ))}
                </div>
            </div>

            { visibleProducts.length === 0 
                ? ( <p className='text-neutral-600'>No products match your filters.</p>) 
                : (<ProductGrid products={visibleProducts} /> )
            }
        </div>
    )
}

export default CatalogPage
