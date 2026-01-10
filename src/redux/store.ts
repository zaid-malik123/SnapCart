import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './features/user.slice'

export const store = configureStore({
  reducer: {
    userSlice: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch