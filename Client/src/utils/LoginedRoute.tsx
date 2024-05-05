import {useAuth} from "@/context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const LogginedRoute = () => {
    const {isAuthenticated} = useAuth();
  return (
    <>
        {!isAuthenticated ? <Outlet /> : <Navigate to="/main" />}
    </>
  )
}

export default LogginedRoute