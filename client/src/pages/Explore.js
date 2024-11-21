import React, { useState, useEffect } from "react";  
import StoryList from "../Components/StoryList";  
  
function Explore () {  
   const [stories, setStories] = useState([]);  
   const [search, setSearch] = useState("")  
  
   useEffect(() => {   
      fetch("/stories")   
       .then(res => res.json())   
       .then(res => setStories(res));   
    }, []);   
    
  
  
function searchChange (e) {  
   setSearch(e.target.value)  
}  
  
const allStories = stories && stories.filter(story => {  
   if(search === ""){  
      return true  
   } else if(story.title.toLowerCase().includes(search.toLowerCase())){  
      return true  
   }else{ return false }  
})  
  
   return (  
      <div className="Main">  
        <h2>Explore New Voices </h2>  
        <input className="List" name="search" placeholder="Search" value={search} onChange={searchChange}></input>  
        {allStories && <StoryList allStories={allStories}/>}  
  
      </div>  
   )  
}  
  
export default Explore