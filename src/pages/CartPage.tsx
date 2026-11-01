import { Link } from 'react-router-dom'
import Button from '../components/Button'
import useCart from '../hooks/useCart'
import { getCartSubtotal, getLineTotal } from '../utils/cart'
import { discountedPrice, formatPrice } from '../utils/format'

const CartPage = () => {
    const { items, removeItem, updateQuantity, clearCart } = useCart()

    const handleClearCart = (): void => {
        if (window.confirm('Clear the cart? This cannot be undone.')) {
            clearCart()
        }
    }

    if (items.length === 0) {
        return (
            <div className='space-y-4'>
                <h1 className='text-2xl font-semibold'>Your cart is empty.</h1>
                <Link
                    to='/'
                    className='inline-block text-sm font-medium underline transition duration-200 hover:opacity-70'
                >
                    Browse products
                </Link>
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>Cart</h1>

            <ul className='space-y-4'>
                {items.map((item) => (
                    <li
                        key={item.productId}
                        className='flex flex-col gap-4 rounded-xl border border-neutral-200 p-4 sm:flex-row sm:items-center'
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className='h-24 w-24 rounded-xl bg-neutral-100 object-cover'
                        />

                        <div className='flex-1 space-y-1'>
                            <Link
                                to={`/products/${item.productId}`}
                                className='font-medium transition duration-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
                            >
                                {item.title}
                            </Link>
                            <p className='text-sm text-neutral-600'>
                                {formatPrice(discountedPrice(item.price, item.discountPercentage))} each
                            </p>
                        </div>

                        <div className='flex items-center gap-3'>
                            <Button
                                variant='secondary'
                                aria-label={`Decrease quantity of ${item.title}`}
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                                −
                            </Button>
                            <span className='w-6 text-center'>{item.quantity}</span>
                            <Button
                                variant='secondary'
                                aria-label={`Increase quantity of ${item.title}`}
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                            >
                                +
                            </Button>
                        </div>

                        <p className='w-24 font-semibold sm:text-right'>{formatPrice(getLineTotal(item))}</p>

                        <Button variant='secondary' onClick={() => removeItem(item.productId)}>
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>

            <div className='flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-xl font-semibold'>Subtotal: {formatPrice(getCartSubtotal(items))}</p>

                <div className='flex gap-3'>
                    <Button variant='secondary' onClick={handleClearCart}>
                        Clear cart
                    </Button>
                    <Link
                        to='/checkout'
                        className='rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
                    >
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartPage
