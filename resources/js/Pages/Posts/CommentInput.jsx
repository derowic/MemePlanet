import React, { useState } from 'react';

const CommentInput = ({ onSubmit, post }) => {
    const [commentText, setCommentText] = useState('');
    const [submittedComment, setSubmittedComment] = useState(null);

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = () => {
        console.log("id posta ",post);
        onSubmit(commentText);
        //setSubmittedComment(commentText + post);
        setCommentText('');
    };

    return (
        <div>
            {submittedComment ? (
                <div>
                    
                </div>
            ) : (
                <div className='flex justify-center' > 
                    <textarea
                        value={commentText}
                        onChange={handleInputChange}
                        placeholder="Write Comment..." 
                        className="ml-5 w-3/4 bg-white-500
                        text-black 
                        font-bold 
                        py-2 px-4 
                        rounded-lg 
                        border"
                    />
                    <button onClick={handleSubmit} 
                        className='
                            bg-white-500
                            hover:bg-white-600 
                            text-black 
                            font-bold 
                            py-2 px-4 
                            rounded-lg 
                            border 
                            border-white-600'>
                                Add comment
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentInput;
