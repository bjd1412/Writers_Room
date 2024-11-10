import React from "react";


function CommentList({comment, created_at}) {

    
    return (
        <div className="comment">
            <p>{comment}</p>
            <small>{new Date(created_at).toLocaleString()}</small>
    
        </div>
    )
}

export default CommentList