
import './App.css';  
import { Outlet, useNavigate } from 'react-router-dom';  
import NavBar from './Components/NavBar';  
import {useEffect, useState} from 'react';  
import StoryContext from './Components/StoryContext';  
  
function App() {  
  const [stories, setStories] = useState([])  
  const [comments, setComments] = useState([])  
  const [username, setUsername] = useState([])  
  const [user, setUser] = useState(null)  
  const [currentUser, setCurrentUser] = useState(null)  
  const [users, setUsers] = useState({})
  const navigate = useNavigate()  
  
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
  
  useEffect(() => {  
    fetch("/check_session")  
     .then(res => res.json())  
     .then(res => {  
      console.log('User session:', res)  
      if (res) {  
        setUser(res);  
        setCurrentUser(res);   
      } else {  
        setUser(null);  
        setCurrentUser(null);   
      }  
     })  
  }, []); 
  
  useEffect(() => {  
   if (comments.length > 0) {  
    const userIds = comments.map(comment => comment.user_id);  
    const uniqueUserIds = [...new Set(userIds)];  
    const userPromises = uniqueUserIds.map(userId => fetch(`/users/${userId}`));  
    Promise.all(userPromises).then(responses => {  
      const usersData = responses.map(response => response.json());  
      const users = {};  
      usersData.forEach(userData => {  
       users[userData.id] = userData;  
      });  
      setUsers(users);  
    });  
   }  
  }, [comments])  
  
  function handleSubmit(newWrite){  
   setStories([...stories, newWrite])  
  }  
  
  function handleSubmitComments(newComment){  
   setComments([...comments, newComment])  
  }  
  function handleSubmitUser(newUser){  
   setUsername([...username, newUser])  
  }  
  
  function handleLogout(){  
   setUser(null)
   setCurrentUser(null)
   navigate('/')  
  }  
  
  function handleLogin(newUser) {
    setUser(newUser)  
   setCurrentUser(newUser)  
  }  
   
  return (
    <StoryContext.Provider value={{stories, setStories, comments, setComments, username, setUsername, user, setUser, currentUser, setCurrentUser, users, setUsers, handleSubmit, handleSubmitUser, handleSubmitComments, handleLogout, handleLogin}}>    
   <div className="App">  
    <NavBar/>  
    <header className="App-header">    
      <Outlet/>      
    </header>  
   </div>
   </StoryContext.Provider>   
  );  
}  
  
export default App;