import React, { useState } from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import ProfileCard from './ProfileCard'
import './Home.scss'
import NavBar from './Navbar'

const Home = (props) => {
  const [search, setSearch] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setNewSearch(search)
  }
  return (
    <>
    <NavBar/>
    <input type="text" placeholder='Search by UserName...' onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
    <div className="home-wrapper" style={{width:'85%'}}>
        
        <ProfileCard/>
        <Feed value={newSearch}/>
        <CreatePost/>
    </div>
    </>
  )
}

export default Home