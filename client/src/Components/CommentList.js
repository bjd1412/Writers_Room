import React from "react";
import { useState, useEffect } from "react";



function CommentList({ comment, created_at, user_id, handleDeleteClick }) {  
  const [user, setUser] = useState(null);  
  
  useEffect(() => {   
    if (user_id !== null) {  
     fetch(`/users/${user_id}`)   
       .then(response => response.json())   
       .then(data => setUser(data));   
    }  
   }, [user_id]);  
  
  return (  
   <div>  
    <p>{comment}</p>  
    <p>Created at: {created_at}</p>  
    {user && <p>By: {user.username}</p>}  
    {user && user.id === user_id ? (  
      <button onClick={handleDeleteClick}>Delete</button>  
    ) : null}  
   </div>  
  );  
}
export default CommentList