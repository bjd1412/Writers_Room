import React from "react";
import StoryInfo from "../Components/StoryInfo"

function StoryList({allStories}) {

    return(
        <div>
            <div className="StoryList">
                {allStories.map(story => (<StoryInfo key={story.id} id={story.id} image={story.image} title={story.title} created_at={story.created_at}/>))}
            </div>
        </div>
    )

}



export default StoryList