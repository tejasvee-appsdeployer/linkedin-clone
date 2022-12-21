import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './SignUp.css';
import { userAuth, database } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


const initialState = {
    Name: "",
    Email: "",
    Pass: "",
    Date_Joined: ""
}

const SignUp = () => {

    const navigate = useNavigate();

    const [userdata, setUserData] = useState(initialState);
    const [done, setDone] = useState(false);

    const { Name, Email, Pass } = userdata;

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!Name || !Email || !Pass) {
            toast.error("Kindly fill all the Details!!");
            return;
        }
        else {
            createUserWithEmailAndPassword(userAuth, Email, Pass).then(async (res) => {
                const User = res.user;
                await updateProfile(User, {
                    displayName: Name
                });
                toast.success("Signed Up");
                const data = collection(database, 'AuthUsers');
                let date = new Date();
                let prev = date.getDate();
                date.setDate(prev);
                let newDate = date.toJSON().slice(0, 10)
                addDoc(data, {
                    UserName: Name,
                    UserEmail: Email,
                    Date_Joined: newDate
                }).then(() => {
                    console.log("User Added");
                    navigate('/signin');
                }).catch((err) => {
                    console.log(err.message);
                })
                navigate('/signin');
            }).catch((err) => {
                console.log(done, "Falseeee");
                toast.error(err.message);
            })
        }
    }

    return (
        <div>
            <div className="SignUpContainer">
                <h1 className="SignUpHeading">
                    Make the most of your professional life
                </h1>
                <div className="SignUpCenter">
                    <div className="SignUpName">
                        <label htmlFor="name" className="SLName">Name</label><br />
                        <input type="text" className="SIName" onChange={(e) => setUserData((prev) => ({ ...prev, Name: e.target.value }))} />
                    </div>

                    <div className="SignUpEmail">
                        <label htmlFor="email" className="SLEmail">Email</label><br />
                        <input type="email" className="SIEmail" onChange={(e) => setUserData((prev) => ({ ...prev, Email: e.target.value }))} />
                    </div>

                    <div className="SignUpPass">
                        <label htmlFor="password" className="SLPass">Password (6 or more characters)</label><br />
                        <input type="password" className="SIPass" onChange={(e) => setUserData((prev) => ({ ...prev, Pass: e.target.value }))} />
                    </div>

                    <div className="SignUpButton">
                        <button onClick={handleSubmit} className="JoinBtn">Join</button>
                    </div>
                    <p>Already have an Account?<Link to="/signin"> SignIn</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
