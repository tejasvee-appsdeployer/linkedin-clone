import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "./firebase";
import "./Protected.css";

const Protected = (props) => {
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() => {
        userAuth.onAuthStateChanged((user) => {
          if(user){
            navigate('/');
          }
          else{
            navigate('/signin');
          }
        })
      }, [])
    return (
        <div className='container-fluid' >
            <Component />
        </div>
    )
}

export default Protected;
