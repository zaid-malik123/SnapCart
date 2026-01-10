import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import mongoose from 'mongoose'

interface userI{
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    mobile?: string,
    role: "user" | "deliveryBoy" | "admin",
    createdAt?: Date,
    updatedAt?: Date,
    image?: string
}


interface userState {
  user: userI | null
}

const initialState: userState = {
    user: null
  
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    }
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer