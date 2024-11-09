import {useContext, useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import Comments from "../Components/Comments"
import AddComment from "../Components/AddComment"
import StoryContext from "../Components/StoryContext"

function Stories (){
    const [story, setStory] = useState({})
    const params = useParams()
    const storyId = params.id
    const {comments} = useContext(StoryContext)

    useEffect(() => {
        fetch(`/stories/${storyId}`)
        .then(res => res.json())
        .then(res => setStory(res))

    }, [storyId])

    return (
        <div className="MainStory">
            <img src={story.image}/>
            <h2>{story.title}</h2>
            <p>{story.story}</p>
            <AddComment storyId={storyId}/>
            <Comments storyId={storyId} comment={comments}/>
            
        </div>
    )
}



export default Stories