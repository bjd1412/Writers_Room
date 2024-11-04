import { NavLink } from "react-router-dom";
import "../Components/NavBar.css";

function NavBar(){
    return(
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/write">Write</NavLink>
        </nav>
    )
}

export default NavBar
