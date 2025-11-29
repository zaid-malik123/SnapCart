import { auth } from '@/auth'
import EditRoleMobile from '@/components/EditRoleMobile'
import { connectDb } from '@/db/db'
import User from '@/models/user.model'
import { redirect } from 'next/navigation'


const page = async () => {

  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id) 
  if(!user){
    redirect("/login")
  } 
  const userDetails = !user.mobile || !user.role || (!user.mobile && user.role == "user") 
  if(userDetails){
    return <EditRoleMobile/>
  }
  return (
    <div>page</div>
  )
}

export default page