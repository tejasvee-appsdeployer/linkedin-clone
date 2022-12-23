import React, { useEffect, useState } from "react";
import UserImage from '../../Images/User.png'
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

import "./Navbar.scss";
import {userAuth} from '../../firebase';

const NavBar = () => {

	const [userImage, setUserImage] = useState(null);
	useEffect(() => {
		userAuth.onAuthStateChanged((user) => {
		  if(user){
			setUserImage(UserImage);
		  }
		})
	  })
	return (
		<Navbar id='navbar' expand="lg" className="container-fluid">
			<Container fluid className="navbar-wrap d-flex justify-content-around ms-4">
				<Navbar.Brand href="#" className="navbar-brand">ConnectIn</Navbar.Brand>
				<Form className="d-flex search-wrap" >
					<Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
					<Button variant="outline-light">Search</Button>
				</Form>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="m-auto me-4 my-2 my-lg-0 nav-link-wrap" style={{ maxHeight: "100px" }} navbarScroll>
						<Nav.Link className="mx-2 d-flex flex-column text-center" href="#action1"><i class="fa-solid fa-house"></i>Home</Nav.Link>
						<Nav.Link className="mx-2 d-flex flex-column text-center" href="#action1"><i class="fa-solid fa-globe"></i>My Network</Nav.Link>
						<Nav.Link className="mx-2 d-flex flex-column text-center" href="#action1"><i class="fa-solid fa-briefcase"></i>Jobs</Nav.Link>
						<Nav.Link className="mx-2 d-flex flex-column text-center"href="#action1"><i class="fa-solid fa-bolt"></i>Messaging</Nav.Link>
						<Nav.Link className="mx-2 d-flex flex-column text-center"href="#action1"><i class="fa-solid fa-bell"></i>Notifications</Nav.Link>
						<Nav.Link className="mx-2 d-flex flex-cloumn  text-center"href="#action1"><img src={userImage} alt="" className="img-thumbnail profile" /></Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;