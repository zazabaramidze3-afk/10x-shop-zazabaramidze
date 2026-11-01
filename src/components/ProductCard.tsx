import { Link } from 'react-router-dom'
import Button from './Button'
import useCart from '../hooks/useCart'
import type { Product } from '../types/product'
import { discountedPrice, formatPrice } from '../utils/format'
import { createCartItem, getQuantityInCart } from '../utils/cart'

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { items, addItem } = useCart()
    const finalPrice = discountedPrice(product.price, product.discountPercentage)
    const remainingStock = product.stock - getQuantityInCart(items, product.id)
    const isOutOfStock = remainingStock < 1

    const handleAddToCart = (): void => {
        addItem(createCartItem(product))
    }

    return (
        <article className='flex flex-col overflow-hidden rounded-xl border border-neutral-200 transition duration-200 hover:border-neutral-900'>
            <Link
                to={`/products/${product.id}`}
                className='block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading='lazy'
                    className='aspect-square w-full bg-neutral-100 object-cover'
                />
            </Link>

            <div className='flex flex-1 flex-col gap-2 p-4'>
                <h2 className='font-medium'>{product.title}</h2>

                <div className='flex items-baseline gap-2'>
                    <span className='text-lg font-semibold'>{formatPrice(finalPrice)}</span>
                    <span className='text-sm text-neutral-500 line-through'>
                        {formatPrice(product.price)}
                    </span>
                </div>

                <p className='text-sm text-neutral-600'>
                    {isOutOfStock ? 'Out of stock' : `${remainingStock} in stock`}
                </p>

                <Button className='mt-auto' onClick={handleAddToCart} disabled={isOutOfStock}>
                    {isOutOfStock ? 'Out of stock' : 'Add to cart'}
                </Button>
            </div>
        </article>
    )
}

export default ProductCard
