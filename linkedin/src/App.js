import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Protected from "./Protected";
import Home from "./components/Home/Home";
import "./components/Home/Common.scss";
import UserProfile from "./components/Home/UserProfile";

function App() {
	return (
		<>
			<div className="App">
				<ToastContainer position="top-center" />
				<Routes>
					<Route path="/" element={<Protected Component={Feed} />} />
					<Route path="/home" element={<Home />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/profile" element={<UserProfile />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
