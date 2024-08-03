import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import axios from "axios"
import { ApiConfig } from "@/utils/ApiConfig"
import { useState } from "react"
import { ButtonLoading } from "@/components/ui/buttonloading"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/useAuth"
import { z } from "zod"
import { LoginSchema } from "@/schemas/AuthSchema"
import { zodResolver } from "@hookform/resolvers/zod"

type LoginFormType = z.infer<typeof LoginSchema>

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const Navigate = useNavigate();
    const { handleLoginAuth } = useAuth();
    const { register, handleSubmit, formState:{errors}, setError } = useForm<LoginFormType>({
        resolver: zodResolver(LoginSchema)
    });

    const handleLogin = async (values: LoginFormType) => {
        console.log(values)
        try {
            setLoading(true);
            const response = await axios.post(ApiConfig.login, values, {
                withCredentials: true,
            });
            console.log(response)
            const data = await response.data;
            if (response.status === 200) {
                handleLoginAuth(values.email)
                alert("Login successful")
                Navigate('/main')

            }else 
            console.log(data)
        } catch (error) {
            if(axios.isAxiosError(error)){
                const errorResponse = error.response;
                if(errorResponse?.status === 400 && errorResponse.data.field === "email"){
                    setError("email", {message: errorResponse.data.message})
                }else if(errorResponse?.status === 400 && errorResponse.data.field === "password"){
                    setError("password", {message: errorResponse.data.message})
                }else if(errorResponse?.status === 500){
                    alert("Internal server error")
                }else{
                    alert("An unexpected error occurred. Please try again.")
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-8/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
                    <form className=" flex flex-col gap-y-4" onSubmit={handleSubmit(handleLogin)}>
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
                        <div className="text-right">
                            <Link to="/password/email" className="text-blue-500 hover:underline">Forgot password?</Link>
                        </div>
                        {loading ?
                            <ButtonLoading /> :
                            <Button className="">Login</Button>
                        }
                        <div>
                            <p className="text-center">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login