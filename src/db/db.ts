import mongoose from "mongoose";

const mongodbUrl = process.env.DB_URI

if(!mongodbUrl){
    throw new Error("Data base url is not found")
}

var cached  = global.mongoose

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

export const connectDb = async () => {
  if(cached.conn){
    return cached.conn
  }

  if(!cached.promise){
    cached.promise = mongoose.connect(mongodbUrl).then((conn) => conn.connection)
  }

  try {
    const conn = await cached.promise
    return conn
  } catch (error) {
    
  }
}