import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer } from "@mui/material";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import SendComment from "./SendComment";
import Notify from "@/Components/Notify";
import { userData } from "../GlobalData.js";
import FetchIndex from "@/Pages/API/FetchIndex";
import FetchComments from "../API/FetchComments";

function CommentSection({ postId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [usedComments, setUsedComments] = useState([]);

    useEffect(() => {}, []);

    const fetchComments = async () => {
        FetchComments(postId, "comment.index", null, setComments)
    };

    const togglePanel = () => {
        setUsedComments([]);
        setComments([]);
        setIsOpen(!isOpen);
        if (isOpen == false) {
            console.log("open");
            fetchComments();
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
        divElement2.textContent = "user: " + userData.name;
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
            <button onClick={togglePanel}>
                <div className="text-white">Comment Section</div>
            </button>

            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={togglePanel}
                className="items-center justify-center"
            >
                <div
                    className="bg-[#333333] text-white "
                    style={{ maxHeight: "75vh", minHeight: "75vh" }}
                >
                    <div className="flex items-center justify-center ">
                        <div className="text-center text-lg ">Comments</div>
                    </div>

                    <CommentInput
                        onSubmit={(commentText) =>
                            handleSubmitComment(
                                commentText,
                                postId,
                                0,
                                fetchComments,
                            )
                        }
                        post={postId}
                    />
                    <div
                        id="comments"
                        className="bg-[#333333] dark:bg-white-700"
                    >
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                usedComments={usedComments}
                                comment={comment}
                                allComments={comments}
                                setComs={setComments}
                                post={postId}
                                fetchComments={updateCommentSection}
                                prevComment={null}
                            />
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default CommentSection;
