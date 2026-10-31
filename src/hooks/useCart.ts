import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import type { CartContextValue } from '../context/CartContext'

const useCart = (): CartContextValue => {
    const context = useContext(CartContext)

    if (context === null) {
        throw new Error('useCart must be used inside CartProvider')
    }

    return context
}

export default useCart