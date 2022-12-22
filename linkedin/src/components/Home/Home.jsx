import React from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import ProfileCard from './ProfileCard'
import './Home.scss'

const Home = () => {
  return (
    <>
    <div className="home-wrapper">
        <ProfileCard/>
        <Feed/>
        <CreatePost/>
    </div>
    </>
  )
}

export default Home