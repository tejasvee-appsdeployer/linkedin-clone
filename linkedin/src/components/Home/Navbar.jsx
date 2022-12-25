import React, { useEffect, useState } from "react";
import UserImage from "../../Images/User.png";
import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { userAuth } from "../../firebase";
import Modal from "react-bootstrap/Modal";

const NavBar = () => {
	const [userImage, setUserImage] = useState(null);
	useEffect(() => {
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserImage(UserImage);
			}
		});
	});

	const [showEditModal, setShowEditModal] = useState(false);
	const handleEditModalClose = () => setShowEditModal(false);
	const handleEditModalOpen = () => setShowEditModal(true);
	const handleFormSubmit = () => {
		alert("Form submitted");
	};
	return (
		<Navbar id="navbar" expand="lg" className="container-fluid" fixed="sticky">
			<Container
				fluid
				className="navbar-wrap d-flex justify-content-around ms-4"
			>
				<Navbar.Brand href="/home" className="navbar-brand">
					ConnectIn
				</Navbar.Brand>
				<Form className="d-flex search-wrap">
					<Form.Control
						type="search"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
					/>
					<Button variant="outline-light">Search</Button>
				</Form>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="m-auto me-4 my-2 my-lg-0 nav-link-wrap"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i class="fa-solid fa-house"></i>Home
						</Nav.Link>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i class="fa-solid fa-globe"></i>My Network
						</Nav.Link>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i class="fa-solid fa-briefcase"></i>Jobs
						</Nav.Link>
						<Nav.Link
							className="mx-2 d-flex flex-column text-center"
							href="#action1"
						>
							<i class="fa-solid fa-bell"></i>Notifications
						</Nav.Link>
						<Nav.Link className="mx-auto me-5 dropdown-center d-flex flex-column text-center dropdown-center">
							<NavDropdown
								className="nav-drop-down mx-auto dropdown-center d-flex flex-column text-center"
								title="Profile"
								id="basic-nav-dropdown"
							>
								<NavDropdown.Item>
									<Link to="/profile">
										<img
											src={userImage}
											alt="user"
											className="img-thumbnail profile nav-link"
										/>
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Button variant="info" onClick={handleEditModalOpen}>
										Edit Profile
									</Button>{" "}
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
													<Form.Control type="file" />
												</Form.Group>
												<Form.Group className="mb-3" controlId="formBasicName">
													<Form.Label>Name</Form.Label>
													<Form.Control type="text" placeholder="Enter Name" />
												</Form.Group>
												<Form.Group className="mb-3" controlId="formBasicEmail">
													<Form.Label>Email address</Form.Label>
													<Form.Control
														type="email"
														placeholder="Enter email"
													/>
													<Form.Text className="text-muted">
														We'll never share your email with anyone else.
													</Form.Text>
												</Form.Group>

												<Form.Group
													className="mb-3"
													controlId="formBasicCollege"
												>
													<Form.Label>College</Form.Label>
													<Form.Control
														type="text"
														placeholder="College/Institution Name"
													/>
												</Form.Group>
												<Form.Group
													className="mb-3"
													controlId="formBasicHeading"
												>
													<Form.Label>Heading</Form.Label>
													<Form.Control type="text" placeholder="Heading" />
													<Form.Text className="text-muted">
														Current Occupation.
													</Form.Text>
												</Form.Group>
												<Form.Group
													className="mb-3"
													controlId="formBasicCheckbox"
												></Form.Group>
											</Form>
										</Modal.Body>
										<Modal.Footer>
											<Button
												variant="secondary"
												onClick={handleEditModalClose}
											>
												Close
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
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Button
										variant="danger"
										onClick={() => {
											alert("logout");
										}}
									>
										Logout
									</Button>{" "}
								</NavDropdown.Item>
							</NavDropdown>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
