import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/buttonloading";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordInput";
import { useAuth } from "@/context/useAuth";
import { ChangePasswordSchema } from "@/schemas/PasswordSchema";
import { ApiConfig } from "@/utils/ApiConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

const ChangePassword = () => {
    const Navigate = useNavigate();
    console.log("ChangePassword page");
    const { userMailId } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<ChangePasswordType>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            email: userMailId,
        }
    });


    const handleChangePassword = async (values: ChangePasswordType) => {
        
        if (values.oldPassword === values.newPassword) {
            setError("newPassword", { type: 'manual', message: "New password must be different from old password" });
            return;
        }
        
        console.log("Submitted values:", values);
        setLoading(true);
        try {
            const response = await axios.put(ApiConfig.change, values, {
                withCredentials: true,
            });
            console.log("Response:", response);
            if (response.status === 200) {
                alert("Password changed successfully");
                Navigate("/");
            }
        } catch (error: any) {
            console.error("Error:", error);
            if (axios.isAxiosError(error)) {
                const message = error.response?.status === 400
                    ? error.response.data.message
                    : "Something went wrong";
                alert(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-9/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                <h1 className="mb-4 text-center text-2xl">Change Password</h1>
                <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="grid w-full max-w-xl items-center gap-1.5">
                        <Label htmlFor="oldPassword">Old Password</Label>
                        <PasswordInput {...register("oldPassword", { required: "Old password is required" })}  id="oldPassword" placeholder="********" />
                        {errors.oldPassword && <span className="text-red-500 text-xs">{errors.oldPassword.message}</span>}
                    </div>
                    <div className="grid w-full max-w-xl items-center gap-1.5">
                        <Label htmlFor="newPassword">New Password</Label>
                        <PasswordInput {...register("newPassword", { required: "New password is required" })}  id="newPassword" placeholder="********" />
                        {errors.newPassword && <span className="text-red-500 text-xs">{errors.newPassword.message}</span>}
                    </div>
                    {
                        loading ?
                            <ButtonLoading /> :
                            <Button className="mt-2" type="submit">Update</Button>
                    }
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
