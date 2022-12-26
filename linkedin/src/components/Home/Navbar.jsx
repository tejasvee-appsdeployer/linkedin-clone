import React, { useEffect, useState } from "react";
import UserImage from "../../Images/User.png";
import { userAuth } from "../../firebase";
import { signOut } from "@firebase/auth";
import {
	Button,
	Container,
	Nav,
	Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const initialState = {
	UserName1: "",
	UserEmail1: "",
	UserImage1: null,
	College1: "",
	Heading1: "",
};

const NavBar = () => {
	const [userImage, setUserImage] = useState(null);
	const [userId, setUserId] = useState(null);
	const [updatedUser, setUpdatedUser] = useState(initialState);

	const { UserName1, UserEmail1, UserImage1, Heading1, College1 } = updatedUser;

	const navigate = useNavigate();
	useEffect(() => {
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user.uid);
				setUserImage(UserImage);
			}
		});
	}, []);

	return (
		<Navbar id="navbar" expand="lg" className="container-fluid" fixed="sticky">
			<Container
				fluid
				className="navbar-wrap d-flex justify-content-around ms-4"
			>
				<Navbar.Brand href="/" className="navbar-brand">
					ConnectIn
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="m-auto me-4 my-2 my-lg-0 nav-link-wrap"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link className="mx-2 d-flex flex-column text-center" href="/">
							<i className="fa-solid fa-house"></i>Home
						</Nav.Link>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i className="fa-solid fa-globe"></i>My Network
						</Nav.Link>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i className="fa-solid fa-briefcase"></i>Jobs
						</Nav.Link>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i className="fa-solid fa-bell"></i>Notifications
						</Nav.Link>
						<Nav.Link className="mx-auto text-center d-flex">
							<Button className="rounded-pill nav-profile-btn" variant="outline-primary" onClick={() => {navigate(`/profile/${userId}`)}} > {" "} Profile{" "} </Button>
						</Nav.Link>
						<Nav.Link className="mx-2 text-center">
							<Button variant="danger" onClick={() => { signOut(userAuth).then(() => {navigate("/signin"); }); }} > {" "} Logout{" "} </Button>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
