import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebase";
import "./Feed.scss";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import SearchContext from "../../context/SearchContext";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [postLike, setPostLike] = useState(0);
  const { searches } = useContext(SearchContext);

  useEffect(() => {
    const data = collection(database, "ConnectInPosts");
    getDocs(data).then((snapshot) => {
      let res = [];
      snapshot.docs.forEach((item) => {
        if (searches !== "") {
          if (searches === item.data().Username) {
            // setPostLike(item.data().Like);
            res.push({ ...item.data(), id: item.id });
          }
        } else {
          // setPostLike(item.data().Like);
          res.push({ ...item.data(), id: item.id });
        }
      });
      setAllPosts(res);
    });
  }, [postLike]);

  return (
    <div className="feed-container">
      {allPosts.map((object, index) => (
        <div key={index} className="feed-wrap">
          <Container className="profile-wrap">
            <Container className="d-flex">
              <img
                src={object.UserImage}
                className="btn-floating"
                alt="profile"
              />
              <div className="user-info">
                <Link
                  className="Link text-capitalize"
                  to={`/profile/:${object.UserId}`}
                  state={object}
                >
                  {object.Username}
                </Link>
                <div className="text-capitalize">
                  {object.Heading ? object.Heading : "unknown"}
                </div>
              </div>
            </Container>
          </Container>
          <Container className="post-description my-2">
            {object.Content}
          </Container>
          <Container className="post-wrapper">
            <img className="post-img" src={object.ImageUrl} alt="" />
            <Container className="count-wrapper mt-1">
				<div>{object.Like} Likes</div>
			</Container>
            <hr />
          </Container>
          <Container className="btn-wrapper">
            <button
              className="btn btn-success"
              id="Like"
              onClick={() => {
                setPostLike(object.Like + 1);
                // document.getElementById('Like').classList.add('btn btn-primary');
                document.getElementById("Like").classList.add("disabled");
                const DocRef = doc(database, "ConnectInPosts", object.id);
                updateDoc(DocRef, {
                  Like: object.Like + 1,
                }).then(() => {
                  console.log("Chal rha hai");
                });
              }}
            >
              <i className="fa-solid fa-thumbs-up"></i> Like
            </button>
            {/* <button className="btn btn-success">
							<i className="fa-solid fa-comment"></i> Comment
						</button>
						<button className="btn btn-success">
							<i className="fa-sharp fa-solid fa-share"></i> Share
						</button> */}
          </Container>
        </div>
      ))}
      <br />
    </div>
  );
};

export default Feed;
