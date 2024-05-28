import {useAuth} from "@/context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const OTPRoute = () => {
    const {isOTP} = useAuth();
  return (
    <>
        {isOTP ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default OTPRoute