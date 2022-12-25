import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Feed from "./Feed";
import ProfileCard from "./ProfileCard";
import "./Home.scss";
import NavBar from "./Navbar";
import { toast } from "react-toastify";
import { userAuth, database } from "../../firebase";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

const Home = () => {
  const [search, setSearch] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    var Count = 0;
    const DocRef = collection(database, "ConnectInUsers");
    getDocs(DocRef)
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          if (search === item.data().UserName) {
            Count++;
          }
        });
        if (Count === 0) {
          toast.error("User Not Found/User has not posted any Post");
          setNewSearch("");
        } else {
          setNewSearch(search);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div>
        <NavBar />
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
          <input
            type="text"
            placeholder="Search by UserName..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="home-wrapper">
          <ProfileCard />
          <Feed value={newSearch} />
          <CreatePost />
        </div>
      </div>
    </>
  );
};

export default Home;
