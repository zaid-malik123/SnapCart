import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mongoose from 'mongoose';

interface groceryI {
  _id: mongoose.Types.ObjectId;
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
  cartData: groceryI[],
  subTotal: number,
  deliveryFee: number,
  finalTotal: number
}

const initialState: cartState = {
    cartData: [],
    subTotal: 0,
    deliveryFee: 40,
    finalTotal: 40
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<groceryI>) => {
        state.cartData.push(action.payload)
        cartSlice.caseReducers.calculateTotal(state)
    },
    increaseQuantity: (state, action:PayloadAction<mongoose.Types.ObjectId>) => {
        const item = state.cartData.find(i => i._id == action.payload)

        if(item) {
          item.quantity += 1
        }
        cartSlice.caseReducers.calculateTotal(state)

    },
    decreaseQuantity: (state, action:PayloadAction<mongoose.Types.ObjectId>) => {
        const item = state.cartData.find(i => i._id == action.payload)

        if(item?.quantity && item.quantity > 1) {
          item.quantity -= 1
        }

        else {
          state.cartData = state.cartData.filter((item) => item._id != action.payload)
        }
        cartSlice.caseReducers.calculateTotal(state)

    },

    removeItem: (state, action: PayloadAction <mongoose.Types.ObjectId>) => {
      
      state.cartData =  state.cartData.filter(item => item._id != action.payload)
      cartSlice.caseReducers.calculateTotal(state)
      
    },

    calculateTotal: (state) => {
      state.subTotal = state.cartData.reduce((sum, item) => sum + Number(item.price) * item.quantity ,0)
      state.deliveryFee = state.subTotal > 100 ? 0 : 40
      state.finalTotal = state.subTotal + state.deliveryFee
    }

  },
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, calculateTotal } = cartSlice.actions
export default cartSlice.reducer