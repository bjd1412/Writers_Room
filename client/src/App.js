
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
import {useEffect, useState} from 'react';
import StoryContext from './Components/StoryContext';

function App() {
  const [stories, setStories] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch("/stories")
    .then(res => res.json())
    .then(res => setStories(res))
  }, [])

  useEffect(() => {
    fetch("/comments")
    .then(res => res.json())
    .then(res => setComments(res))
  }, [])

  function handleSubmit(newWrite){
    setStories([...stories, newWrite])

  function handleSubmitComments(newComment){
    setComments([...comments, newComment])
  }

  }
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
      <StoryContext.Provider value={{stories, setStories, comments, setComments, handleSubmit, handleSubmitComments}}>
        <Outlet/>
      </StoryContext.Provider>    
      </header>
    </div>
  );
}

export default App;
