import { connectDb } from "@/db/db"
import CategorySlider from "./CategorySlider"
import Hero from "./Hero"
import Grocery from "@/models/grocery.model"
import GroceryItemCard from "./GroceryItemCard"
import { number } from "motion"

const UserDashBoard = async () => {
  await connectDb()


  const groceries = await Grocery.find({}).lean()

  const plainGrocery = JSON.parse(JSON.stringify(groceries))
  return (
    <>
         <Hero/>
         <CategorySlider/>

         <div className="w-[90%] md:w-[80%] mx-auto mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">Popular Grocery Items</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {plainGrocery.map((item:any, idx:number) => (
           <GroceryItemCard key={idx} item={item}/>
            ))}
          </div>

         </div>

         
    </>
  )
}

export default UserDashBoard