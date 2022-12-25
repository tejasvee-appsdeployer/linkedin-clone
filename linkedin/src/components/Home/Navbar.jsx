import React, { useEffect, useState } from "react";
import UserImage from "../../Images/User.png";
import { userAuth, database, storage } from "../../firebase";
import { signOut } from "@firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";


const initialState = {
	UserName1: "",
	UserEmail1: "",
	UserImage1: null,
	College1: "",
	Heading1: ""
}

const NavBar = () => {
  const [userImage, setUserImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(initialState);

  const {UserName1, UserEmail1, UserImage1, Heading1, College1} = updatedUser;

  const navigate = useNavigate();
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user) {
		setUserId(user.uid);
        setUserImage(UserImage);
      }
    });
  }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalOpen = () => setShowEditModal(true);
  const handleFormSubmit = (e) => {
	e.preventDefault();
	const ImageRef = ref(storage, `ConnectInImage/${userImage.name}`);
	uploadBytes(ImageRef, userImage).then(() => {
		getDownloadURL(ImageRef).then((url) => {
			const DocRef = doc(database, 'ConnectInUsers', userId);
			let date = new Date();
            let prev = date.getDate();
            date.setDate(prev);
            let newDate = date.toJSON().slice(0, 10)
			updateDoc(DocRef, {
				UserName: UserName1,
				UserEmail: UserEmail1,
				UserImage: url,
				Date_Joined: newDate,
				Heading: Heading1,
				College: College1
			}).then(() => {
				toast.success("Updated the profile");
				navigate('/home')
			})
		})
	})
    
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
                  <Modal show={showEditModal} onHide={handleEditModalClose} className="text-dark" >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>User Profile Image</Form.Label>
                          <Form.Control type="file" onChange={(e) => setUserImage(e.target.files[0])} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setUpdatedUser((prev) => ({...prev, UserName1: e.target.value}))} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email"  onChange={(e) => setUpdatedUser((prev) => ({...prev, UserEmail1: e.target.value}))}/>
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCollege" >
                          <Form.Label>College</Form.Label>
                          <Form.Control type="text" placeholder="College/Institution Name"  onChange={(e) => setUpdatedUser((prev) => ({...prev, College1: e.target.value}))}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicHeading" >
                          <Form.Label>Heading</Form.Label>
                          <Form.Control type="text" placeholder="Heading" onChange={(e) => setUpdatedUser((prev) => ({...prev, Heading1: e.target.value}))}/>
                          <Form.Text className="text-muted"> Current Occupation. </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox" ></Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleEditModalClose} > Close </Button>
                      <Button variant="primary" type="submit" onClick={handleFormSubmit} >Submit</Button>
                    </Modal.Footer>
                  </Modal>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Button
                    variant="danger"
                    onClick={() => {
                      signOut(userAuth).then(() => {
                        navigate("/signin");
                      });
                    }}
                  >
                    {" "}
                    Logout{" "}
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
