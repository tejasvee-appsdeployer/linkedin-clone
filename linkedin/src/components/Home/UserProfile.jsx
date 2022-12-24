import React from "react";
import { Container } from "react-bootstrap";
import "./UserProfile.scss";
import profile from "../../Images/profile.jpg";
import { SocialIcon } from "react-social-icons";
import NavBar from "./Navbar";

const UserProfile = () => {
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
						<img src={profile} className="profile-img" alt="profile" />
					</div>
					<div className="card-body text-dark row">
						<div className="col col-10 left">
							<h5 className="card-title">Tejasvee Dighe</h5>
							<p className="card-text">
								<p className="description">
									Final year engineering Student and other descriptions
								</p>
								<i class="fa-solid fa-house-laptop"></i>
								Malwa Institute of Technology
							</p>
							<div className="btn btn-primary">
								<i class="fa-solid fa-bolt"></i> Message
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
					<h4 className="card-title mt-3">Activity</h4>
					<div className="card-body">
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-start">
								<div className="post-img-desc-wrap d-flex ">
									<img
										src={profile}
										className=" activity-post-thumbnail mr-2"
										alt="post-img"
									/>
									<p>
										upload date
										<br />
										post description
									</p>
								</div>
								<span class="badge bg-primary rounded-pill">
									14 <i class="fa-solid fa-thumbs-up"></i>
								</span>
							</li>{" "}
							<li className="list-group-item d-flex justify-content-between align-items-start">
								<div className="post-img-desc-wrap d-flex ">
									<img
										src={profile}
										className=" activity-post-thumbnail mr-2"
										alt="post-img"
									/>
									<p>
										upload date
										<br />
										post description
									</p>
								</div>
								<span class="badge bg-primary rounded-pill">
									14 <i class="fa-solid fa-thumbs-up"></i>
								</span>
							</li>
						</ul>
					</div>
				</Container>
			</Container>
		</>
	);
};

export default UserProfile;
