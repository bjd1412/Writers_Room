
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
import {useEffect, useState} from 'react';

function App() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    fetch("/stories")
    .then(res => res.json())
    .then(res => setStories(res))
  }, [])


  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
       <Outlet context={[stories, setStories]} />
      </header>
    </div>
  );
}

export default App;
