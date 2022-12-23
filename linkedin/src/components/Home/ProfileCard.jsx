import React from "react";
import profile from '../../Images/profile.jpg'
import './ProfileCard.scss';
import { SocialIcon } from 'react-social-icons';


const ProfileCard = () => {
  return (
    <>
      <div className="card-wrap" >
        <div className="img-wrap">
          <img src={profile} className="" alt="profile" />
        </div>
        <div className="card-body">
            <h4>Abhimanyu Sharma</h4>
            <h5 style={{fontWeight:'200'}}>Computer Science Engineer</h5>
            <div className="social">
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="dribbble"/>
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="instagram"/>
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="facebook"/>
                <SocialIcon style={{height:'35px',width:'35px'}}  className="social-icon" network="google"/>
            </div>
            <button className="btn btn-primary" id="viewprofile-btn">View profile</button>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
