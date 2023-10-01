import React, { useState } from "react";
import CommentInput2 from "./CommentInput";
import ReactQuill from "react-quill";
import Like from "./Like";
import SendComment from "./SendComment";
//import AddComment from './AddComment';
import AddComment from "./AddComment";
import "react-quill/dist/quill.snow.css";
import { userData } from "../GlobalData.js";

const Comment = ({
    usedComments,
    comment,
    allComments,
    post,
    fetchComments,
}) => {
    //const [comments, setComments] = useState([]);
    const post2 = post;

    const unHide = () => {
        const element = document.getElementById(comment.id);
        element.hidden = !element.hidden;
    };

    const getRepliesForComment = (comments, parent_id) => {
        //console.log(parent_id);
        //console.log("comment ",comment.id);
        comments.forEach((element) => {
            if (element.parent_comment != undefined) {
                if (element.parent_comment.id === comment.id) {
                    console.log("comment ", element.parent_comment.id);
                }

                //console.log("comment ",element.parent_comment.id);
            }
        });
        let com = comment.id;
        return comments.filter(
            (comment) =>
                comment.parent_comment !== undefined &&
                comment.parent_comment !== null && // Dodaj to sprawdzenie
                comment.parent_comment.id === com,
        );
    };

    const replies = getRepliesForComment(allComments, comment.id);

    function checkId(id) {
        for (var i = 0; i < usedComments.length; i++) {
            if (usedComments[i] === id) {
                return true;
            }
        }
        return false;
    }

    if (checkId(comment.id)) {
        {
            replies.length > 0 && (
                <div className="replies ml-2">
                    {replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            usedComments={usedComments}
                            comment={reply}
                            allComments={allComments}
                            post={post}
                            parent_id={comment.id}
                            fetchComments={fetchComments}
                        />
                    ))}
                </div>
            );
        }

        return null;
    }

    usedComments.push(comment.id);

    const handleSubmitComment = async (
        commentText,
        postId,
        parentCommentId,
        fetchComments,
        replyToName,
    ) => {
        if (commentText != "") {
            await SendComment(postId, commentText, parentCommentId);
            AddComment(
                comment.id + "t",
                commentText,
                replyToName,
                userData.name,
            );
            unHide();
        }
    };

    return (
        <div
            id={comment.id + "t"}
            className={
                " mt-10 mb-10 ml-5 bg-[#333333] border-l-2 border-white-400 p-4"
            }
        >
            <div className="ml-5 mb-2 bg-[#333333]  sm:rounded-lg p-4">
                <div className="flex bg-[#333333] ">
                    <div className="w-5/6 bg-[#333333] ">
                        <div>user: {comment.user.name}</div>
                        {comment.reply_to && (
                            <div> reply to: {comment.reply_to.user.name}</div>
                        )}
                        <p className="w-full">komentarz: {comment.text}</p>
                        <div className="">
                            <button onClick={unHide}>reply</button>

                            <div id={comment.id} hidden>
                                <CommentInput2
                                    onSubmit={(commentText, post) =>
                                        handleSubmitComment(
                                            commentText,
                                            post2,
                                            comment.id,
                                            fetchComments,
                                            comment.user.name,
                                        )
                                    }
                                    post={post}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/6">
                        <div className="flex items-center justify-center">
                            <div className="text-center text-lg">
                                {userData.id != comment.user.id && (
                                    <Like
                                        elementId={comment.id}
                                        elementType={"comment"}
                                        likes={comment.likes}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {replies.length > 0 && (
                <div className="replies">
                    {replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            usedComments={usedComments}
                            comment={reply}
                            allComments={allComments}
                            post={post}
                            parent_id={comment.id}
                            fetchComments={fetchComments}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
