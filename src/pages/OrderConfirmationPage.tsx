import { Link, Navigate, useLocation } from 'react-router-dom'
import type { OrderSummary } from '../types/order'
import { getLineTotal } from '../utils/cart'
import { formatPrice } from '../utils/format'

const OrderConfirmationPage = () => {
    const location = useLocation()
    const order = location.state as OrderSummary | null

    // გვერდის განახლებისას router state იკარგება, ამიტომ ვაბრუნებთ კატალოგზე
    if (!order) {
        return <Navigate to='/' replace />
    }

    return (
        <div className='mx-auto max-w-lg space-y-6'>
            <div className='space-y-1'>
                <h1 className='text-2xl font-semibold'>Thank you for your order!</h1>
                <p className='text-sm text-neutral-600'>
                    Placed on {new Date(order.placedAt).toLocaleString()}
                </p>
            </div>

            <section className='space-y-1 rounded-xl border border-neutral-200 p-4'>
                <h2 className='font-medium'>Shipping to</h2>
                <p>{order.shipping.fullName}</p>
                <p>{order.shipping.address}, {order.shipping.city}</p>
                <p className='text-sm text-neutral-600'>{order.shipping.email}</p>
            </section>

            <section className='space-y-3 rounded-xl border border-neutral-200 p-4'>
                <h2 className='font-medium'>Items</h2>
                <ul className='space-y-2'>
                    {order.items.map((item) => (
                        <li key={item.productId} className='flex justify-between gap-4 text-sm'>
                            <span>{item.title} × {item.quantity}</span>
                            <span>{formatPrice(getLineTotal(item))}</span>
                        </li>
                    ))}
                </ul>
                <p className='border-t border-neutral-200 pt-3 text-lg font-semibold'>
                    Total: {formatPrice(order.total)}
                </p>
            </section>

            <Link
                to='/'
                className='inline-block rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
            >
                Continue shopping
            </Link>
        </div>
    )
}

export default OrderConfirmationPage
