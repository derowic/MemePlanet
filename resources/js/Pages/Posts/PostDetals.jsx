import React, { useState, useEffect } from "react";
import Comment from "../Comments/Comment";
import CommentInput from "../Comments/CommentInput";
import SendComment from "../Comments/SendComment";
import Notify from "@/Components/Notify";
import FetchComments from "../API/FetchComments";
import { Drawer } from "@mui/material";
import { usePage } from "@inertiajs/react";
import Img from "./Img";

function PostDetals({
    post,
    isOpen,
    setIsOpen,
    loadComments,
    setLoadComments,
}) {
    const [comments, setComments] = useState([]);
    const [usedComments, setUsedComments] = useState([]);
    const user = usePage().props.auth.user;

    useEffect(() => {
        if (loadComments == true) {
            togglePanel();
        }
    }, [loadComments]);

    const fetchComments = async () => {
        FetchComments(post.id, "comment.index", setComments);
    };

    const togglePanel = () => {
        setUsedComments([]);
        setComments([]);
        setIsOpen(!isOpen);
        if (isOpen == false) {
            //console.log("open");
            fetchComments();
        }
        setLoadComments(false);
    };

    const updateCommentSection = async () => {
        setUsedComments([]);
        setComments([]);
        await fetchComments();
    };

    const handleSubmitComment = async (commentText, parentCommentId) => {
        if (commentText != "") {
            await SendComment(post.id, commentText, parentCommentId);
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
        divElement2.textContent = "user: " + user.name;
        divElement.appendChild(divElement2);

        const divElement4 = document.createElement("div");
        divElement4.textContent = "koemntarz: " + commentText;
        divElement.appendChild(divElement4);

        const element = document.getElementById("comments");
        divElement0.appendChild(divElement);
        element.appendChild(divElement0);
    };

    return (
        <div>
            <button onClick={togglePanel} className="flex m-auto h-full ">
                <img
                    src="/comment.png"
                    alt="Twoja Ikona"
                    className="w-10 mt-2"
                />
                <div className="flex-1 flex items-center h-full">
                    <p className="ml-2 text-white text-center">
                        Comment Section
                    </p>
                </div>
            </button>

            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={togglePanel}
                className="items-center justify-center "
            >
                <div className="bg-[#333333] text-white  h-full">
                    <div className="w-4/5 m-auto">
                        <div className="m-auto ">
                            <button
                                onClick={togglePanel}
                                className="sticky top-0 p-4 border rounded-lg m-2 bg-[#555]"
                            >
                                close
                            </button>
                            <Img
                                post={post}
                                loadCommentsFunc={null}
                            />
                        </div>

                        <div className="flex items-center justify-center bg-[#333] ">
                            <div className="text-center text-lg ">Comments</div>
                        </div>

                        <CommentInput
                            onSubmit={(commentText) =>
                                handleSubmitComment(commentText, 0)
                            }
                            post={post.id}
                        />

                        <div
                            id="comments"
                            className=""
                        >
                            {comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    usedComments={usedComments}
                                    comment={comment}
                                    allComments={comments}
                                    setComs={setComments}
                                    post={post.id}
                                    fetchComments={updateCommentSection}
                                    prevComment={null}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default PostDetals;
