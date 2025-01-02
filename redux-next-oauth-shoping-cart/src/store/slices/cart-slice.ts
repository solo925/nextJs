import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CartItem {
    id: number;
    name: string;
    price: number;

}


interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            console.log(state, action);
            state.cartItems.push(action.payload);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            let cpyCartItems = [...state.cartItems];
            cpyCartItems = cpyCartItems.filter((item) => item.id !== action.payload);
            state.cartItems = cpyCartItems;

            return state;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
