import React from "react";
import NavBar from "../Components/NavBar";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError()
    return ( 
        <div>
        <NavBar/> 
        <div className="error-page">  
         <h1>Oops, something went wrong!</h1>  
         <p>Error Code: {error.status}</p>  
         <p>Error Message: {error.statusText}</p>  
         <p>It looks like an error occurred while trying to load the page. Please try refreshing the page or coming back later.</p>  
         <button onClick={() => window.location.reload()}>Refresh Page</button>  
         <button onClick={() => window.history.back()}>Go Back</button>     
        </div>
        </div>  
       );  
}


export default ErrorPage