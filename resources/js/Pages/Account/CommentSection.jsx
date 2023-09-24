import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer } from '@mui/material';
import Comment from './Comment';
import CommentInput from './CommentInput';
import SendComment from './SendComment';
import Notification from '@/Components/Notification';
import { userData } from "../GlobalData.js";


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
            const response = await axios.post('/getComments', {
                id: postId
            });
            setComments(response.data.dane[0].comments);
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("CommentSection -> fetchComments error: ",error.response.data.msg);
        } finally
        {
            setUsedComments([]);
        }
    };

    const togglePanel = () => {
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
        if(commentText != "")
        {
            await SendComment(postId, commentText, parentCommentId);
            addComment(commentText);
        }
    };

    const addComment =(commentText) =>
    {
        const divElement0 = document.createElement('div');
        divElement0.className = 'mt-10 mb-10 ml-5 bg-[#333333] border-l-2 border-white-400 p-4';

        const divElement = document.createElement('div');
        divElement.className = 'ml-5 mb-2 bg-[#333333] sm:rounded-lg p-4';

        const divElement2 = document.createElement('div');
        divElement2.textContent = "user: "+userData.name;
        divElement.appendChild(divElement2);

        const divElement4 = document.createElement('div');
        divElement4.textContent = "koemntarz: " +commentText;
        divElement.appendChild(divElement4);

        const element = document.getElementById("comments");
        divElement0.appendChild(divElement);
        element.appendChild(divElement0);

    }

    return (
        <div>
            <Button onClick={togglePanel}>
                <div className="text-white">Comment Section</div>
            </Button>

            <Drawer anchor="bottom" open={isOpen} onClose={togglePanel} className='items-center justify-center' >

                <div className="bg-[#333333] text-white " style={{ maxHeight: '75vh', minHeight: '75vh' }} >
                    <div className="flex items-center justify-center ">
                        <div className="text-center text-lg ">Comments</div>

                    </div>

                    <CommentInput onSubmit={(commentText) => handleSubmitComment(commentText, postId, 0, fetchComments)}  post={postId}/>
                    <div id="comments" className='bg-[#333333] dark:bg-white-700'>
                        {comments.map(comment => (
                            <Comment key={comment.id} usedComments={usedComments} comment={comment} allComments={comments} post={postId} parentId={comment.id} fetchComments={updateCommentSection}/>
                        ))}
                    </div>

                </div>
            </Drawer>
        </div>
    );
}

export default CommentSection;
