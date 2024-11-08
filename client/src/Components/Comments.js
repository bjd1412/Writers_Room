
import React, { useState, useEffect } from 'react';  
import CommentList from './CommentList';  
import StoryContext from './StoryContext';  
import { useContext } from 'react';  
  
function Comments({ storyId }) {  
    const { comments } = useContext(StoryContext);  
    const [loading, setLoading] = useState(true);  
    const [filteredComments, setFilteredComments] = useState([]);  
    
    useEffect(() => {  
     if (comments && comments.length > 0) {  
      setLoading(false);  
     }  
    }, [comments]);  
    
    useEffect(() => {  
     fetch(`/comments/by-story/${storyId}`)  
      .then(response => response.json())  
      .then(data => {  
        console.log('data:', data);  
        setFilteredComments(data);  
      });  
    }, [storyId]);  
    
    if (loading) {  
     return <div>Loading comments...</div>;  
    }  
    
    return (  
     <div className="commentSection">  
      {filteredComments && filteredComments.length > 0 ? (  
        filteredComments.map(comm => (  
         <CommentList  
          key={comm.id}  
          comment={comm.comment}  
          created_at={comm.created_at}  
         />  
        ))  
      ) : (  
        <p>No comments available for this story.</p>  
      )}  
     </div>  
    );  
  }
  
export default Comments;