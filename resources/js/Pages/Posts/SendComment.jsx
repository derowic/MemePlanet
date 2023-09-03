import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles.css'; 

const SendComment = async (postId,text,parentId) => {
    console.log("id posta ",postId," parent id: ",parentId );
    try {
        const response = await axios.post('/api/addComment', {
            post: postId,
            parent_comment: parentId,
            text:text
        });

    } 
    catch (error) 
    {
        console.error('SendComment error: ', error);
    }
    
};
export default SendComment;