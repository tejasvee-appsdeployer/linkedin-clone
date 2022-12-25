import { React, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserImage from "../../Images/User.png";
import "./UserProfile.scss";
import { SocialIcon } from "react-social-icons";
import NavBar from "./Navbar";
import { userAuth, database } from "../../firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

const UserProfile = () => {
	const [userName, setUserName] = useState("");
	const [userImage, setUserImage] = useState(UserImage);
	const [userId, setUserId] = useState(null);
	const [userContent, setUserContent] = useState(null);
	const [userCollege, setUserCollege] = useState("");

	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		console.log(1);
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user.uid);
				const DocRef = doc(database, "ConnectInUsers", userId);
				getDoc(DocRef)
					.then((object) => {
						setUserName(object.data().UserName);
						setUserImage(object.data().UserImage);
						setUserContent(object.data().Heading);
						setUserCollege(object.data().College);
					})
					.catch((err) => {
						console.log(err.message);
					});

				const data = collection(database, "ConnectInPosts");
				getDocs(data).then((snapshot) => {
					let res = [];
					snapshot.docs.forEach((item) => {
						res.push({ ...item.data(), id: item.id });
					});
					setAllPosts(res);
				});
			} else {
				setUserName("");
			}
		});
	}, [userId]);

	return (
		<>
			<NavBar />
			<Container className="parent-card d-flex flex-column justify-content-center align-items-center">
				<div className="card mb-3 profile-card-wrapper">
					<div className="background-img-wrap">
						<img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg"className="card-img-top background-img"alt="..."/>
					</div>
					<div className="profile-img-wrap">
						<img src={userImage} className="profile-img" alt="profile" />
					</div>
					<div className="card-body text-dark row">
						<div className="col col-10 left">
							<h5 className="card-title">{userName}</h5>
							<span className="card-text">
								<p className="description">{userContent}</p>
								<i className="fa-solid fa-house-laptop"></i>{userCollege}
							</span>
							<br/>
							<div className="btn btn-primary">
								<i className="fa-solid fa-edit"></i> Edit Profile
							</div>
						</div>
						<div className="col d-grid gap-2">
							<SocialIcon
								style={{ height: "35px", width: "35px" }}
								className="social-icon "
								network="dribbble"
							/>
							<SocialIcon
								style={{ height: "35px", width: "35px" }}
								className="social-icon "
								network="instagram"
							/>
							<SocialIcon
								style={{ height: "35px", width: "35px" }}
								className="social-icon "
								network="facebook"
							/>
							<SocialIcon
								style={{ height: "35px", width: "35px" }}
								className="social-icon "
								network="google"
							/>
						</div>
					</div>
				</div>
				<Container className="activity-card card text-dark">
					<h4 className="card-title mt-3">Your Posts</h4>
					<div className="card-body">
						<ul className="list-group">
							{allPosts.map((objects) =>
								objects.UserId === userId ? (
									<li className="list-group-item d-flex justify-content-between align-items-start">
										<div className="post-img-desc-wrap d-flex ">
											<img
												src={objects.ImageUrl}
												className=" activity-post-thumbnail mr-2"
												alt="post-img"
											/>
											<p>
												{objects.Date_posted}
												<br />
												{objects.Content}
											</p>
										</div>
										<span className="badge bg-primary rounded-pill">
											14 <i className="fa-solid fa-thumbs-up"></i>
										</span>
									</li>
								) : (
									<div></div>
								)
							)}
						</ul>
					</div>
				</Container>
			</Container>
		</>
	);
};

export default UserProfile;
