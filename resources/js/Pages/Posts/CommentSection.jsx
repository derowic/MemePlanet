import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer } from '@mui/material';
import Comment from './Comment';
import CommentInput2 from './CommentInput';
import SendComment from './SendComment';
import { userData } from "../GlobalData.js";
import '../styles.css'; // Importuj plik ze stylami

/*
const sendComment = async (postId,text,parentId) => {
    console.log("id posta ",postId," parent id: ",parentId );
    try {
        const response = await axios.post('/api/addComment', {
            idPost: postId,
            idParentComment: parentId,
            text:text
        });
        console.log('Wiadomośc', response.data);
        
        // Obsłuż odpowiedź serwera
    } catch (error) {
        console.error('Błąd przesyłania danych:', error);
        // Obsłuż błędy
    }
    
};
*/

function CommentSection({ postId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [isCommentVisible, setIsCommentVisible] = useState(true);
    const [usedComments, setUsedComments] = useState([]);
    

    const handleCommentSubmit = (comment) => {
        setComments([...comments, comment]);
      };

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.post('/api/getComments', {
                id: postId
            });

            setComments(response.data.dane[0].comments);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally 
        {
            setUsedComments([]);
        }
    };

    const togglePanel = () => {
        
        /*
        console.log(isOpen,"open");
        if(isOpen == false)
        {
            fetchComments();
        }
        */
        setUsedComments([]);
        setIsOpen(!isOpen);

       
        
    };

    const updateCommentSection = async () =>
    {
        setUsedComments([]);
        setComments([]);
        await fetchComments();
       
        
    }

    const handleSubmitComment = async (commentText, postId, parentCommentId, fetchComments) => {
        // Tutaj możesz obsłużyć dodawanie komentarza, np. wysłać go na serwer
        console.log('Dodano komentarz:', commentText, " ", postId, "", parentCommentId);
        await SendComment(postId, commentText, parentCommentId);
        addComment(commentText);
        //fetchComments(); // Wywołanie funkcji pobierającej komentarze odświeży komentarz i pokaże na nowo 
    };

    const addComment =(commentText) =>
    {
        // Tworzenie elementu div
        //const divElement = document.createElement(comment.id+"t");

        const divElement0 = document.createElement('div');
        divElement0.className = 'mt-10 mb-10 ml-5 bg-white dark:bg-gray-700 border-l-2 border-gray-400 p-4';
        
        const divElement = document.createElement('div');
        // Ustawianie atrybutów, klas, treści, itp. (opcjonalne)
        divElement.className = 'ml-5 mb-2 bg-white dark:bg-gray-800 sm:rounded-lg p-4';
         // 
        const divElement2 = document.createElement('div');
        divElement2.textContent = "user: "+userData.name;
        divElement.appendChild(divElement2);

        const divElement4 = document.createElement('div');
        divElement4.textContent = "koemntarz: " +commentText;
        divElement.appendChild(divElement4);
        
        const element = document.getElementById("comments");
        
        // Dodawanie div do drzewa DOM
        divElement0.appendChild(divElement);
        element.appendChild(divElement0);

        //element.appendChild(<Like elementId={-1} elementType={"comment"} likes={0}/>);
        toggleRender();

        

        
    }

    return (
        <div>
            <Button onClick={togglePanel}>
                <div className="text-white">Comment Section</div>
            </Button>
            <Drawer anchor="bottom" open={isOpen} onClose={togglePanel}>
                <div className="panel-content bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 ">
                    Comments 
                    <CommentInput2 
                        onSubmit={
                            (commentText,post) => handleSubmitComment(commentText, postId, 0, fetchComments)}  
                        post={postId}
                    />
                    {/*isCommentVisible &&
                        comments.map(comment => (
                            <Comment
                                key={comment.id}
                                usedComments={usedComments} 
                                comment={comment}
                                allComments={comments}
                                post={postId}
                                parentId={comment.id}
                            />
                        ))*/}
                    <div id="comments">
                        {comments.map(comment => (
                            
                            <Comment 
                                key={comment.id} 
                                usedComments={usedComments} 
                                comment={comment} 
                                allComments={comments} 
                                post={postId} 
                                parentId={comment.id}
                                fetchComments={updateCommentSection}
                                />
                        ))}
                    </div>
                   

                </div>
            </Drawer>
        </div>
    );
}

export default CommentSection;
