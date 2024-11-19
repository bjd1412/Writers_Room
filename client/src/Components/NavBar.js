import { NavLink } from "react-router-dom";  
import "../Components/NavBar.css";  
import { useContext } from "react";  
import StoryContext from "../Components/StoryContext";  
  
function NavBar(){  
  const { user, handleLogout } = useContext(StoryContext);  
  
  return(  
   <nav className="navbar">  
    <NavLink to="/">Home</NavLink>  
    <NavLink to="/explore">Explore</NavLink>  
    <NavLink to="/write">Write</NavLink>  
    {user ? (  
      <>  
       <NavLink to={`/account/${user.username}`}>Account</NavLink>  
       <button onClick={handleLogout}>Logout</button>  
      </>  
    ) : (  
      <NavLink className="Login_button" to="/login">Login</NavLink>  
    )}  
   </nav>  
  )  
}  
  
export default NavBar;