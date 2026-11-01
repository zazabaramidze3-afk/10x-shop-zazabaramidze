import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'
import useCart from '../hooks/useCart'
import type { FormErrors } from '../types/form'
import type { OrderSummary, ShippingInfo } from '../types/order'
import { getCartSubtotal } from '../utils/cart'
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

    if (items.length === 0) {
        return (
            <div className='space-y-4'>
                <h1 className='text-2xl font-semibold'>Your cart is empty</h1>
                <Link to='/' className='inline-block text-sm font-medium underline transition duration-200 hover:opacity-70'>
                    Back to catalog
                </Link>
            </div>
        )
    }

    return (
        <div className='mx-auto max-w-lg space-y-6'>
            <h1 className='text-2xl font-semibold'>Checkout</h1>

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

                <Button type='submit' className='w-full'>
                    Place order
                </Button>
            </form>
        </div>
    )
}

export default CheckoutPage
