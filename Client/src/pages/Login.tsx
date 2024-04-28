import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function TypographyMuted() {
    return (
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    )
  }

const Login = () => {
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-8/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
                    <form className=" flex flex-col gap-y-4" action="">
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="xyz@gmail.com" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="********" />
                        </div>
                        <Button className="mt-2">Login</Button>
                        <p className="text-sm text-center hover:underline underline-offset-4 duration-200 transition-all">create new account</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login