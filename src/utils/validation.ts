import type { FormErrors } from '../types/form'
import type { ShippingInfo } from '../types/order'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateShipping(values: ShippingInfo): FormErrors<ShippingInfo> {
    const errors: FormErrors<ShippingInfo> = {}

    if (values.fullName.trim().length < 3) {
        errors.fullName = 'Full name must be at least 3 characters'
    }

    if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = 'Please enter a valid email address'
    }

    if (values.address.trim().length < 5) {
        errors.address = 'Address must be at least 5 characters'
    }

    if (values.city.trim() === '') {
        errors.city = 'City is required'
    }

    return errors
}


