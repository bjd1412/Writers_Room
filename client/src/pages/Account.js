
import React, {useEffect, useState} from "react";  
import { useParams, Link } from "react-router-dom";  
  
function Account () {  
   const {username} = useParams();  
   const [stories, setStories] = useState([])  
  
   useEffect(() => {  
      fetch(`/stories/by-user/${username}`)  
      .then(res => res.json())  
      .then(res => setStories(res))  
   }, [username]);
   
   
  
   return (  
   <div>   
   <h1>{username}'s Stories</h1>   
   <ul>   
    {stories.map(story => (  
      <div>  
        <img src={story.image}/>  
        <li key={story.id}>  
          <Link to={`/stories/${story.id}`}>{story.title}</Link>  
        </li>  
      </div>  
        
    ))}   
   </ul>   
  </div>  
   )  
}  
  
export default Account;