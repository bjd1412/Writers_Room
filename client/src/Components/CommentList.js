import React from "react";
import { useState, useEffect } from "react";



function CommentList({ comment, created_at, user_id, currentUser, handleDeleteClick }) {  
  const [user, setUser] = useState(null);  
  
  useEffect(() => {  
   if (user_id !== null) {  
    fetch(`/users/${user_id}`)  
      .then(response => response.json())  
      .then(data => setUser(data));  
   }  
  }, [user_id]);  
  
  return (  
   <div className="comment-container">  
   <div className="comment-header">    
    <span className="comment-username">{user && user.username}</span>
    <span className="comment-created-at">{created_at}</span>
    </div>
    <div className="comment-body">
    <p>{comment}</p>
    </div>  
    {currentUser && currentUser.id === user_id ? (  
      <button className="comment-delete-button" onClick={handleDeleteClick}>Delete</button>  
    ) : null}  
   </div>  
  );  
}
export default CommentList