"use client"
import { Smartphone } from "lucide-react"
import { Truck } from "lucide-react"
import { Leaf } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ShoppingBasket } from "lucide-react"


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)  
  const slides = [
    {
        id: 1,
        icons: <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg"/>,
        title: "Fresh Organic Groceries 🥦",
        subtitle: "From - fresh fruites , vegetables, and daily essentials delivered to you.",
        btnText: "Shop Now",
        bg: "https://plus.unsplash.com/premium_photo-1663926032113-cc8eee2268e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RnJlc2glMjBvcmdhbmljJTIwZ3JvY2VyaWVzfGVufDB8fDB8fHww"
    },
    {
        id: 2,
        icons: <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg"/>,
        title: "Fast & Reliable Delivery 🚚",
        subtitle: "We ensure your groceries reach your doorstep in no time.",
        btnText: "Order Now",
        bg: "https://images.unsplash.com/photo-1648394794449-5dbe63f6a8b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzdCUyMGdyb2NlcnklMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 3,
        icons: <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg"/>,
        title: "Shop Anutime Anywhere 📲",
        subtitle: "Easy and seamless online grocery shopping experience.",
        btnText: "Get Started",
        bg: "https://plus.unsplash.com/premium_photo-1726869818459-061e0986c1a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEZyZXNoJTIwb3JnYW5pYyUyMGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D"
    },
  ]
  
  useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentSlide((prev )=> (prev + 1) % (slides.length))
    }, 4000)
    return () => {
        clearTimeout(timer) 
    }
  }, [currentSlide])

  return (
    <div className="relative w-[98%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl"> 
      <AnimatePresence mode="wait">
         <motion.div
          key={currentSlide}
          initial={{
            opacity:0
          }} 
          animate={{
            opacity:1
          }}
          transition={{
            duration: 0.8
          }}
          exit={{
            opacity:0
          }}
          className="absolute inset-0"
          >
           <Image className="object-cover" src={slides[currentSlide].bg} fill alt="slide" priority/>
           <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
         </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <motion.div
        initial={{
            y: 30,
            opacity: 0
        }}
        animate={{
            y:0,
            opacity: 1
        }}
        transition={{
            duration: 0.6
        }}
        className="flex flex-col items-center justify-center gap-6 max-w-3xl"
        >
        <div className="bg-white/10 backdrop:blur-md p-6 rounded-full shadow-lg">{slides[currentSlide].icons}</div> 
        <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight drop-shadow-lg">{slides[currentSlide].title}</h1>
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">{slides[currentSlide].subtitle}</p>
        <motion.button whileHover={{scale: 1.09}} whileTap={{scale: 0.96}} transition={{duration:0.2}} className="mt-4 bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2">
            <ShoppingBasket className = "w-5 h-5" />
            {slides[currentSlide].btnText}
        </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
         {slides.map((_, i) => (
            <button className= {`w-3 h-3 rounded-full transition-all ${
                i == currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}/>
         ))}
      </div>
    </div>
  )
}

export default Hero