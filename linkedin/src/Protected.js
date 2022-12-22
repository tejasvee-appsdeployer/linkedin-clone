import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuth } from './firebase';


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
      })
    return (
        <div>
            <Component/>
        </div>
    )
}

export default Protected
