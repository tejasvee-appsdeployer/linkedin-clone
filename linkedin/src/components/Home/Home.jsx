import React, { useEffect, useState, useContext } from "react";
import CreatePost from "./CreatePost";
import Feed from "./Feed";
import ProfileCard from "./ProfileCard";
import "./Home.scss";
import "./CreatePost.scss";
import NavBar from "./Navbar";
import { toast } from "react-toastify";
import { userAuth, database } from "../../firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { Modal } from "react-bootstrap";
import UserImage from "../../Images/User.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import SearchContext from "../../context/SearchContext";
import NewsCard from "./NewsCard";

const Home = () => {
	const [search, setSearch] = useState("");

	const {setSearches} = useContext(SearchContext);
	const handleSearch = (e) => {
		e.preventDefault();
		var Count = 0;
		const DocRef = collection(database, "ConnectInUsers");
		getDocs(DocRef)
			.then((snapshot) => {
				snapshot.docs.forEach((item) => {
					if (search === item.data().UserName) {
						Count++;
					}
				});
				if (Count === 0) {
					toast.error("User Not Found/User has not posted any Post");
					setSearches("");
				} else {
					setSearches(search);
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState("");
	const [userImage, setUserImage] = useState(UserImage);
	const [userHeading, setUserHeading] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	useEffect(() => {
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user.uid);
				const DocRef = doc(database, "ConnectInUsers", userId);
				getDoc(DocRef)
					.then((object) => {
						setUserName(object.data().UserName);
						setUserImage(object.data().UserImage);
						setUserHeading(object.data().Heading);
					})
					.catch((err) => {
						console.log(err.message);
					});
			} else {
				setUserName("");
			}
		});
	}, [userId]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const ImageRef = ref(storage, `ConnectInImage/${image.name}`);
		uploadBytes(ImageRef, image)
			.then(() => {
				getDownloadURL(ImageRef)
					.then((url) => {
						const data = collection(database, "ConnectInPosts");
						let date = new Date();
						let prev = date.getDate();
						date.setDate(prev);
						let newDate = date.toJSON().slice(0, 10);
						addDoc(data, {
							Username: userName,
							UserImage: userImage,
							UserHeading: userHeading,
							ImageUrl: url,
							Content: content.Content,
							UserId: userId,
							Date_posted: newDate,
						})
							.then(() => {
								toast.success("Congratulations, Your blog is Posted");
							})
							.catch((err) => {
								console.log("Add Docs have problem");
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
		<>
			<div>
				<NavBar />
				<div
					className="mt-2"
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<input
						className="form-control"
						style={{ width: "50%" }}
						type="text"
						placeholder="Search by UserName..."
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className="btn btn-outline-light mx-2" onClick={handleSearch}>
						Search
					</button>
					<button
						className="btn btn-outline-light d-block d-sm-none"
						onClick={handleShow}
					>
						+
					</button>
					<Modal className="text-dark" show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Create Post</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="createpost-modal" style={{ width: "100%" }}>
								<div className="card">
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
													setContent((prev) => ({
														...prev,
														Content: e.target.value,
													}))
												}
											></textarea>
											<label
												htmlFor="file-upload"
												className="btn btn-secondary"
											>
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
						</Modal.Body>
					</Modal>
				</div>
				<div className="home-wrapper">
					<ProfileCard />
					<Feed/>
					<CreatePost />
				
				</div>
			</div>
		</>
	);
};

export default Home;
