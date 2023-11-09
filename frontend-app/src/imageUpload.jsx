import React, { useEffect, useState } from 'react';
import axios from "axios";

const ImageUpload = () => {
    const[image, setImage]=useState(null);
    const[getImg, setGetImg]=useState(null);
    const[res, setRes]=useState("");
    // const imagepath=axios.get("http://localhost:5000/uploads")
    useEffect(()=>{
        getImage();
    },[res])

    const fileUpload=(e)=>{
       console.log(e.target.files[0]); 
       setImage(e.target.files[0])
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData= new FormData()
        formData.append("image", image)

        // const result=axios.post("http://localhost:5000/upload",
        const result=axios.post("https://imageuploadfile.onrender.com/upload",
         formData,
        {
            headers:{"Content-Type":"multipart/form-data"}
        }
        )
        setRes(result)
    }

    const getImage=async()=>{
        // const result= await axios.get("http://localhost:5000/getimage")
        const result= await axios.get("https://imageuploadfile.onrender.com/getimage")
        console.log("result",result);
        console.log("image",result.data.data);
        setGetImg(result.data.data)
        console.log("getImg",getImg);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='file' accept='image/*' onChange={fileUpload} />
                <button type='submit'>submit</button>
            </form>

            {getImg==null?"": getImg.map((data)=>{
                // return <img  src={`${imagePath}/${data.image}`}                    
                return (
                // <img  src={`src/images/${data.image}`}                    
                // <img  src={`http://localhost:5000/uploads/${data.image}`}                    
                <img  src={`https://imageuploadfile.onrender.com/uploads/${data.image}`}                    
                    height={100} 
                    width={100} />  )
            })}
        </div>
    );
};

export default ImageUpload;