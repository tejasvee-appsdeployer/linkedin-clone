import React, { useEffect, useState } from "react";
import { userAuth, database } from "../../firebase";
import "./Feed.scss";
import { Container } from "react-bootstrap";
import UserImage from "../../Images/User.png";
import { collection, getDocs } from "firebase/firestore";

const Feed = () => {
  const [user, setUser] = useState("");
  const [userImage, setUserImage] = useState(null);
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
        setUserImage(UserImage);
      } else {
        setUser("");
      }
    });
  });

  const [allPosts, setAllPosts] = useState([]);
  const data = collection(database, "UsersPost");
  getDocs(data).then((snapshot) => {
    let res = [];
    snapshot.docs.forEach((item) => {
      res.push({ ...item.data(), id: item.id });
    });
    setAllPosts(res);
  });

  return (
    <>
      {allPosts.map((object) => (
          <div className="feed-wrap">
            <Container className="profile-wrap">
              <Container className="d-flex">
                <img src={UserImage} className="btn-floating" alt="profile" />
                <div className="user-info">{object.Username}</div>
              </Container>
              <button class="btn btn-primary" id="follow-btn">
                Follow
              </button>
            </Container>
            <Container className="post-description my-2">
              {object.Content}
            </Container>
            <Container className="post-wrapper">
              <img className="post-img" src={object.ImageUrl} alt="" />
              <Container className="count-wrapper mt-1">
                <div>0 likes</div>
                <div>0 comments</div>
              </Container>
              <hr />
            </Container>
            <Container className="btn-wrapper">
              <button className="btn btn-success">
                <i class="fa-solid fa-thumbs-up"></i> Like
              </button>
              <button className="btn btn-success">
                <i class="fa-solid fa-comment"></i> Comment
              </button>
              <button className="btn btn-success">
                <i class="fa-sharp fa-solid fa-share"></i> Share
              </button>
            </Container>
          </div>
		  
      ))
	  }
	  <br />
    </>
  );
};

export default Feed;
