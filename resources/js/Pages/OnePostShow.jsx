import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Like from "./Likes/Like";
import Heart from "./Posts/Fav";
import Tags from "./Tags/Tags";
import axios from "axios";
import Comment from "./Comments/Comment";
import CommentInput from "./Comments/CommentInput";
import SendComment from "./Comments/SendComment";
import Notify from "@/Components/Notify";
import FetchIndex from "@/Pages/API/FetchIndex";
import { ToastContainer } from "react-toastify";

export default function OnePostShow({ post, tags }) {
    const [comments, setComments] = useState([]);
    const [usedComments, setUsedComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            let params = { id: post.id };
            let t = await FetchIndex("comment.index", params);
            setComments(t);
        } catch (error) {
            console.error("CommentSection -> fetchComments error: ", error);
        } finally {
            setUsedComments([]);
        }
    };

    const updateCommentSection = async () => {
        setUsedComments([]);
        setComments([]);
        await fetchComments();
    };

    const handleSubmitComment = async (
        commentText,
        postId,
        parentCommentId,
        fetchComments,
    ) => {
        if (commentText != "") {
            await SendComment(postId, commentText, parentCommentId);
            addComment(commentText);
        } else {
            Notify("Comment filed is empty, write something");
        }
    };

    const addComment = (commentText) => {
        const divElement0 = document.createElement("div");
        divElement0.className =
            "mt-10 mb-10 ml-5 bg-[#333333] border-l-2 border-white-400 p-4";

        const divElement = document.createElement("div");
        divElement.className = "ml-5 mb-2 bg-[#333333] sm:rounded-lg p-4";

        const divElement2 = document.createElement("div");
        divElement2.textContent = "user: "; //+ userData.name;
        divElement.appendChild(divElement2);

        const divElement4 = document.createElement("div");
        divElement4.textContent = "koemntarz: " + commentText;
        divElement.appendChild(divElement4);

        const element = document.getElementById("comments");
        divElement0.appendChild(divElement);
        element.appendChild(divElement0);
    };

    return (
        <AuthenticatedLayout>
            <ToastContainer />

            <div className="bg-[#333] text-white">
                <div className="m-auto text-white w-3/4 ">
                    <div className="p-4 ">
                        <h3 className="text-left font-semibold mb-2">
                            {post.id} {post.title}
                        </h3>
                        <div className="text-left text-xs mb-2">
                            {post.user.name}
                        </div>
                        <div className="text-left text-xs ">
                            {post.category.text}
                        </div>
                        <Tags post={post} tags={tags} />
                        <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">
                            {post.text}
                        </div>
                        <div className="flex flex-col items-center justify-end mt-2">
                            <img
                                src={"/images/" + post.path_to_image}
                                alt="Opis obrazka"
                                className="w-full"
                            ></img>
                            <div className="flex">
                                <div className="flex">
                                    <Like
                                        elementId={post.id}
                                        elementType={"post"}
                                        likes={post.likes}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-white ">
                        <div className="flex items-center justify-center ">
                            <div className="text-center text-lg ">Comments</div>
                        </div>

                        <CommentInput
                            onSubmit={(commentText) =>
                                handleSubmitComment(
                                    commentText,
                                    post.id,
                                    0,
                                    fetchComments,
                                )
                            }
                            post={post.id}
                        />
                        <div
                            id="comments"
                            className="bg-[#333333] dark:bg-white-700 "
                        >
                            {comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    usedComments={usedComments}
                                    comment={comment}
                                    allComments={comments}
                                    post={post.id}
                                    parentId={comment.id}
                                    fetchComments={updateCommentSection}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="border-b text-center text-2xl font-bold">
                        Comments end
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
