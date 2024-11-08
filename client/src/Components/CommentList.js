import React from "react";


function CommentList({comment, created_at}) {

    return (
        <div>
            <ul>{comment}</ul>
            <small>{new Date(created_at).toLocaleString()}</small>
    
        </div>
    )
}

export default CommentList