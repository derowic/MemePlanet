import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from '@/Components/Notification';
import '../styles.css'; 

const SendComment = async (postId,text,parentId) => {
   
    try {
        const response = await axios.post('/addComment', {
            post: postId,
            parent_comment: parentId,
            text:text
        });

    } 
    catch (error) 
    {
        Notification(error.response.data.msg);
        console.error('SendComment error: ', error);
    }
    
};
export default SendComment;