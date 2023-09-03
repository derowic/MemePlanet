import React, { useState } from 'react';
import CommentInput2 from './CommentInput';
import ReactQuill from 'react-quill';
import Like from './Like';
import SendComment from './SendComment';
import 'react-quill/dist/quill.snow.css';
import { userData } from "../GlobalData.js";

const Comment = ({usedComments, comment, allComments, post, parent_id, fetchComments }) => {

    const [comments, setComments] = useState([]);
    
    const unHide = () => {

        const element = document.getElementById(comment.id);
        element.hidden = !element.hidden;
    };

    const post2 = post;
 
    const getRepliesForComment = (comments, parent_id) => {
        return comments.filter(comment => comment.parent_comment === parent_id);
    };

    const replies = getRepliesForComment(allComments, comment.id);

    function checkId(id)
    {
        for (var i = 0; i < usedComments.length; i++) {
            if (usedComments[i] === id) {
            return true;
            }
        }
        return false; 
    }

    if (checkId(comment.id)) {
        {replies.length > 0 && (
                
            <div className="replies ml-2">
                {replies.map(reply => (
                    <Comment key={reply.id} usedComments={usedComments}  comment={reply} allComments={allComments} post={post} parent_id={comment.id} fetchComments={fetchComments}/>
                
                ))}
            </div>
                )}

        return null;
    }
    
    usedComments.push(comment.id);

    const handleSubmitComment = async (commentText, postId, parentCommentId, fetchComments,replyToName) => {
       
        await SendComment(postId, commentText, parentCommentId);
        addComment(commentText,replyToName);

    };

    const addComment =(commentText,replyToName) =>
    {
        const divElement0 = document.createElement('div');
        divElement0.className = 'mt-10 mb-10 ml-5 bg-white dark:bg-white-700 border-l-2 border-white-400 p-4';
        
        const divElement = document.createElement('div');
        divElement.className = 'ml-5 mb-2 bg-white dark:bg-white-800 sm:rounded-lg p-4';

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
        
        divElement0.appendChild(divElement);
        element.appendChild(divElement0);

        unHide();
    }

    return (
        <div id={comment.id+"t"} className={" mt-10 mb-10 ml-5 bg-white dark:bg-white-700 border-l-2 border-white-400 p-4"}>

            
                <div className="ml-5 mb-2 bg-white dark:bg-white-800 sm:rounded-lg p-4" > 
                    <div className='flex '>
                        <div className='w-5/6'>
                            <div>user: {comment.user.name}</div>
                                {comment.reply_to && <div> reply to: {comment.reply_to.user.name}</div> }
                                komentarz: {comment.text}
                                <div className=''>
                                    <button onClick={unHide}>reply</button>
                                    <div id={comment.id} hidden>
                                        <CommentInput2 onSubmit={(commentText,post) => handleSubmitComment(commentText, post2, comment.id, fetchComments,comment.user.name)}  post={post}/>  
                                    </div> 
                            </div>
                        </div>
                        <div className='w-1/6'>
                            <div className="flex items-center justify-center">
                                <div className="text-center text-lg">
                                    <Like elementId={comment.id} elementType={"comment"} likes={comment.likes}/>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>     
            {replies.length > 0 && 
            (
                <div className="replies">
                    {replies.map(reply => (
                        <Comment key={reply.id} usedComments={usedComments}  comment={reply} allComments={allComments} post={post} parent_id={comment.id} fetchComments={fetchComments}/>
                    ))}
                </div>
            )}
            
        </div>
    );

};

export default Comment;