import React from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import ProfileCard from './ProfileCard'
import './Home.scss'
import NavBar from './Navbar'

const Home = (props) => {
  return (
    <>
    <NavBar/>
    <div className="home-wrapper" style={{width:'85%'}}>
        <ProfileCard/>
        <Feed/>
        <CreatePost/>
    </div>
    </>
  )
}

export default Home