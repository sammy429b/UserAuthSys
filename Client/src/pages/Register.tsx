import { useState } from "react"
import { z } from "zod"
import axios from "axios"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/buttonloading"
import { Input } from "@/components/ui/input"
import { ApiConfig } from "@/utils/ApiConfig"
import { Label } from "@/components/ui/label"
import { RegisterSchema } from "@/schemas/AuthSchema"
import { Link, useNavigate } from "react-router-dom"

type RegisterFormTypes = z.infer<typeof RegisterSchema>
const Register = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterFormTypes>({
        resolver: zodResolver(RegisterSchema)
    });

    const handleRegister = async (values: RegisterFormTypes) => {
        if (values.password !== values.repassword) {
            setError('repassword', { type: 'manual', message: 'Passwords do not match' });
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(ApiConfig.register, values);
            if (response.status === 201) {
                alert("Registered successfully");
                console.log(response.data);
                navigate("/");
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const errorResponse = error.response;
                if (errorResponse?.status === 409 && errorResponse.data.field === "email") {
                    setError("email", { message: errorResponse.data.message });
                } else if (errorResponse?.status === 409 && errorResponse.data.field === "username") {
                    setError("username", { message: errorResponse.data.message });
                }else if (errorResponse?.status === 500) {
                    alert("Internal server error");
                } else if (errorResponse?.status === 400) {
                    if (errorResponse.data.errors) {
                        for (const [field, message] of Object.entries(errorResponse.data.errors)) {
                            setError(field as keyof RegisterFormTypes, { message: message as string });
                        }
                    } else {
                        setError("email", { message: "Email is required" });
                        setError("password", { message: "Password is required" });
                    }
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            } else {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>


            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-10/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl">Create New Account</h1>
                    <form className="form flex flex-col gap-y-4" onSubmit={handleSubmit(handleRegister)}>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input {...register("username", { required: true })} type="text" id="username" placeholder="abc" />
                            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email", { required: true })} type="email" id="email" placeholder="xyz@gmail.com" />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password", { required: true })} type="password" id="password" placeholder="********" />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="repassword">Re-enter Password</Label>
                            <Input {...register("repassword", { required: true })} type="password" id="repassword" placeholder="********" />
                            {errors.repassword && <p className="text-red-500 text-xs">{errors.repassword.message}</p>}
                        </div>
                        {
                            loading ?
                                <ButtonLoading /> :
                                <Button className="mt-2">Register</Button>
                        }

                        <div>
                            <p className="mt-4 text-center">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;