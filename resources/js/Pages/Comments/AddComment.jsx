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
    /*
    let tab = [];
    tab =comments;
    tab[comments.length] = newComment;
    setComments([]);
    setComments(tab);*/
    /*
    const copy = [...prevComments];
    copy.splice(position, 0, newComment);
    */

    //setComments((prevComments) => [...prevComments, newComment]);
    const copy = [...prevComments];
    setComments((prevComments) => {
        return copy.splice(position, 0, newComment);
    });
};

/*
const AddComment = (id_element, commentText, replyToName) => {


    const divElement0 = document.createElement("div");
    divElement0.className =
        "mt-10 mb-10 ml-5 bg-meme_black border-l-2 border-white-400 p-4";

    const divElement = document.createElement("div");
    divElement.className = "ml-5 mb-2 bg-meme_black sm:rounded-lg p-4";

    const divElement2 = document.createElement("div");
    divElement2.textContent = "user: ";
    divElement.appendChild(divElement2);

    if (replyToName != null) {
        const divElement3 = document.createElement("div");
        divElement3.textContent = "reply to: " + replyToName;
        divElement.appendChild(divElement3);
    }

    const divElement4 = document.createElement("div");
    divElement4.textContent = "koemntarz: " + commentText;
    divElement.appendChild(divElement4);

    const element = document.getElementById(id_element);

    divElement0.appendChild(divElement);
    element.appendChild(divElement0);


    //------======================================



};
*/

export default AddComment;
