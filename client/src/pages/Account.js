import React, {useEffect, useState} from "react";    
import { useParams, Link } from "react-router-dom";    
import { useContext } from "react";  
import StoryContext from "../Components/StoryContext";  
  
function Account () {    
  const {username} = useParams();    
  const [stories, setStories] = useState([])    
  const { user } = useContext(StoryContext);  
  
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
    {user && user.id === story.user_id && <Link to={`/write/${story.id}`}>Edit</Link>}   
   </li>    
  </div>    
      
  ))}    
  </ul>    
  </div>    
  )    
}    
    
export default Account;