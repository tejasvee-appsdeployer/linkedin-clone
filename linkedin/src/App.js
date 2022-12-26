import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Protected from "./Protected";
import Home from "./components/Home/Home";
import "./components/Home/Common.scss";
import MyContext from "./context/WorkingContext";
import UserProfile from "./components/Home/UserProfile";
// import CreatePost from "./components/Home/CreatePost";

function App() {
	// const [currentUserId, setCurrentUserId] = useState(null);

	return (
		<>
			<MyContext>
				<div className="App">

					<ToastContainer position="top-center" />

					<Routes>
						{/* <Route path='/' element={<Protected Component={Feed} />} /> */}
						{/* <Route path='/home' element={<Home/>} /> */}
						<Route path="/" element={<Protected Component={Home} />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/profile/:id" element={<UserProfile />} />
					</Routes>

				</div>
			</MyContext>

		</>
	);
}

export default App;
