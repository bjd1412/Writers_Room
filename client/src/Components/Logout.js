import React from "react";
import StoryContext from "../Components/StoryContext"
import { useContext } from "react";


function Logout() {  
  const { handleLogout } = useContext(StoryContext);  
  
  const handleLogoutClick = () => {  
   fetch('/logout', {  
    method: 'DELETE',  
   })  
    .then((res) => {  
      if (res.ok) {  
       handleLogout();  
      } else {  
       throw new Error(res.statusText);  
      }  
    })  
    .catch((error) => {  
      console.error('Error:', error);  
    });  
  };  
  
  return (  
   <button onClick={handleLogoutClick}>Logout</button>  
  );  
}  
  
export default Logout;