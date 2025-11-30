import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET
});

export const uploadOnCloudinaryImage = async (file:Blob):Promise<string | null> => {
if(!file) return null;

try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: "auto"
      }, (error, result) => {
         if(error){
            reject(error)
         } else {
            resolve(result?.secure_url ?? null)
         }
      })

      uploadStream.end(buffer)
    })

} catch (error) {
    console.log(error)
    return null
}

}