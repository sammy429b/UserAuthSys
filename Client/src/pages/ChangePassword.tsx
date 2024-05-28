import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/useAuth"
import { ApiConfig } from "@/utils/ApiConfig"
import axios from "axios"
import { useForm } from "react-hook-form"

interface PasswordInputType {
    email: string,
    oldPassword: string,
    newPassword: string,
    reenterpassword: string
}


const ChangePassword = () => {
    const { userMailId } = useAuth();
    const { register, handleSubmit } = useForm<PasswordInputType>();
    const handleChangePassword = async (values: PasswordInputType) => {
        // console.log(values)
        if (values.oldPassword === values.newPassword){
            // console.log(values.oldPassword, " ", values.newPassword)
            alert("Old and new password will not be same");
            return;
        }
        if (values.newPassword !== values.reenterpassword){
            alert("new password and re-enter password should be equal")
            return;
        }

        const value = { email: userMailId, ...values }
        console.log(value);

        try {
            const response = await axios.put(ApiConfig.change, values)
            console.log(response.data)

        } catch (error:any) {
            console.log("error", error.response.data)
        }

    }
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-9/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl">Change Password</h1>
                    <form className=" flex flex-col gap-y-4" onSubmit={handleSubmit(handleChangePassword)}>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="oldPassword">Old Password</Label>
                            <Input {...register("oldPassword", { required: true })} type="password" id="oldPassword" placeholder="********" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input {...register("newPassword", { required: true })} type="password" id="newPassword" placeholder="********" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="reenterpassword">Re-enter Password</Label>
                            <Input {...register("reenterpassword", { required: true })} type="password" id="reenterpassword" placeholder="********" />
                        </div>
                        <Button className="mt-2" onClick={handleChangePassword}>Reset</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword