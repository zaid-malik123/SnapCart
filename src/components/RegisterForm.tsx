"use client";
import { Leaf } from "lucide-react";
import { User } from "lucide-react";
import { Lock } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { LogIn } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Mail } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type propType = {
  nextStep: (s: number) => void;
};

const RegisterForm = ({ nextStep }: propType) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
   setLoading(true) 
   e.preventDefault() 
  try {
    const res = await axios.post("/api/auth/register", {name, email, password})
    router.push("/login")
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <div
        onClick={() => nextStep(1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-md">Back</span>
      </div>
      <motion.h1
        initial={{
          y: -10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Create Account
      </motion.h1>
      <motion.p
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="text-gray-600 mb-8 flex items-center"
      >
        Join Snapcart today <Leaf className="w-5 h-5 text-green-600" />
      </motion.p>

      <motion.form onSubmit={handleSignup}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
      > 

      {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            type="text"
            placeholder="your Name"
          />
        </div>
      {/* Email */}
         <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            type="text"
            placeholder="your Email"
          />
        </div>
      {/* Password */}
         <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            type= {showPassword? "text" : "password"}
            placeholder="your Password"
          />
          {
            showPassword ? <EyeOff onClick={() => setShowPassword(false)} className= "absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer" /> : <EyeIcon onClick={() => setShowPassword(true)}  className= "absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"/>
          }
        </div>

        {
          (() => {
            const formValidation = name != "" && email != "" && password != ""
             return <button disabled={!formValidation || loading} className= {`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${
              formValidation? "bg-green-600 hover:bg-green-700 text-white":
              "bg-gray-300 text-gray-500 cursor-not-allowed"
             }`}>
                 {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "SignUp"}
             </button>
          })()
        }

        <div className="flex items-center text-gray-400 text-sm mt-2 gap-2">
          <span className="flex-1 h-px bg-gray-200"></span>
           OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>
       
       <div onClick={() => signIn("google", {callbackUrl: "/"})} className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200">
        <FcGoogle size={30} />
        Continue with Google
       </div>

       <p onClick={() => router.push("/login")} className="text-gray-600 mt-6 text-sm flex items-center justify-center gap-1 cursor-pointer">Already have an account ? <span className="text-green-600"><LogIn/></span></p>
        
      </motion.form>
    </div>
  );
};

export default RegisterForm;
