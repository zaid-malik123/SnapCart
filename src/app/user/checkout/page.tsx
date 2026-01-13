"use client"

import { RootState } from "@/redux/store"
import { MapPin } from "lucide-react"
import { User } from "lucide-react"
import { Phone } from "lucide-react"
import { Building } from "lucide-react"
import { Search } from "lucide-react"
import { Navigation } from "lucide-react"
import { Home } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import {motion} from "motion/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"
const CheckOut = () => {
   const router = useRouter() 
   const {user} = useSelector((state: RootState) => state.userSlice)
   const [address, setAddress] = useState({
    fullName: user?.name,
    mobile: user?.mobile,
    city: "",
    state: "",
    pincode: "",
    fullAddress: ""
   })
  return (
    <div className='w-[92%] md:w-[80%] mx-auto py-10 relative'>
        <motion.button
        onClick={() => router.push("/user/cart")}
        whileTap={{scale: 0.97}}
        className="absolute left-0 top-2 flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold"
        >
        <ArrowLeft size={16}/>
        <span className="hidden md:block">Back to Cart</span>
        </motion.button>
        <motion.h1
        initial={{opacity:0, y: 10}}
        animate={{ opacity: 1, y:0}}
        transition={{duration: 0.3}}
        className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-10">CheckOut</motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
            <motion.div
            initial={{opacity:0, x: -20}}
            animate={{ opacity: 1, x:0}}
            transition={{duration: 0.3}}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><MapPin className="text-green-700"/> Delivery Address</h2>
                <div className="space-y-4">
                    <div className="relative">
                        <User size={18} className= "absolute left-3 top-3 text-green-600"/>
                        <input className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0" type="text" placeholder="Full Name" value={address.fullName} readOnly />
                    </div>
                     <div className="relative">
                        <Phone size={18} className= "absolute left-3 top-3 text-green-600"/>
                        <input className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0" type="text" placeholder="Full Name" value={address.mobile} readOnly />
                    </div>
                    <div className="relative">
                        <Home size={18} className= "absolute left-3 top-3 text-green-600"/>
                        <input  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0" type="text" placeholder="Full Address" value={address.fullAddress}  />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                         <div className="relative">
                            <Building size={18} className= "absolute left-3 top-3 text-green-600"/>
                            <input  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0" type="text" placeholder="City" value={address.city}  />
                        </div>
                        <div className="relative">
                            <Navigation size={18} className= "absolute left-3 top-3 text-green-600"/>
                            <input  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0" type="text" placeholder="State" value={address.state}  />
                        </div>
                        <div className="relative">
                            <Search size={18} className= "absolute left-3 top-3 text-green-600"/>
                            <input  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0" type="text" placeholder="Pincode" value={address.pincode}  />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                        <input className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none" placeholder="Search City or area..." type="text" />
                        <button className="bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition-all font-medium">Search</button>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default CheckOut