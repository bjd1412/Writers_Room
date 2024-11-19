import React from "react";
import {useState} from "react"
import StoryList from "../Components/StoryList";
import StoryContext from "../Components/StoryContext";
import { useContext } from "react";

function Explore () {
    const {stories, setStories} = useContext(StoryContext)
    const [search, setSearch] = useState("")



function searchChange (e) {
    setSearch(e.target.value)
}

const allStories = stories.filter(story => {
    if(search === ""){
        return true
    } else if(story.title.toLowerCase().includes(search.toLowerCase())){
        return true
    }else{ return false }
})

    return (
        <div className="Main">
            <h2>Explore New Voices </h2>
            <input className="List" name="search" value={search} onChange={searchChange}></input>
            <StoryList allStories={allStories}/>

        </div>
    )
}

export default Explore

