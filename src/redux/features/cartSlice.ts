import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mongoose from 'mongoose';

interface groceryI {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  quantity: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface cartState {
  cartData: groceryI[]
}

const initialState: cartState = {
    cartData: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<groceryI>) => {
        state.cartData.push(action.payload)
    }
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer