import React from "react";
import "./CreatePost.scss";
import profile from "../../Images/profile.jpg";

const CreatePost = () => {
  return (
    <div className="createpost-wrap">
      <div className="card">
        <div className="card-header">Create a Post</div>
        <div className="card-body">
          <div className="card-user-info">

            <div className="user-img-wrap">
              <img src={profile} alt="user-profile" />
            </div>
            <div className="name-post-visibility">
              <span>Abhimanyu Sharma</span>
              <span>public</span>
            </div>

          </div>

          <div className="post-input-wrap">
            <textarea className="post-text" placeholder="Write ..."></textarea>
            <label htmlFor="file-upload" className="btn btn-secondary">
              Upload
               <input type="file" name="file" id="file-upload" />
            </label>
            <button id='post-btn' className="btn btn-success">post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
