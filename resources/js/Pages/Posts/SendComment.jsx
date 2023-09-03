import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles.css'; // Importuj plik ze stylami

const SendComment = async (postId,text,parentId) => {
    console.log("id posta ",postId," parent id: ",parentId );
    try {
        const response = await axios.post('/api/addComment', {
            post: postId,
            parent_comment: parentId,
            text:text
        });
        console.log('Wiadomośc', response.data);
        
        // Obsłuż odpowiedź serwera
    } catch (error) {
        console.error('Błąd przesyłania danych:', error);
        // Obsłuż błędy
    }
    
};
export default SendComment;