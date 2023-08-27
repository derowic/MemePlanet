import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer } from '@mui/material';
import Comment from './Comment';
import '../styles.css'; // Importuj plik ze stylami

function CommentSection({ postId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [isCommentVisible, setIsCommentVisible] = useState(true);
    const [usedComments, setUsedComments] = useState([]);

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

    return (
        <div>
            <Button onClick={togglePanel}>
                <div className="text-white">Comment Section</div>
            </Button>
            <Drawer anchor="bottom" open={isOpen} onClose={togglePanel}>
                <div className="panel-content">
                    Dodatkowy panel
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

                    {comments.map(comment => (
                        
                        <Comment 
                            key={comment.id} 
                            usedComments={usedComments} 
                            comment={comment} 
                            allComments={comments} 
                            post={postId} 
                            parentId={comment.id} />
                    ))}

                </div>
            </Drawer>
        </div>
    );
}

export default CommentSection;
