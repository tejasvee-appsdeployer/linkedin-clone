import './SignIn.css';
import React, { useState, useContext } from 'react'
import Logo from '../Images/LinkedLogo.jpg';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { userAuth } from '../firebase';


const initialState = {
  Email: '',
  Pass: ''
}

const SignIn = () => {
  const navigate = useNavigate();

  const [userdata, setUserData] = useState(initialState);

  const { Email, Pass } = userdata

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Email || !Pass) {
      toast.error("Please fill all the details!")
      return;
    }
    signInWithEmailAndPassword(userAuth, Email, Pass).then((res) => {
      toast.success("Logged In Successfully");
      navigate('/');
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <div>
      <div className="SignInContainer">
        <div className="SignInNav">
          {/* <img src={Logo} className='Auth' alt="" /> */}
          ConnectIn
        </div>
        <h1 className="SignInHeading">
          Welcome to your professional community
        </h1>
        <div className="SignInCenter">
          <div className="SignInEmail">
            <label htmlFor="email" className="LLEmail">Email</label><br />
            <input type="email" className="LIEmail" onChange={(e) => setUserData((prev) => ({ ...prev, Email: e.target.value }))} />
          </div>

          <div className="SignInPass">
            <label htmlFor="password" className="LLPass">Password (6 or more characters)</label><br />
            <input type="password" className="LIPass" onChange={(e) => setUserData((prev) => ({ ...prev, Pass: e.target.value }))} />
          </div>

          <div className="SignInButton">
            <button onClick={handleSubmit} className="LoginBtn">SignIn</button>
          </div>

          <p className='Already'>Don't have an Account?<Link className='AlreadyLink' to="/signup"> SignUp</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
