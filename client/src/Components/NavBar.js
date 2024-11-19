import { NavLink } from "react-router-dom";
import "../Components/NavBar.css";
import { useContext } from "react";
import StoryContext from "../Components/StoryContext"

function NavBar(){
    return(
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/write">Write</NavLink>
            <NavLink className="Login_button" to="/login">Login</NavLink>
        </nav>
    )
}

export default NavBar
