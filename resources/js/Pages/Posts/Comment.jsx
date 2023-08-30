import React, { useState } from 'react';
//import CommentInput from './CommentInput';
import CommentInput2 from './CommentInput';
import ReactQuill from 'react-quill';
import Like from './Like';
import SendComment from './SendComment';
import 'react-quill/dist/quill.snow.css';
import { userData } from "../GlobalData.js";

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

//const usedComments = [];
//console.log("inicjalizajc tablicy komentarzy  ");

const Comment = ({usedComments, comment, allComments, post, parentId, fetchComments }) => {

    const [comments, setComments] = useState([]);
    
    const toggleRender = () => {
        //setShouldRender(!shouldRender);
        
        const element = document.getElementById(comment.id);
        element.hidden = !element.hidden;
        

    };


    const post2 = post;
 
    const getRepliesForComment = (comments, parentId) => {

        return comments.filter(comment => comment.idParentComment === parentId);
    };

    const replies = getRepliesForComment(allComments, comment.id);

    function checkId(id)
    {
        for (var i = 0; i < usedComments.length; i++) {
            //console.log("id ", id, "uzyte id komów ", usedComments[i]);
            //console.log("uzyte id komów ", usedComments.length);
            if (usedComments[i] === id) {
            return true;
            }
        }
        return false; // Zwracaj false po zakończeniu pętli
    }

    if (checkId(comment.id)) {
        {replies.length > 0 && (
                
            <div className="replies ml-2">
                {replies.map(reply => (
                <Comment key={reply.id} 
                    usedComments={usedComments}  
                    comment={reply} 
                    allComments={allComments} 
                    post={post} 
                    parentId={comment.id}
                    fetchComments={fetchComments}
                    />
                
                ))}
            </div>
                )}
            
            
        //tutaj nie pokazuje gdy ponownie renderuje chodzi o to ze sa zapisne i przy ponownym uzyciu jest 
        //traktowane jak juz wyswietlone
        return null; // Pomijaj renderowanie
    }
    
    

    usedComments.push(comment.id);

    const handleSubmitComment = async (commentText, postId, parentCommentId, fetchComments,replyToName) => {
        // Tutaj możesz obsłużyć dodawanie komentarza, np. wysłać go na serwer
        console.log('Dodano komentarz:', commentText, " ", postId, "", parentCommentId);
        await SendComment(postId, commentText, parentCommentId);
        addComment(commentText,replyToName);
        //fetchComments(); // Wywołanie funkcji pobierającej komentarze odświeży komentarz i pokaże na nowo 
    };

    const addComment =(commentText,replyToName) =>
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

        const divElement3 = document.createElement('div');
        divElement3.textContent = "reply to: "+replyToName;
        divElement.appendChild(divElement3);

        const divElement4 = document.createElement('div');
        divElement4.textContent = "koemntarz: " +commentText;
        divElement.appendChild(divElement4);
        
        const element = document.getElementById(comment.id+"t");
        
        // Dodawanie div do drzewa DOM
        divElement0.appendChild(divElement);
        element.appendChild(divElement0);

        //element.appendChild(<Like elementId={-1} elementType={"comment"} likes={0}/>);
        toggleRender();

        

        
    }
   
  


    return (
        <div id={comment.id+"t"} className={" mt-10 mb-10 ml-5 bg-white dark:bg-gray-700 border-l-2 border-gray-400 p-4"}>

            
                <div className="ml-5 mb-2 bg-white dark:bg-gray-800 sm:rounded-lg p-4" > 
                    <div>user: {comment.user.name}</div>
                    {comment.reply_to && <div> reply to: {comment.reply_to.user.name}</div> }
                    
                    komentarz: {comment.text}
                    {/*<button onClick={() => sendComment(post2,"","",parentId)}> rpeply</button> */}
                    {/*<CommentInput onSubmit={(commentText) => handleSubmitComment(commentText, post, parentId, fetchComments)} />*/}

                    <div>
                        <button onClick={toggleRender}>reply</button>
                        <div id={comment.id} hidden>
                            <CommentInput2 
                                onSubmit={
                                    (commentText,post) => handleSubmitComment(commentText, post2, comment.id, fetchComments,comment.user.name)}  
                                post={post}
                            />

                            
                        </div> 
                       
                    </div>  

                    <Like elementId={comment.id} elementType={"comment"} likes={comment.likes}/>
                </div> 
                
                
            
            {/*<CommentInput onSubmit={handleSubmitComment} />*/}
            {replies.length > 0 && (
                
            <div className="replies">
                {replies.map(reply => (
                    <Comment key={reply.id} 
                        usedComments={usedComments}  
                        comment={reply} 
                        allComments={allComments} 
                        post={post} parentId={comment.id} 
                        fetchComments={fetchComments}
                    />
                
                ))}
            </div>
            )}
            
        </div>
    );

};

export default Comment;