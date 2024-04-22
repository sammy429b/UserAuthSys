import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        required:true,
        unique: true,
        type: String,
    },
    email:{
        required:true,
        unique: true,
        type: String,
    },
    password:{
        required:true,
        unique: true,
        type: String,
    }
})

const User = model("User",userSchema)

export default User;