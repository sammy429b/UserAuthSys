import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useForm} from 'react-hook-form'

interface userInputType {
    username : string,
    email:string,
    password:string,
    repassword: string
}
console.log("render of register")
const Register = () => {
    const {register, handleSubmit} = useForm<userInputType>();

    const handleRegister = (values: userInputType) =>{
        console.log("submitted")
        console.table(values)
    }
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-10/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl">Create New Account</h1>
                    <form className="form flex flex-col gap-y-4" onSubmit={handleSubmit(handleRegister)}>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input {...register("username")} type="text" id="username" placeholder="abc" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email")} type="email" id="email" placeholder="xyz@gmail.com" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password")} type="password" id="password" placeholder="********" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="repassword">Re-enter Password</Label>
                            <Input {...register("repassword")} type="password" id="repassword" placeholder="********" />
                        </div>
                        <Button className="mt-2">Register</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register