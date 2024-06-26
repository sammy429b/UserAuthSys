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

interface userInputType {
    email: string,
    password: string
}

const Login = () => {
    const { handleLoginAuth } = useAuth();
    const Navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<userInputType>();
    const handleLogin = async (values: userInputType) => {
        console.log(values)
        try {
            setLoading(true);
            const response = await axios.post(ApiConfig.login, values,{
                withCredentials: true
            });
            console.log(response)
            const data = await response.data;
            if (response.status === 201) {
                handleLoginAuth(values.email)
                Navigate('/main')
            }
            console.log(data)
        } catch (error) {
            console.log(error)
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
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password", { required: true })} type="password" id="password" placeholder="********" />
                        </div>
                        <div className="text-right">
                            <Link to="/password/email" className="text-sm text-center hover:underline underline-offset-4 duration-200 transition-all">forgot password</Link>
                        </div>
                        {loading ?
                            <ButtonLoading /> :
                            <Button className="">Login</Button>
                        }
                        <Link to="/register" className="text-sm text-center hover:underline underline-offset-4 duration-200 transition-all">create new account</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login