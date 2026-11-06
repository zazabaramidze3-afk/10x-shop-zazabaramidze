import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import useCart from '../hooks/useCart'
import { getCartSubtotal, getLineTotal } from '../utils/cart'
import { discountedPrice, formatPrice } from '../utils/format'

const CartPage = () => {
    const { items, removeItem, updateQuantity, clearCart } = useCart()

    const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false)

    const handleConfirmClear = (): void => {
        clearCart()
        setIsConfirmingClear(false)
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

                <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                    {isConfirmingClear ? (
                        <div role='alertdialog' aria-label='Confirm clearing the cart' className='flex flex-wrap items-center gap-3'>
                            <span className='w-full text-sm text-neutral-600 sm:w-auto'>Clear the cart?</span>
                            <Button variant='secondary' onClick={handleConfirmClear}>
                                Yes, clear
                            </Button>
                            <Button variant='secondary' onClick={() => setIsConfirmingClear(false)}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button variant='secondary' onClick={() => setIsConfirmingClear(true)}>
                            Clear cart
                        </Button>
                    )}
                    <Link
                        to='/checkout'
                        className='rounded-xl bg-neutral-900 px-5 py-2.5 text-center text-sm font-medium text-white transition duration-200 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
                    >
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartPage
