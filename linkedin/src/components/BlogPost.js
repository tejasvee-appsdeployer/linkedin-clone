import React, { useEffect, useState } from 'react';
import './BlogPost.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database, userAuth } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        userAuth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
                setUserId(user.uid)
            }
            else {
                setUserName("");
            }
        })
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        const ImageRef = ref(storage, `BlogImage/${image.name}`)
        uploadBytes(ImageRef, image).then(() => {
            alert("Image Uploaded");
            getDownloadURL(ImageRef).then((url) => {
                const data = collection(database, 'UsersPost');
                addDoc(data, {
                    Username: userName,
                    ImageUrl: url,
                    Content: content.Content,
                    UserId: userId
                }).then(() => {
                    console.log(url);
                    navigate('/')
                })
            }).catch((err) => {
                console.log("Url nhi mila kuch dikkat hai");
                console.log(err.message);
            })
        }).catch((err) => {
            console.log(err.message);
        })



    }
    return (
        <div>
            <input type="text" placeholder='Enter your Content' onChange={(e) => setContent((prev) => ({ ...prev, Content: e.target.value }))} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleSubmit}>Post</button>


        </div>
    )
}

export default BlogPost
