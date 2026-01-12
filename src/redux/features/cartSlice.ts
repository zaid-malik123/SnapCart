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
    },
    increaseQuantity: (state, action:PayloadAction<mongoose.Types.ObjectId>) => {
        const item = state.cartData.find(i => i._id == action.payload)

        if(item) {
          item.quantity += 1
        }

    },
    decreaseQuantity: (state, action:PayloadAction<mongoose.Types.ObjectId>) => {
        const item = state.cartData.find(i => i._id == action.payload)

        if(item?.quantity && item.quantity > 1) {
          item.quantity -= 1
        }

        else {
          state.cartData = state.cartData.filter((item) => item._id != action.payload)
        }
    }
  },
})

export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer