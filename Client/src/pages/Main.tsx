import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/useAuth"
import { useNavigate } from "react-router-dom";


const Mian = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
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
        <div>
          <Button onClick={toggleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </>
  )
}

export default Mian