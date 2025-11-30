"use client";
import axios from "axios";
import { UserCog } from "lucide-react";
import { Bike } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { User } from "lucide-react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditRoleMobile = () => {
  const [role, setRole] = useState([
    {
      id: "admin",
      lable: "Admin",
      icon: UserCog,
    },
    {
      id: "user",
      lable: "User",
      icon: User,
    },
    {
      id: "deliveryBoy",
      lable: "Delivery Boy",
      icon: Bike,
    },
  ]);

  const [selected, setSelected] = useState("")
  const [mobile, setMobile] = useState("")
  const { update } = useSession()
  const router = useRouter()


  const handleEdit = async () => {
    try {
        const res = await axios.post("/api/user/edit-role-mobile", {role: selected, mobile})
        await update({role: selected})
        router.push("/")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-6 w-full bg-linear-to-b from-green-100 to-white items-center">
      <motion.h1
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8"
      >
        Select Your Role
      </motion.h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
        {role.map((role) => {
            const Icon = role.icon
            const isSelected = selected == role.id
            return (
                <motion.div 
                  key={role.id}
                  whileTap={{
                    scale: 0.94
                  }}
                  onClick={() => setSelected(role.id)}
                  className= {`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 gap-2 transition-all ${
                    isSelected ? "border-green-600 bg-green-100 shadow-lg"
                    : "border-gray-300 bg-white hover:border-green-600"
                  }`}>
                  <Icon/>
                  <span className="">{role.lable}</span>
                </motion.div>
            )
        })}
      </div>

      <motion.div
       initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5
        }}
        className="flex flex-col items-center mt-10"
      >
      <label className="text-gray-700 font-medium mb-2" htmlFor="mobile">Enter Your Mobile No.</label>
      <input onChange={(e) => setMobile(e.target.value)} value={mobile} placeholder="eg. 9999999999" className="w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800" type="tel" id="mobile" />
      </motion.div>

      <motion.button
      onClick={handleEdit}
      initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.6,
        }}
        disabled={mobile.length !== 10 || !selected}
        className= {`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 mt-20 w-[200px] 
            ${
                selected && mobile.length == 10 ? 
                "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
        `}
      >
      Go To Home <ArrowRight/>
      </motion.button>
    </div>
  );
};

export default EditRoleMobile;
