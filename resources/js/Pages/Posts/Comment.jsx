import React, { useState } from 'react';
import CommentInput from './CommentInput';
import CommentInput2 from './CommentInput2';

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

//const usedComments = [];
//console.log("inicjalizajc tablicy komentarzy  ");

const Comment = ({usedComments, comment, allComments, post, parentId, fetchComments }) => {

    

    const toggleRender = () => {
        //setShouldRender(!shouldRender);
        const element = document.getElementById(comment.id);
        element.hidden = false;

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
        {/*replies.length > 0 && (
                
            <div className="replies">
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
                )*/}
            
            
        //tutaj nie pokazuje gdy ponownie renderuje chodzi o to ze sa zapisne i przy ponownym uzyciu jest 
        //traktowane jak juz wyswietlone
        return null; // Pomijaj renderowanie
    }
    
    

    usedComments.push(comment.id);

    const handleSubmitComment = async (commentText, postId, parentCommentId, fetchComments) => {
        // Tutaj możesz obsłużyć dodawanie komentarza, np. wysłać go na serwer
        console.log('Dodano komentarz:', commentText, " ", postId, "", parentCommentId);
        await sendComment(postId, commentText, parentCommentId);
        //fetchComments(); // Wywołanie funkcji pobierającej komentarze
    };
    

    return (
        <div className="comment mt-5">

            {comment.reply_to ? 
                <div className="ml-5 " > 
                    reply to: {comment.reply_to.user.name} 
                    user: {comment.user.name}  
                    komentarz: {comment.text}
                    <button onClick={() => sendComment(post2,"","",parentId)}> rpeply</button> 
                    {/*<CommentInput onSubmit={(commentText) => handleSubmitComment(commentText, post, parentId, fetchComments)} />*/}
                    
                   

                    

                    <div>
                        <button onClick={toggleRender}>Toggle Render</button>
                        <div id={comment.id} hidden>
                            This content will be conditionally rendered.
                            <CommentInput2 
                                onSubmit={
                                    (commentText,post) => handleSubmitComment(commentText, post2, parentId, fetchComments)}  
                                post={post}
                            />
                        </div> 
                       
                    </div>
                    
                    </div> 
                
                : 
                <div> 
                    user: {comment.user.name}  
                    komentarz: {comment.text}  
                    <button onClick={() => sendComment(post2,"","",parentId)}> rpeply</button> 
                    {/*<CommentInput onSubmit={(commentText) => handleSubmitComment(commentText, post, parentId, fetchComments)} />*/}
                    dodaj tutaj wyświetlanie od kogo i do kogo jest ot reply
                    <CommentInput2 
                        onSubmit={
                            (commentText,post) => handleSubmitComment(commentText, post2, parentId, fetchComments)}  
                        post={post}
                    />
                
                </div>}
            
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