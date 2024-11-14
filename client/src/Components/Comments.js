
import React, { useState, useEffect } from 'react';  
import CommentList from './CommentList';  
import StoryContext from './StoryContext';  
import { useContext } from 'react';  
  
function Comments({ storyId }) {  
  const { currentUser, comments, setComments, users } = useContext(StoryContext);  
  const [filteredComments, setFilteredComments] = useState([]);  
  
  useEffect(() => {  
   console.log('comments:', comments);  
   console.log('storyId:', storyId);  
   if (comments && comments.length > 0) {  
    const filteredComments = comments.filter(comment => comment.story_id === parseInt(storyId));  
    setFilteredComments(filteredComments);  
   }  
  }, [comments, storyId]);  
  
  if (filteredComments.length === 0) {  
   return <p>No comments available for this story.</p>;  
  }  
  
  const handleDeleteComment = (commentId) => {  
   fetch(`/comments/${commentId}`, {  
    method: "DELETE",  
   })  
    .then(res => {  
      if (res.ok) {  
       const updatedComments = comments.filter(comment => comment.id !== commentId);  
       setComments(updatedComments);  
      } else {  
       throw new Error(res.statusText)  
      }  
    })  
    .catch(error => {  
      console.error('Error:', error);  
    });  
  }  
  
  return (  
   <div className="commentSection">  
    {filteredComments.map(comm => (  
      <CommentList  
       key={comm.id}  
       comment={comm.comment}  
       created_at={comm.created_at}  
       user_id={comm.user_id}
       username={users}  
       user={currentUser}  
       handleDeleteClick={() => handleDeleteComment(comm.id)}  
      />  
    ))}  
   </div>  
  );  
}  
  
export default Comments;