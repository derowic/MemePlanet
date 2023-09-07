import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer } from '@mui/material';
import Comment from './Comment';
import CommentInput from './CommentInput';
import SendComment from './SendComment';
import Notification from '@/Components/Notification';
import { userData } from "../GlobalData.js";
import '../styles.css'; // Importuj plik ze stylami



const ShowOnePost = ({ postId }) => 
{
   
    const [post, setPost] = useState([]);
    const fetchPost = async () => {
        try {
            
            const response = await axios.post('/getOnePost', {
                postId: 20
            });
          
           
            setPost(response);
            console.log(post.data.posts[0].title);
          
            
        } catch (error) {
            
            Notification(error);
            console.error("ShowOnePost -> fetchComments error: ",error);

        }
    };

    useEffect(() => {
        
        fetchPost();
    }, []);


    return (
       
       <div>ff {post.data.posts[0].title}
            <img src={"/images/"+post.data.posts[0].path_to_image} alt="Opis obrazka"  className='w-full h-full'></img>
       </div>
      
                              
       
                   
                    
     
    );
};

export default ShowOnePost;
