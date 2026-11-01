
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiError } from '../api/ApiError'
import { fetchProductById } from '../api/products.api'
import Button from '../components/Button'
import useCart from '../hooks/useCart'
import NotFoundPage from './NotFoundPage'
import type { Product } from '../types/product'
import { createCartItem, getQuantityInCart } from '../utils/cart'
import { discountedPrice, formatPrice } from '../utils/format'

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const productId = Number(id)

    const { items, addItem } = useCart()
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isNotFound, setIsNotFound] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    useEffect(() => {
        // /products/abc ტიპის არასწორ id-ს API-ს აღარ ვეკითხებით
        if (!Number.isInteger(productId)) {
            return
        }

        const loadProduct = async (): Promise<void> => {
            try {
                const data = await fetchProductById(productId)
                setProduct(data)
            } catch (err) {
                if (err instanceof ApiError && err.status === 404) {
                    setIsNotFound(true)
                } else {
                    setError(err instanceof Error ? err.message : 'Something went wrong')
                }
            } finally {
                setIsLoading(false)
            }
        }

        void loadProduct()
    }, [productId])

    if (!Number.isInteger(productId) || isNotFound) {
        return <NotFoundPage />
    }

    if (isLoading) {
        return <p>Loading product...</p>
    }

    if (error) {
        return <p className='text-red-600'>{error}</p>
    }

    if (!product) {
        return <NotFoundPage />
    }

    const finalPrice = discountedPrice(product.price, product.discountPercentage)
    const remainingStock = product.stock - getQuantityInCart(items, product.id)
    const isOutOfStock = remainingStock < 1
    const selectedQuantity = Math.min(quantity, Math.max(remainingStock, 1))

    const handleAddToCart = (): void => {
        addItem({ ...createCartItem(product), quantity: selectedQuantity })
        setQuantity(1)
    }

    return (
        <div className='space-y-6'>
            <Link
                to='/'
                className='inline-block text-sm font-medium transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'
            >
                ← Back to catalog
            </Link>

            <div className='grid gap-8 md:grid-cols-2'>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='aspect-square w-full rounded-xl bg-neutral-100 object-cover'
                />

                <div className='space-y-4'>
                    <p className='text-sm uppercase tracking-wide text-neutral-500'>{product.category}</p>
                    <h1 className='text-2xl font-semibold'>{product.title}</h1>
                    <p className='text-neutral-600'>{product.description}</p>

                    <div className='flex items-baseline gap-2'>
                        <span className='text-2xl font-semibold'>{formatPrice(finalPrice)}</span>
                        <span className='text-neutral-500 line-through'>{formatPrice(product.price)}</span>
                    </div>

                    <p className='text-sm text-neutral-600'>
                        Rating: {product.rating} / 5 · {isOutOfStock ? 'Out of stock' : `${remainingStock} in stock`}
                    </p>

                    {!isOutOfStock && (
                        <div className='flex items-center gap-3'>
                            <Button
                                variant='secondary'
                                aria-label='Decrease quantity'
                                onClick={() => setQuantity(selectedQuantity - 1)}
                                disabled={selectedQuantity <= 1}
                            >
                                −
                            </Button>
                            <span className='w-6 text-center' aria-live='polite'>
                                {selectedQuantity}
                            </span>
                            <Button
                                variant='secondary'
                                aria-label='Increase quantity'
                                onClick={() => setQuantity(selectedQuantity + 1)}
                                disabled={selectedQuantity >= remainingStock}
                            >
                                +
                            </Button>
                        </div>
                    )}

                    <Button className='w-full md:w-auto' onClick={handleAddToCart} disabled={isOutOfStock}>
                        {isOutOfStock ? 'Out of stock' : 'Add to cart'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
