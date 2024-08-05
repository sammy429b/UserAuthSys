import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/passwordInput"
import { useAuth } from "@/context/useAuth"
import { ForgotPasswordSchema } from "@/schemas/PasswordSchema"
import { ApiConfig } from "@/utils/ApiConfig"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

type PasswordInputType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
    const {userMailId} = useAuth();
    const Navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm<PasswordInputType>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues:{
            email: userMailId,
        }
    });
    const handleForgotPassword = async(values: PasswordInputType) =>{

       
        try {
            const response = await axios.post(ApiConfig.reset, values);
            if(response.status === 200){
                alert("Password changed successfully")
                Navigate("/");
            }
            // console.log(response.data)

        } catch (error: any) {
            if(axios.isAxiosError(error)){
                const message = error.response?.status === 400
                ? error.response.data.message
                : "Something went wrong";
                alert(message);
            }else{
                console.error("Error:", error);
            }
        }
    }

  return (
    <>
         <div className="w-full h-screen flex justify-center items-center">
                <div className="w-8/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl">Reset Password</h1>
                    <form className=" flex flex-col gap-y-4" action="" onSubmit={handleSubmit(handleForgotPassword)}>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <PasswordInput {...register("newPassword", {required:true})}  id="newPassword" placeholder="********" />
                            {errors.newPassword && <span className="text-red-500 text-xs">{errors.newPassword.message}</span>}
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Re-enter Password</Label>
                            <PasswordInput  {...register("rerenterPassword", {required:true})}  id="rerenterPassword" placeholder="********" />
                            {errors.rerenterPassword && <span className="text-red-500 text-xs">{errors.rerenterPassword.message}</span>}
                        </div>
                        <Button className="mt-2">Change Password</Button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default ForgotPassword