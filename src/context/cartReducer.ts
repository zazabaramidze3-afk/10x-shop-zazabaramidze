import type { CartItem } from '../types/cart'

export type CartAction =
    | { type: 'add'; item: CartItem }
    | { type: 'remove'; productId: number }
    | { type: 'setQuantity'; productId: number; quantity: number }
    | { type: 'clear' }

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case 'add': {
            const existing = state.find((item) => item.productId === action.item.productId)

            // ახალი პროდუქტია: ვამატებთ ახალ ხაზს
            if (!existing) {
                return [...state, action.item]
            }

            // უკვე არსებობს: ვზრდით რაოდენობას, მაგრამ stock-ს არ ვცდებით
            return state.map((item) =>
                item.productId === action.item.productId
                    ? { ...item, quantity: Math.min(item.quantity + action.item.quantity, item.stock) }
                    : item
            )
        }

        case 'remove': {
            return state.filter((item) => item.productId !== action.productId)
        }

        case 'setQuantity': {
            // 1-ზე ნაკლები რაოდენობა = პროდუქტის წაშლა
            if (action.quantity < 1) {
                return state.filter((item) => item.productId !== action.productId)
            }

            return state.map((item) =>
                item.productId === action.productId
                    ? { ...item, quantity: Math.min(action.quantity, item.stock) }
                    : item
            )
        }

        case 'clear': {
            return []
        }
    }
}
