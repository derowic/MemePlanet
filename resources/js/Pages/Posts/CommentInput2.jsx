import React, { useState } from 'react';

const CommentInput2 = ({ onSubmit, post }) => {
    const [commentText, setCommentText] = useState('');
    const [submittedComment, setSubmittedComment] = useState(null);

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = () => {
        console.log("id posta ",post);
        onSubmit(commentText);
        setSubmittedComment(commentText + post);
        setCommentText('');
    };

    return (
        <div>
            {submittedComment ? (
                <div>
                    Komentarz: {submittedComment}
                </div>
            ) : (
                <div>
                    <textarea
                        value={commentText}
                        onChange={handleInputChange}
                        placeholder="Napisz komentarz..."
                    />
                    <button onClick={handleSubmit}>Dodaj komentarz</button>
                </div>
            )}
        </div>
    );
};

export default CommentInput2;
