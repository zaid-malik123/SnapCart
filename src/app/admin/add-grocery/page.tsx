"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { PlusCircle } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import axios from "axios";
import { Loader } from "lucide-react";

const AddGrocery = () => {
  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Rice Atta & Grains",
    "Snacks & Biscuits",
    "Spices & Masalas",
    "Beverages & Drinks",
    "Personal Care",
    "Household & Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care",
  ];

  const units = ["Kg", "g", "liter", "piece", "pack"];
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [ category, setCategory ] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [frontendImage, setFrontendImage] = useState<string | null >()
  const [backendImage, setBackendImage] = useState<File | null >()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files

  if(!files || files.length == 0) return
  const file = files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: FormEvent) => {
   setLoading(true) 
   e.preventDefault() 
  try {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("category", category)
    formData.append("unit", unit)
    formData.append("price", price)
    if(backendImage){
     formData.append("image", backendImage)
    }

    const res = await axios.post("/api/admin/add-grocery", formData)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative">
      <Link
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all"
        href={"/"}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:flex">Back to Home</span>
      </Link>

      <motion.div
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-green-600" />
            <h1>Add Your Grocery</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Fill Out the details below to add a new grocery item.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div>
            <label className="block text-green-700 font-medium mb-1">
              Grocery Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-0 focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="eg: sweets, milk .."
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-0 focus:ring-2 focus:ring-green-400 transition-all bg-white"
                name="category"
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Unit <span className="text-red-600">*</span>
              </label>
              <select
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-0 focus:ring-2 focus:ring-green-400 transition-all bg-white"
                name="Unit"
              >
                <option value="">Select Unit</option>
                {units.map((cat, idx) => (
                  <option value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

           <div>
            <label className="block text-green-700 font-medium mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-0 focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="eg: 999 .."
              type="text"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <label htmlFor="image" className="cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 py-3 hover:bg-green-100 transition-all w-full sm:w-auto">
             <Upload/> Upload Image
            </label>
            <input
              id="image"
              onChange={handleImageChange}
              hidden
              type="file"
              accept="image/*"
            />

            {frontendImage && <Image className="rounded-xl shadow-md border border-gray-200 object-cover" src={frontendImage} width={100} height={100} alt="file image"/> }
          </div>

          <motion.button
           disabled={loading} 
           whileHover={{
            scale: 1.02
           }}
           whileTap={{scale: 0.9}}
           className="mt-4 w-full bg-linear-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2"
           >
            
          {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Add Grocery"}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default AddGrocery;
