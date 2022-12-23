import React, { useEffect, useState } from 'react'
import { userAuth, database } from '../firebase';
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("")
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      }
      else {
        setUser("");
      }
    })
  })
  const [allPosts, setAllPosts] = useState([]);
  const data = collection(database, 'UsersPost');
  getDocs(data).then((snapshot) => {
    let res = [];
    snapshot.docs.forEach((item) => {
      res.push({ ...item.data(), id: item.id });
    })
    setAllPosts(res);
  });

  return (
    <div>
      <h1>Welcome, {user}</h1><br />
      {/* { 
        allPosts.map(object => (
          <p>{object.Content}</p>
        ))
      } */}
    </div>
  )
}

export default Feed
