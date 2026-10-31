import { Link } from 'react-router-dom'
import Button from './Button'
import useCart from '../hooks/useCart'
import type { Product } from '../types/product'
import { discountedPrice, formatPrice } from '../utils/format'

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addItem } = useCart()
    const finalPrice = discountedPrice(product.price, product.discountPercentage)
    const isOutOfStock = product.stock < 1

    const handleAddToCart = (): void => {
        addItem({
            productId: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            discountPercentage: product.discountPercentage,
            stock: product.stock,
            quantity: 1,
        })
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

                <Button className='mt-auto' onClick={handleAddToCart} disabled={isOutOfStock}>
                    {isOutOfStock ? 'Out of stock' : 'Add to cart'}
                </Button>
            </div>
        </article>
    )
}

export default ProductCard
