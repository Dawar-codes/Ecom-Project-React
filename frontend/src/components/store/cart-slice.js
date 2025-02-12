import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], totalPrice: 0 },
    reducers: {
        addToCart(state, action) {
            if (!Array.isArray(state.items)) {
                state.items = [];
            }
            const product = action.payload;
            const existingItem = state.items.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ product, quantity: 1 })
            }
            state.totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
        },
        removeFromCart(state, action) {
            if (!Array.isArray(state.items)) {
                state.items = [];
            }
            const productId = action.payload;
            const existingItem = state.items.find(item => item.product.id === productId);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.product.id !== productId)
                }
            }
            state.totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
        },
        deleteItem(state, action) {
            const productId = action.payload;
            // Remove the item completely from the cart
            state.items = state.items.filter(item => item.product.id !== productId);
            state.totalPrice = state.items.reduce(
                (total, item) => total + item.product.price * item.quantity, 0);    
        },
        clearCart(state, action) {
            state.items = [];
            state.totalPrice = 0;
        }


    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;