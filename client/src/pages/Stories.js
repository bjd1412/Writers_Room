import {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import Comments from "../Components/Comments"

function Stories (){
    const [story, setStory] = useState({})
    const params = useParams()
    const storyId = params.id

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
            <Comments storyId={storyId}/>
        </div>
    )
}



export default Stories