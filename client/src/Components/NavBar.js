import { NavLink } from "react-router-dom";  
import "../Components/NavBar.css";  
import { useContext } from "react";  
import StoryContext from "../Components/StoryContext";
import "../Components/NavBar.css"
import Writerrrr from "./images/Writerrrr.png"

  
function NavBar(){  
  const { user, handleLogout } = useContext(StoryContext);  
  
  return(   
    <nav className="NavBar">   
     <NavLink to="/">Home</NavLink>   
     <NavLink to="/explore">Explore</NavLink>   
     <NavLink to="/write">Write</NavLink>
     <div>
        <img src={Writerrrr} alt="Logo" className="NavBarLogo"/>
        </div>   
     <div className="account-login-container">   
      {user ? (   
        <>   
        <NavLink to={`/account/${user.username}`}>Account</NavLink>   
        <button className="logout-button" onClick={handleLogout}>Logout</button>   
        </>   
      ) : (   
        <NavLink className="login-button" to="/login">Login</NavLink>   
      )}   
     </div>   
    </nav>   
    )   
  } 
  
export default NavBar;