import React, {useEffect, useState} from "react";    
import { useParams, Link } from "react-router-dom";    
import { useContext } from "react";  
import StoryContext from "../Components/StoryContext";  


function Account () {    
  const {username} = useParams();    
  const [stories, setStories] = useState([])    
  const { user, setStories: updateStories } = useContext(StoryContext);
  
  const handleDelete = (storyId) => {  
    fetch(`/stories/${storyId}`, {  
     method: 'DELETE',  
    })  
     .then(res => res.json())  
     .then(data => {  
      if (data.error) {  
        console.error(data.error);  
      } else {  
        const newStories = stories.filter(story => story.id !== storyId);  
        setStories(newStories);  
      }  
     })  
     .catch(error => {  
      console.error(error);  
     });  
  };
   
  useEffect(() => {    
  fetch(`/stories/by-user/${username}`)    
  .then(res => res.json())    
  .then(res => setStories(res))    
  }, [username]);    
    
    

  return (  
  <div>  
  <h1>{username}'s Stories</h1>    
  <div className="AccountPage">      
  <>    
  {stories.map(story => (    
  <div className="AccountCard">    
  <img src={story.image} className="AccountImage"/>    
  <div key={story.id} className="AccountCardContent">    
   <Link to={`/stories/${story.id}`}>{story.title}</Link>    
   {user && user.id === story.user_id && (  
    <div>  
      <button className="EditButton" onClick={() => window.location.href = `/write/${story.id}`}>Edit</button>  
      <button className="DeleteButton" onClick={() => handleDelete(story.id)}>Delete</button>  
    </div>  
   )}    
  </div>    
  </div>      
  ))}    
  </>    
  </div>  
  </div>    
  )    
}
    
export default Account;