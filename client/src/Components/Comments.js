import React, { useState, useEffect } from 'react';  
import CommentList from './CommentList';  
import StoryContext from './StoryContext';  
import { useContext } from 'react';  
  
function Comments({ storyId }) {  
  const { comments } = useContext(StoryContext);  
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
  
  return (  
   <div className="commentSection">  
    {filteredComments.map(comm => (  
      <CommentList  
       key={comm.id}  
       comment={comm.comment}  
       created_at={comm.created_at}  
      />  
    ))}  
   </div>  
  );  
}  
  
export default Comments;