import { model, Schema } from "mongoose";

interface UserSchemaType{
    username:string,
    email:string,
    password:string
}

const userSchema = new Schema<UserSchemaType>({
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