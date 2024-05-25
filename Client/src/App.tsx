import Register from "./pages/Register"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
import ChangePassword from "./pages/ChangePassword"
import Main from "./pages/Main"
import PrivateRoute from "./utils/PrivateRoute"
import OTP from "./pages/OTP"
import LogginedRoute from "./utils/LoginedRoute"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
            <Route path="/password/reset" element={<ForgotPassword />}></Route>
            <Route path="/password/otp" element={<OTP />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<Main/>}></Route>
            <Route path="/password/change" element={<ChangePassword />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App