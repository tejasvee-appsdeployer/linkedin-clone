import React, { useEffect, useState } from "react";
import { userAuth, database } from "../../firebase";
import "./Feed.scss";
import { Container } from "react-bootstrap";
import UserImage from "../../Images/profile.jpg";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const Feed = (props) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(UserImage);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        const DocRef = doc(database, 'ConnectInUsers', userId);
        getDoc(DocRef).then((object) => {
          setUserName(object.data().UserName);
          setUserImage(object.data().UserImage);
        }).catch((err) => {
          console.log(err.message);
        })
      }
    });
  }, []);

  const [allPosts, setAllPosts] = useState([]);
  const data = collection(database, "ConnectInPosts");

    // getDocs(data).then((snapshot) => {
    //   let res = [];
    //   snapshot.docs.forEach((item) => {
    //     if(props.value !== ""){
    //       if(props.value === item.data().Username){
    //         res.push({ ...item.data(), id: item.id });
    //       }
    //     }
    //     else{
    //       res.push({ ...item.data(), id: item.id });
    //     }
    //   });
    //   setAllPosts(res);
    // });

  return (
    <div style={{display:'flex',flexDirection:'column',width:'45%',}}>
    
      {/* {allPosts.map((object) => (
          <div className="feed-wrap">
            <Container className="profile-wrap">
              <Container className="d-flex">
                <img src={userImage} className="btn-floating" alt="profile" />
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
	  <br /> */}


<div className="feed-wrap">
            <Container className="profile-wrap">
              <Container className="d-flex">
                <img src={UserImage} className="btn-floating" alt="profile" />
                <div className="user-info">Kartik Kulshreshtha</div>
              </Container>
              <button class="btn btn-primary" id="follow-btn">
                Follow
              </button>
            </Container>
            <Container className="post-description my-2">
              Description
            </Container>
            <Container className="post-wrapper">
              <img className="post-img" src={UserImage} alt="" />
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

          <div className="feed-wrap">
            <Container className="profile-wrap">
              <Container className="d-flex">
                <img src={UserImage} className="btn-floating" alt="profile" />
                <div className="user-info">Kartik Kulshreshtha</div>
              </Container>
              <button class="btn btn-primary" id="follow-btn">
                Follow
              </button>
            </Container>
            <Container className="post-description my-2">
              Description
            </Container>
            <Container className="post-wrapper">
              <img className="post-img" src={UserImage} alt="" />
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

    </div>
  );
};

export default Feed;
