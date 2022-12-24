import React, { useEffect, useState } from "react";
import UserImage from "../../Images/User.png";
import "./CreatePost.scss";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database, userAuth } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const CreatePost = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [userImage, setUserImage] = useState();
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setUserImage(UserImage);
        setUserId(user.uid)
      } else {
        setUserName("");
      }
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const ImageRef = ref(storage, `BlogsImage/${image.name}`);
    uploadBytes(ImageRef, image)
      .then(() => {
        getDownloadURL(ImageRef)
          .then((url) => {
            const data = collection(database, "UsersPost");
            addDoc(data, {
              Username: userName,
              ImageUrl: url,
              Content: content.Content,
              UserId: userId,
            }).then(() => {
              toast.success("Congratulations, Your blog is Posted");
              navigate("/home");
            });
          })
          .catch((err) => {
            console.log("Url nhi mila kuch dikkat hai");
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="createpost-wrap">
      <div className="card">
        <div className="card-header">Create a Post</div>
        <div className="card-body">
          <div className="card-user-info">
            <div className="user-img-wrap">
              <img src={userImage} alt="user-profile" />
            </div>
            <div className="name-post-visibility">
              <span>{userName}</span>
              <span>public</span>
            </div>
          </div>

          <div className="post-input-wrap">
            <textarea
              className="post-text"
              placeholder="Write ..."
              onChange={(e) =>
                setContent((prev) => ({ ...prev, Content: e.target.value }))
              }
            ></textarea>
            <label htmlFor="file-upload" className="btn btn-secondary">
              Upload
              <input
                type="file"
                name="file"
                id="file-upload"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <button
              id="post-btn"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;