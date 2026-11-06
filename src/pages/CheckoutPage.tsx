import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'
import useCart from '../hooks/useCart'
import type { FormErrors } from '../types/form'
import type { OrderSummary, ShippingInfo } from '../types/order'
import { getCartSubtotal, getLineTotal } from '../utils/cart'
import { formatPrice } from '../utils/format'
import { validateShipping } from '../utils/validation'

const INITIAL_VALUES: ShippingInfo = {
    fullName: '',
    email: '',
    address: '',
    city: '',
}

const CheckoutPage = () => {
    const { items, clearCart } = useCart()
    const navigate = useNavigate()
    const [values, setValues] = useState<ShippingInfo>(INITIAL_VALUES)
    const [errors, setErrors] = useState<FormErrors<ShippingInfo>>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        setValues((prevValues) => ({ ...prevValues, [name]: value }))
    }

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault()

        const validationErrors = validateShipping(values)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        setIsSubmitting(true)

        // შეკვეთის "ქვითარი": ვინახავთ კალათის სურათს გასუფთავებამდე
        const order: OrderSummary = {
            items,
            shipping: values,
            total: getCartSubtotal(items),
            placedAt: new Date().toISOString(),
        }

        clearCart()
        navigate('/order-confirmation', { state: order })
    }

    // ცარიელი კალათით Checkout-ს აზრი არ აქვს: ვაბრუნებთ /cart-ზე (იქ ჩანს "Your cart is empty."). isSubmitting: შეკვეთის დროს clearCart() კალათას ცარიელს ხდის და ამ დროს /cart-ზე არ გადავდივართ
    if (items.length === 0 && !isSubmitting) {
        return <Navigate to='/cart' replace />
    }

    return (
        <div className='mx-auto max-w-lg space-y-6'>
            <Link
                to='/cart'
                className='inline-block text-sm font-medium transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'
            >
                ← Back to cart
            </Link>
            <h1 className='text-2xl font-semibold'>Checkout</h1>

            <section aria-label='Order summary' className='space-y-3 rounded-xl border border-neutral-200 p-4'>
                <h2 className='font-medium'>Order summary</h2>
                <ul className='space-y-2'>
                    {items.map((item) => (
                        <li key={item.productId} className='flex justify-between gap-4 text-sm'>
                            <span>{item.title} × {item.quantity}</span>
                            <span>{formatPrice(getLineTotal(item))}</span>
                        </li>
                    ))}
                </ul>
                <p className='border-t border-neutral-200 pt-3 text-lg font-semibold'>
                    Total: {formatPrice(getCartSubtotal(items))}
                </p>
            </section>

            <form onSubmit={handleSubmit} noValidate className='space-y-4'>
                <FormField
                    label='Full name'
                    id='fullName'
                    name='fullName'
                    value={values.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                />
                <FormField
                    label='Email'
                    id='email'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <FormField
                    label='Address'
                    id='address'
                    name='address'
                    value={values.address}
                    onChange={handleChange}
                    error={errors.address}
                />
                <FormField
                    label='City'
                    id='city'
                    name='city'
                    value={values.city}
                    onChange={handleChange}
                    error={errors.city}
                />

                <Button type='submit' className='w-full' disabled={isSubmitting}>
                    {isSubmitting ? 'Placing order...' : 'Place order'}
                </Button>
            </form>
        </div>
    )
}

export default CheckoutPage
