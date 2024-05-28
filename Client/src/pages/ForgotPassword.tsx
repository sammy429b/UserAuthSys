import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"

interface PasswordInputType{
    newPassword : string,
    rerenterPassword: string
}

const ForgotPassword = () => {

    const {register, handleSubmit} = useForm<PasswordInputType>();

    const handleForgotPassword = async(values: PasswordInputType) =>{

    }

  return (
    <>
         <div className="w-full h-screen flex justify-center items-center">
                <div className="w-8/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl">Reset Password</h1>
                    <form className=" flex flex-col gap-y-4" action="" onSubmit={handleSubmit(handleForgotPassword)}>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <Input {...register("newPassword", {required:true})} type="password" id="newPassword" placeholder="********" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Re-enter Password</Label>
                            <Input  {...register("rerenterPassword", {required:true})} type="password" id="rerenterPassword" placeholder="********" />
                        </div>
                        <Button className="mt-2">Change Password</Button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default ForgotPassword