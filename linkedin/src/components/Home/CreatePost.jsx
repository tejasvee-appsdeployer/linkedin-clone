import React, { useEffect, useState } from "react";
import UserImage from "../../Images/User.png";
import "./CreatePost.scss";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, database, userAuth } from "../../firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
	const navigate = useNavigate()
	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState("");
	const [userImage, setUserImage] = useState(UserImage);
	const [userHeading, setUserHeading] = useState("");
	const [content, setContent] = useState("");
	const [college, setCollege] = useState("");
	const [image, setImage] = useState(null);
	useEffect(() => {
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user.uid);
				const DocRef = doc(database, "ConnectInUsers", userId);
				getDoc(DocRef)
					.then((object) => {
						setUserName(object.data().Username);
						setUserImage(object.data().UserImage);
						setUserHeading(object.data().Heading);
						setCollege(object.data().College);
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
							Heading: userHeading,
							ImageUrl: url,
							College: college,
							Like: 0,
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
		<div className="createpost-news-wrap">
		<div className="createpost-wrap">
			<div className="card">
				<div className="card-header">Create a Post</div>
				<div className="card-body">
					<div className="card-user-info">
						<div className="user-img-wrap">
							<img src={userImage} alt="user-profile" />
						</div>
						<div className="name-post-visibility">
							<span className="text-capitalize">{userName}</span>
							<span>Public</span>
						</div>
					</div>

					<div className="post-input-wrap">
						<textarea
							className="post-text"
							placeholder="Write ..."
							onChange={(e) =>
								setContent((prev) => ({ ...prev, Content: e.target.value }))
							}
							required
						></textarea>
						<label htmlFor="file-upload" className="btn btn-secondary">
						<i class="fa-solid fa-upload"></i> 
							<input
								type="file"
								name="file"
								id="file-upload"
								onChange={(e) => setImage(e.target.files[0])}
								required
							/>
							Upload Image
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
		<NewsCard/>
		</div>

	);
};

export default CreatePost;
