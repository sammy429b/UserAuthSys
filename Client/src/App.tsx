import Register from "./pages/Register"
import Login from "./pages/Login"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
function App() {
  return (
   <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/password/reset" element={<ForgotPassword/>}></Route>
     </Routes>
     </BrowserRouter>
   </>
  )
}

export default App