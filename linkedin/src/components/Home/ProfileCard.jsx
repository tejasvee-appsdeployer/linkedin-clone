import React, { useEffect, useState } from "react";
import UserImage from "../../Images/User.png";
import "./ProfileCard.scss";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { userAuth, database } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

const ProfileCard = () => {
	const [userName, setUserName] = useState("");
	const [userImage, setUserImage] = useState(UserImage);
	const [userId, setUserId] = useState(null);
	const [userContent, setUserContent] = useState(null);

	useEffect(() => {
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user.uid);
				const DocRef = doc(database, "ConnectInUsers", userId);
				getDoc(DocRef)
					.then((object) => {
						setUserName(object.data().UserName);
						setUserImage(object.data().UserImage);
						setUserContent(object.data().Heading);
					})
					.catch((err) => {
						console.log(err.message);
					});
			}
		});
	}, [userId]);
	return (
		<>
			<div className="card-wrap fixed">
				<div className="img-wrap">
					<img src={userImage} className="" alt="profile" />
				</div>
				<div className="card-body">
					<h4>{userName}</h4>
					<h5>{userContent}</h5>
					<div className="social">
						<SocialIcon
							style={{ height: "35px", width: "35px" }}
							className="social-icon"
							network="dribbble"
						/>
						<SocialIcon
							style={{ height: "35px", width: "35px" }}
							className="social-icon"
							network="instagram"
						/>
						<SocialIcon
							style={{ height: "35px", width: "35px" }}
							className="social-icon"
							network="facebook"
						/>
						<SocialIcon
							style={{ height: "35px", width: "35px" }}
							className="social-icon"
							network="google"
						/>
					</div>
					<Link
						to={`/profile/:${userId}`}
						class="btn btn-primary"
						id="viewprofile-btn"
					>
						View Profile
					</Link>
				</div>
			</div>
		</>
	);
};

export default ProfileCard;
