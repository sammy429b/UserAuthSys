import { DropdownMenuDemo } from "@/components/custom/profile";
// import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/useAuth"
import { ApiConfig } from "@/utils/ApiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Mian = () => {
  const { handleLogoutAuth, userMailId } = useAuth();
  console.log("email",userMailId)
  const Navigate = useNavigate();
  const toggleLogout = async() => {
    try {
      const response = await axios.get(ApiConfig.logout,{
        withCredentials: true
    });
      console.log(response);
      if(response){

        handleLogoutAuth()
      Navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <nav className="flex justify-between p-4">
        <div>
          Logo
        </div>
        <div className="flex justify-center gap-2 items-center p-2">
          <DropdownMenuDemo toggleLogout={toggleLogout}/>
          {/* <Button onClick={toggleLogout}>
            Logout
          </Button> */}
        </div>
      </nav>
    </>
  )
}

export default Mian