import { React, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import UserImage from "../../Images/User.png";
import "./UserProfile.scss";
import { useLocation } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import NavBar from "./Navbar";
import { userAuth, database, storage } from "../../firebase";
import {
	updateDoc,
	getDoc,
	doc,
	getDocs,
	collection,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
	UserName1: "",
	UserEmail1: "",
	UserImage1: null,
	College1: "",
	Heading1: "",
};

const UserProfile = () => {
	const [userName, setUserName] = useState("");
	const [userImage, setUserImage] = useState(UserImage);
	const [userId, setUserId] = useState(null);
	const [userContent, setUserContent] = useState(null);
	const [userCollege, setUserCollege] = useState("");
	const location = useLocation();
	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		// userAuth.onAuthStateChanged((user) => {
		// 	if (user) {
		// 		setUserId(user.uid);
		// 		const DocRef = doc(database, "ConnectInUsers", userId);
		// 		getDoc(DocRef)
		// 			.then((object) => {
		// 				setUserName(object.data().UserName);
		// 				setUserImage(object.data().UserImage);
		// 				setUserContent(object.data().Heading);
		// 				setUserCollege(object.data().College);
		// 			})
		// 			.catch((err) => {
		// 				console.log(err.message);
		// 			});

				
		// 	} else {
		// 		setUserName("");
		// 	}
		// });

		const Object = location.state;
		setUserName(Object.Username);
		setUserImage(Object.UserImage);
		setUserContent(Object.Heading);
		setUserCollege(Object.College);

		console.log(Object)
	}, []);


	const navigate = useNavigate();
	const [updatedUser, setUpdatedUser] = useState(initialState);
	const { UserName1, UserEmail1, Heading1, College1 } = updatedUser;
	const [showEditModal, setShowEditModal] = useState(false);
	const handleEditModalClose = () => setShowEditModal(false);
	const handleEditModalOpen = () => setShowEditModal(true);
	const handleFormSubmit = (e) => {
		e.preventDefault();
		const ImageRef = ref(storage, `ConnectInImage/${userImage.name}`);
		uploadBytes(ImageRef, userImage).then(() => {
			getDownloadURL(ImageRef).then((url) => {
				const DocRef = doc(database, "ConnectInUsers", userId);
				let date = new Date();
				let prev = date.getDate();
				date.setDate(prev);
				let newDate = date.toJSON().slice(0, 10);
				updateDoc(DocRef, {
					UserName: UserName1,
					UserEmail: UserEmail1,
					UserImage: url,
					Date_Joined: newDate,
					Heading: Heading1,
					College: College1,
				}).then(() => {
					toast.success("Updated the profile");
					navigate("/");
				});
			});
		});
	};

	return (
		<>
			<NavBar />
			<Container className="parent-card d-flex flex-column justify-content-center align-items-center">
				<div className="card mb-3 profile-card-wrapper">
					<div className="background-img-wrap">
						<img
							src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg"
							className="card-img-top background-img"
							alt="..."
						/>
					</div>
					<div className="profile-img-wrap">
						<img src={userImage} className="profile-img" alt="profile" />
					</div>
					<div className="card-body row">
						<div className="col col-10 left">
							<h5 className="card-title">{userName}</h5>
							<span className="card-text">
								<p className="description">{userContent}</p>
								<i className="fa-solid fa-house-laptop"></i>
								{userCollege}
							</span>
							<br />
							<div className="btn btn-primary mt-2">
								<Button variant="primary" onClick={handleEditModalOpen}>
									<i className="fa-solid fa-edit"></i> Edit Profile
								</Button>
								<Modal
									show={showEditModal}
									onHide={handleEditModalClose}
									className="text-dark"
								>
									<Modal.Header closeButton>
										<Modal.Title>Edit Profile</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Form>
											<Form.Group controlId="formFile" className="mb-3">
												<Form.Label>User Profile Image</Form.Label>
												<Form.Control
													type="file"
													onChange={(e) => setUserImage(e.target.files[0])}
												/>
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicName">
												<Form.Label>Name</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter Name"
													onChange={(e) =>
														setUpdatedUser((prev) => ({
															...prev,
															UserName1: e.target.value,
														}))
													}
												/>
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicEmail">
												<Form.Label>Email address</Form.Label>
												<Form.Control
													type="email"
													placeholder="Enter email"
													onChange={(e) =>
														setUpdatedUser((prev) => ({
															...prev,
															UserEmail1: e.target.value,
														}))
													}
												/>
												<Form.Text className="text-muted">
													We'll never share your email with anyone else.
												</Form.Text>
											</Form.Group>

											<Form.Group className="mb-3" controlId="formBasicCollege">
												<Form.Label>College</Form.Label>
												<Form.Control
													type="text"
													placeholder="College/Institution Name"
													onChange={(e) =>
														setUpdatedUser((prev) => ({
															...prev,
															College1: e.target.value,
														}))
													}
												/>
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicHeading">
												<Form.Label>Heading</Form.Label>
												<Form.Control
													type="text"
													placeholder="Heading"
													onChange={(e) =>
														setUpdatedUser((prev) => ({
															...prev,
															Heading1: e.target.value,
														}))
													}
												/>
												<Form.Text className="text-muted">
													{" "}
													Current Occupation.{" "}
												</Form.Text>
											</Form.Group>
											<Form.Group
												className="mb-3"
												controlId="formBasicCheckbox"
											></Form.Group>
										</Form>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleEditModalClose}>
											{" "}
											Close{" "}
										</Button>
										<Button
											variant="primary"
											type="submit"
											onClick={handleFormSubmit}
										>
											Submit
										</Button>
									</Modal.Footer>
								</Modal>
							</div>
						</div>
						<div className="col d-lg-grid d-md-grid gap-2 d-sm-none">
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
				<Container className="activity-card card ">
					<h4 className="card-title mt-3">Your Posts</h4>
					<div className="card-body">
						<ul className="list-group">
							{allPosts.map((objects) =>
								objects.UserId === userId ? (
									<li className="list-group-item d-flex justify-content-between align-items-start mt-3">
										<div className="post-img-desc-wrap d-flex ">
											<img
												src={objects.ImageUrl}
												className=" activity-post-thumbnail mr-2 "
												alt="post-img"
											/>
											<p>
												{objects.Date_posted}
												<br />
												{objects.Content}
											</p>
										</div>
										<span className="badge bg-primary rounded-pill d-sm-none d-md-block">
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
