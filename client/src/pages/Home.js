import React from "react"
import search from "../images/search.png"
import write from "../images/write.png"
import chat from "../images/chat.png"

function Home () {

    
    return (  
        <div className="home-container">  
         <h1 className="home-header">Welcome to the Writer's Room</h1>  
         <div className="home-content">  
           <h3>Your Space to Write, Share, and Inspire</h3> 
           <p>Join a vibrant community of storytellers and poets<br/> where creativity knows no bounds.<br/> Discover original works, connect with fellow writers, <br/> and share your unique voice with the world. <br/>Dive into a world of imagination — explore countless stories<br/> and poems crafted by passionate writers.</p>
           <div className="container">  
            <div className="item">  
            <img src={search} alt="Image search" />  
            <h5>Explore Original Works</h5>  
            </div>  
            <div className="item">  
            <img src={write} alt="Image 2" />  
            <h5>Create Your Own Content</h5>  
            </div>  
            <div className="item">  
            <img src={chat} alt="Image 3" />  
            <h5>Share your thoughts</h5>  
            </div>  
            </div>
         </div>  
        </div>  
      )

    }

export default Home