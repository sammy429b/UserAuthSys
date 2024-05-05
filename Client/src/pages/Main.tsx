import { DropdownMenuDemo } from "@/components/cutom/profile";
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/useAuth"
import { useNavigate } from "react-router-dom";


const Mian = () => {
  const { isAuthenticated, setAuthenticated, mail } = useAuth();
  console.log("email",mail)
  const Navigate = useNavigate();
  const toggleLogout = () => {
    setAuthenticated(false);
    console.log(isAuthenticated)
    Navigate('/')
  };
  return (
    <>
      <nav className="flex justify-between p-4">
        <div>
          Logo
        </div>
        <div className="flex justify-center gap-2 items-center">
          <DropdownMenuDemo/>
          <Button onClick={toggleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </>
  )
}

export default Mian