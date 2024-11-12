
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
import {useEffect, useState} from 'react';
import StoryContext from './Components/StoryContext';

function App() {
  const [stories, setStories] = useState([])
  const [comments, setComments] = useState([])
  const [username, setUsername] = useState([])
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    fetch("/users")
    .then(res => res.json())
    .then(res => setUsername(res))
  }, [])

  function handleSubmit(newWrite){
    setStories([...stories, newWrite])
  }

  function handleSubmitComments(newComment){
    setComments([...comments, newComment])
  }
  function handleSubmitUser(newUser){
    setUsername([...username, newUser])
  }

  const handleLogout = () => {
    setUser(null)
  }
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
      <StoryContext.Provider value={{stories, setStories, comments, setComments, username, setUsername, user, setUser, handleSubmit, handleSubmitUser, handleSubmitComments, handleLogout}}>
        <Outlet/>
      </StoryContext.Provider>    
      </header>
    </div>
  );
}

export default App;
