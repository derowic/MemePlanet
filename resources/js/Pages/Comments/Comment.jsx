import React, { useState } from "react";
import CommentInput2 from "./CommentInput";
import Like from "../Posts/Likes/Like";
import SendComment from "./SendComment";
import AddComment from "./AddComment";
import "react-quill/dist/quill.snow.css";
import Notify from "@/Components/Notify";
import { usePage } from "@inertiajs/react";
import AxiosDelete from "../API/AxiosDelete";

const Comment = ({
    usedComments,
    comment,
    allComments,
    setCom,
    post,
    fetchComments,
    prevComment,
}) => {
    const user = usePage().props.auth;
    const post2 = post;

    const unHide = () => {
        const element = document.getElementById(comment.id);
        element.hidden = !element.hidden;
    };

    const handleSubmitComment = async (
        commentText,
        postId,
        parentCommentId,
        fetchComments,
        replyToName,
    ) => {
        if (commentText != "") {
            await SendComment(postId, commentText, parentCommentId);
            AddComment(comment.id + "t", commentText, replyToName, user.name);
            unHide();
        } else {
            Notify("Comment filed is empty, write something");
        }
    };

    const getRepliesForComment = (comments) => {
        let com = comment.id;
        return comments.filter(
            (comment) =>
                comment.parent_comment !== undefined &&
                comment.parent_comment !== null &&
                comment.parent_comment.id === com,
        );
    };

    const replies = getRepliesForComment(allComments, comment.id);
    usedComments.push(comment.id);

    return (
        <div>
            {(comment.parent_comment == null ||
                (prevComment != undefined &&
                    comment.parent_comment.id == prevComment.id)) && (
                <div
                    id={comment.id + "t"}
                    className={
                        " mt-10 mb-10 ml-5 bg-meme_black border-l-2 border-white-400 p-4"
                    }
                >
                    <div className="ml-5 mb-2 bg-meme_black  sm:rounded-lg p-4">
                        <div className="flex bg-meme_black ">
                            <div className="w-5/6 bg-mem_black ">
                                <div>
                                    <div>user: {comment.user.name}</div>
                                    {comment.reply_to && (
                                        <div>
                                            reply to:{" "}
                                            {comment.reply_to.user.name}
                                        </div>
                                    )}
                                    <p className="w-full">
                                        komentarz: {comment.text}
                                    </p>
                                </div>

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
                                        {user.id != comment.user.id && (
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
                        {(user.role == "admin" || user.role == "moderator") && (
                            <div className="block">
                                <div className="w-full ">
                                    <button
                                        className="p-3 rounded-lg bg-red-500 m-2"
                                        onClick={() =>
                                            AxiosDelete("comment.destroy", {
                                                comment: comment.id,
                                            })
                                        }
                                    >
                                        Delete Comment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {replies.length > 0 && (
                        <div className="replies">
                            {replies.map((reply) => (
                                <Comment
                                    key={reply.id}
                                    usedComments={usedComments}
                                    comment={reply}
                                    allComments={allComments}
                                    setCom={setCom}
                                    post={post}
                                    parent_id={comment.id}
                                    fetchComments={fetchComments}
                                    prevComment={comment}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
