import React, { useEffect, useState } from "react";
import UserImage from '../../Images/User.png'
import './ProfileCard.scss';

import { SocialIcon } from 'react-social-icons';
import {userAuth} from '../../firebase';


const ProfileCard = () => {

  const [userName, setUserName] = useState("");
  // const [userImage, setUserImage] = useState(null);
  // const [userContent, setUserContent] = useState("");

  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if(user){
        setUserName(user.displayName);
      }
      else{
        setUserName("");
      }
    })
  })

  return (
    <>
      <div className="card-wrap" >
        <div className="img-wrap">
          <img src={UserImage} className="" alt="profile" />
        </div>
        <div className="card-body">
            <h4>{userName}</h4>
            <h5 style={{fontWeight:'200'}}></h5>
            <div className="social">
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="dribbble"/>
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="instagram"/>
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="facebook"/>
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="google"/>
            </div>
            <button className="btn btn-primary" style={{borderRadius:'100px' ,width:'100%'}}>View profile</button>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
