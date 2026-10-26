const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

export function formatPrice(amount: number): string {
    return priceFormatter.format(amount)
}

export function discountedPrice(price: number, discountPercentage: number): number {
    const result = price * (1 - discountPercentage / 100)
    return Math.round(result * 100) / 100
}