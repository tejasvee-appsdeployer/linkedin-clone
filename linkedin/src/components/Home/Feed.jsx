import React from "react";
import "./Feed.scss";
import { Container } from "react-bootstrap";
import profile from "../../Images/profile.jpg";

const Feed = () => {
	return (
		<div className="feed-wrap">
			<Container className="profile-wrap">
				<Container className="d-flex">
					<img src={profile} className="btn-floating" alt="profile" />
					<div className="user-info">
						Tejasvee Dighe
						<div>ReactJS Developer</div>
					</div>
				</Container>
				<button class="btn btn-primary" id="follow-btn">Follow</button>
			</Container>
			<Container className="post-description my-2">
				Description of post
			</Container>
			<Container className="post-wrapper">
				<img className="post-img" src="https://media.licdn.com/dms/image/C4D22AQGk1GL9v8Lw3w/feedshare-shrink_800/0/1671522142143?e=1674691200&v=beta&t=CMSGkkXFdir2tVHKS1NpMjhlgZuurQ36Fy1mJcniAMU"alt=""/>
				<Container className="count-wrapper mt-1">
					<div>0 likes</div>
					<div>0 comments</div>
				</Container>
				<hr />
			</Container>
			<Container className="btn-wrapper">
				<button className="btn btn-success"><i class="fa-solid fa-thumbs-up"></i> Like</button>
				<button className="btn btn-success"><i class="fa-solid fa-comment"></i> Comment</button>
				<button className="btn btn-success"><i class="fa-sharp fa-solid fa-share"></i> Share</button>
			</Container>
		</div>
	);
};

export default Feed;