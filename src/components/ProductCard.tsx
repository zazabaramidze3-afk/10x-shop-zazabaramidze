import { Link } from 'react-router-dom'
import Button from './Button'
import StockBadge from './StockBadge'
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
        <article className='group/card flex flex-col overflow-hidden rounded-xl border border-neutral-200 transition duration-300 ease-out hover:-translate-y-1 hover:border-neutral-900 hover:opacity-100! hover:blur-none! hover:shadow-lg group-hover/grid:opacity-60 group-hover/grid:blur-[2px] motion-reduce:transition-none motion-reduce:hover:translate-y-0'>
            <Link
                to={`/products/${product.id}`}
                className='block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading='lazy'
                    className='aspect-[4/3] w-full bg-neutral-100 object-cover transition duration-500 ease-out group-hover/card:scale-105 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100'
                />
            </Link>

            <div className='flex flex-1 flex-col gap-1.5 p-3'>
                <h2 className='line-clamp-2 text-sm font-medium'>{product.title}</h2>

                <div className='flex items-baseline gap-2'>
                    <span className='font-semibold'>{formatPrice(finalPrice)}</span>
                    <span className='text-sm text-neutral-500 line-through'>
                        {formatPrice(product.price)}
                    </span>
                </div>

                <StockBadge remainingStock={remainingStock} />

                <Button className='mt-auto' onClick={handleAddToCart} disabled={isOutOfStock}>
                    {isOutOfStock ? 'Out of stock' : 'Add to cart'}
                </Button>
            </div>
        </article>
    )
}

export default ProductCard
