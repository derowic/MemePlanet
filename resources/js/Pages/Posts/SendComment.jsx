import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notify from './Notify';

import '../styles.css'; 

const SendComment = async (postId,text,parentId) => {
   
    try {
        const response = await axios.post('/api/addComment', {
            post: postId,
            parent_comment: parentId,
            text:text
        });

    } 
    catch (error) 
    {
        Notify(error.response.data.msg);
        console.error('SendComment error: ', error);
    }
    
};
export default SendComment;