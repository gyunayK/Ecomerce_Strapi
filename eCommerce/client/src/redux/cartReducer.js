import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(product => product.id === action.payload.id)
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.products.push({ ...action.payload, quantity: action.payload.quantity })
            }
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        resetCart: (state) => {
            state.products = []
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer