import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import "./Feed.scss";
import { Container } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";

const Feed = (props) => {
	const [allPosts, setAllPosts] = useState([]);
	const data = collection(database, "ConnectInPosts");
	useEffect(() => {
		getDocs(data).then((snapshot) => {
			let res = [];
			snapshot.docs.forEach((item) => {
				res.push({ ...item.data(), id: item.id });
			});
			setAllPosts(res);
		});
	}, []);

	if (props.value !== "") {
		getDocs(data).then((snapshot) => {
			let res = [];
			snapshot.docs.forEach((item) => {
				if (props.value === item.data().Username) {
					res.push({ ...item.data(), id: item.id });
				}
			});
			setAllPosts(res);
		});
	}
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
							<div className="user-info">{object.Username}</div>
						</Container>
						<button className="btn btn-primary" id="follow-btn">
							Follow
						</button>
					</Container>
					<Container className="post-description my-2">
						{object.Content}
					</Container>
					<Container className="post-wrapper">
						<img className="post-img" src={object.ImageUrl} alt="" />
						<Container className="count-wrapper mt-1">
							<div>0 likes</div>
							<div>0 comments</div>
						</Container>
						<hr />
					</Container>
					<Container className="btn-wrapper">
						<button className="btn btn-success">
							<i class="fa-solid fa-thumbs-up"></i> Like
						</button>
						<button className="btn btn-success">
							<i class="fa-solid fa-comment"></i> Comment
						</button>
						<button className="btn btn-success">
							<i class="fa-sharp fa-solid fa-share"></i> Share
						</button>
					</Container>
				</div>
			))}
			<br />
		</div>
	);
};

export default Feed;
