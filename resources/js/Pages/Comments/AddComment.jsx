import React from "react";

const AddComment = (
    text,
    author,
    position,
    parent_comment_id,
    comments,
    setComments,
) => {
    const newComment = {
        id: 0,
        text: text,
        parent_comment: {
            id: parent_comment_id,
        },
        likes: 0,
        user: author,
    };
    const copy = [...prevComments];
    setComments((prevComments) => {
        return copy.splice(position, 0, newComment);
    });
};

export default AddComment;
