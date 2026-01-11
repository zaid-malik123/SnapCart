import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './features/user.slice'
import  cartSlice  from './features/cartSlice'

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    cartSlice: cartSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch