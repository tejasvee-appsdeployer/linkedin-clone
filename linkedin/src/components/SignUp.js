import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './SignUp.css';
// import Logo from '../Images/LinkedLogo.jpg';
import UserPic from '../Images/User.png';
import { userAuth, database } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


const initialState = {
    Name: "",
    Email: "",
    Pass: "",
    Image: UserPic
}

const SignUp = (props) => {

    const navigate = useNavigate();

    const [userdata, setUserData] = useState(initialState);
    const [userHeading, setUserHeading] = useState("");
    const [userCollege, setUserCollege] = useState("");
    const [userId, setUserId] = useState(null);


    const { Name, Email, Pass, } = userdata;

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
                    displayName: Name,
                    photoURL: UserPic
                });
                console.log(res)
                toast.success("Signed Up");
                // console.log(User.displayName);
                let date = new Date();
                let prev = date.getDate();
                date.setDate(prev);
                let newDate = date.toJSON().slice(0, 10)
                const DocRef = doc(database, 'ConnectInUsers', User.uid);
                setDoc(DocRef, {
                    Username: Name,
                    UserEmail: Email,
                    Date_Joined: newDate,
                    UserImage: UserPic,
                    Heading: userHeading,
                    College: userCollege
                }).then(() => {
                    console.log("Added the Document");
                }).catch((err) => {
                    console.log(err.message);
                })
                navigate('/signin');
            }).catch((err) => {
                toast.error(err.message);
            })
        }
    }

    return (
        <div>
            <div className="SignUpContainer">
                <div className="SignUpNav">
                    ConnectIn
                </div>
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
                    <p className='Already'>Already have an Account?<Link className='AlreadyLink' to="/signin"> SignIn</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
// const data = collection(database, 'Peoples');
                // let date = new Date();
                // let prev = date.getDate();
                // date.setDate(prev);
                // let newDate = date.toJSON().slice(0, 10)
                // addDoc(data, {
                //     UserName: Name,
                //     UserEmail: Email,
                //     Date_Joined: newDate,
                //     Image: UserPic,
                //     Id: "",
                //     Heading: '',
                //     College: userCollege
                // }).then((objects) => {
                //     // const DocRef = doc(database, 'Peoples', objects._key.path.segments[1]);
                //     // updateDoc(DocRef, {
                //     //     Id: objects._key.path.segments[1]
                //     // }).then(() => {console.log("Updated")})
                //     // setUserId(objects._key.path.segments[1]);
                //     // props.setCurrentUserId(objects._key.path.segments[1]);
                //     navigate('/signin');
                // }).catch((err) => {
                //     console.log(err.message);
                // })