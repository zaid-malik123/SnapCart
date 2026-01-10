"use client"

import { setUser } from "@/redux/features/user.slice"
import { AppDispatch } from "@/redux/store"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetMe = () => {
  const dispatch = useDispatch<AppDispatch>()  
  useEffect(() => {
    const getMe = async () => {
        try {
            const res = await axios.get("/api/me")
            dispatch(setUser(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    getMe()
  }, [])
}

export default useGetMe