import mongoose from "mongoose";

interface userI{
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    mobile?: string,
    role: "user" | "deliveryBoy" | "admin",
    createdAt?: Date,
    updatedAt?: Date,
    image?: string
}

const userSchema = new mongoose.Schema<userI>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "deliveryBoy", "admin"],
        default: "user"
    },
    image: {
        type: String
    }

},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User