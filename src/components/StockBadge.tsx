interface StockBadgeProps {
    remainingStock: number
}

const LOW_STOCK_THRESHOLD = 5

const baseStyles =
    'inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium leading-none'

const StockBadge = ({ remainingStock }: StockBadgeProps) => {
    let label: string
    let colorStyles: string

    if (remainingStock < 1) {
        label = 'Out of stock'
        colorStyles = 'bg-red-500/15 text-red-700'
    } else if (remainingStock <= LOW_STOCK_THRESHOLD) {
        label = `Only ${remainingStock} left`
        colorStyles = 'bg-amber-500/15 text-amber-700'
    } else {
        label = `${remainingStock} in stock`
        colorStyles = 'bg-green-500/15 text-green-700'
    }

    return (
        <span className={`${baseStyles} ${colorStyles}`}>
            {/* პატარა წერტილი: bg-current იღებს ტექსტის ფერს */}
            <span aria-hidden='true' className='h-1.5 w-1.5 rounded-full bg-current' />
            {label}
        </span>
    )
}

export default StockBadge
