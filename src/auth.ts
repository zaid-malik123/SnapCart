import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { connectDb } from "./db/db"
import User from "./models/user.model"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: {label : "Email", type: "email"},
            password: {label: "Password", type: "password"}
        },
       async authorize(credentials, request){
         try {
             await connectDb()
             const email = credentials.email
             const password = credentials.password as string

             const user = await User.findOne({email})

             if(!user){
                throw new Error("User does not exist")
             }

             const compare = await bcrypt.compare(password, user.password)
             if(!compare){
                throw new Error("Password does not match")
             }

             return {
                id: user._id .toString(),
                email: user.email,
                name: user.name,
                role: user.role
             }
         } catch (error) {
             return null

         }
       }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
   
    async signIn({user, account}){
      if(account?.provider == "google"){
        await connectDb()

        var existUser = await User.findOne({email: user.email})

        if(!existUser){
          existUser = await User.create({
             name: user.name,
             email: user.email,
             image: user.image
          })
        }

        user.id = existUser._id.toString()
        user.role = existUser.role
      }
      return true
    },

    jwt({token, user}){
       if(user){
         token.id = user.id,
         token.name = user.name,
         token.email = user.email,
         token.role = user.role
       }
       return token
    },

    session({session, token}){
        if(session.user){
            session.user.id = token.id as string,
            session.user.name = token.name as string,
            session.user.email = token.email as string,
            session.user.role = token.role as string
        }
        return session
    }
  } ,

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60 * 1000
  },

  secret: process.env.AUTH_SECRET
})