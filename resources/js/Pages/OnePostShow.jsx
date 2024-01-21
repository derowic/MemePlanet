import React, { useState, useEffect } from "react";
import Like from "./Posts/Likes/Like";
import Tags from "./Tags/Tags";
import Comment from "./Comments/Comment";
import CommentInput from "./Comments/CommentInput";
import SendComment from "./Comments/SendComment";
import Notify from "@/Components/Notify";
import { ToastContainer } from "react-toastify";
import AxiosGet from "./API/AxiosGet";
import { useTranslation } from "react-i18next";
import Fav from "./Posts/Fav/Fav";
import { Drawer } from "@mui/material";
import Img from "./Posts/Img";
import Button from "./BasicElements/Button";

export default function OnePostShow({ post, tags, isFav }) {
    const translation = useTranslation(["post"]);
    const [isOpen, SetIsOpen] = useState(true);
    const [comments, setComments] = useState([]);
    const [usedComments, setUsedComments] = useState([]);
    const [page, setPage] = useState(1);
    const [customHeight, setCustomHeight] = useState(null);

    const reLoadComments = async () => {
        AxiosGet(
            "comment.refresh",
            { page: page, id: post.id },
            null,
            setComments,
        );
    };

    const fetchMoreComments = async () => {
        try {
            const response = await AxiosGet(
                "comment.index",
                { page: page, id: post.id },
                null,
                null,
            );
            const newComments = response.filter(
                (newComment) =>
                    !comments.some(
                        (existingComment) =>
                            existingComment.id === newComment.id,
                    ),
            );
            setComments((prevData) => [...prevData, ...newComments]);
            setPage(page + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const togglePanel = () => {
        setUsedComments([]);
        setComments([]);
        if (isOpen == false) {
            fetchMoreComments();
        }
    };

    const closePanel = () => {
        setUsedComments([]);
        setComments([]);
        setIsOpen(!isOpen);

        setPage(1);
    };

    const updateCommentSection = async () => {
        setUsedComments([]);
        await reLoadComments();
    };

    const handleSubmitComment = async (commentText, parentCommentId) => {
        if (commentText != "") {
            let response = await SendComment(
                post.id,
                commentText,
                parentCommentId,
            );
            if (response) {
                setComments((prevData) => [...prevData, response]);
            } else {
                console.error(
                    "Invalid comment response or no comment returned.",
                );
            }
        } else {
            Notify("Comment filed is empty, write something");
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMoreComments();
            const img = new Image();
            img.src = "/images/" + post.path_to_image;
            img.onload = () => {
                let height = img.height;
                height = img.height * 0.2;
                if (height < window.innerHeight / 2) {
                    height = window.screen.height * 0.85;
                }
                height = window.innerHeight;

                setCustomHeight({ height: height + "px" });
            };
        }
    }, [isOpen, post.path_to_image]);

    useEffect(() => {}, [post.path_to_image, post]);

    return (
        <div>
            {customHeight ? (
                <Drawer
                    anchor="bottom"
                    open={isOpen}
                    onClose={closePanel}
                    className="items-center justify-center "
                >
                    <div className="bg-meme_black text-white ">
                        <div className="w-full m-auto flex">
                            <div className="m-auto flex w-full">
                                <div className="w-1/2 flex items-center justify-center">
                                    <div className="w-3/4  justify-center p-4">
                                        <Img
                                            post={post}
                                            loadCommentsFunc={null}
                                            postDetailsView={true}
                                        />
                                    </div>
                                </div>

                                <div
                                    className="w-1/2 flex flex-col m-2"
                                    style={customHeight}
                                >
                                    <div className="flex items-center justify-center bg-meme_black">
                                        <div className="text-center text-lg">
                                            {translation.t("Comments")}
                                        </div>
                                    </div>

                                    <CommentInput
                                        onSubmit={(commentText) =>
                                            handleSubmitComment(
                                                commentText,
                                                null,
                                            )
                                        }
                                        post={post.id}
                                        translation={translation}
                                    />

                                    <div
                                        id="comments"
                                        className="flex-1 overflow-y-auto "
                                    >
                                        {comments.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                usedComments={usedComments}
                                                comment={comment}
                                                allComments={comments}
                                                setComs={setComments}
                                                post={post.id}
                                                updateCommentSection={
                                                    updateCommentSection
                                                }
                                                prevComment={null}
                                                translation={translation}
                                            />
                                        ))}
                                        <div className="w-full text-center">
                                            <Button
                                                onClick={() =>
                                                    fetchMoreComments()
                                                }
                                                text={translation.t(
                                                    "load more comments",
                                                )}
                                                className={
                                                    "font-bold hover:bg-white hover:text-black m-auto p-2 text-center w-full text-white m-2"
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*
                    <div className="border-t-2 border-meme_violet mt-2 p-2 w-full text-4xl text-center">
                        SIMILAR POSTS
                    </div>
                    */}
                    </div>
                </Drawer>
            ) : (
                <div className="w-full text-center text-3xl m-auto text-white">
                    {translation.t("loading...")}
                </div>
            )}
        </div>
    );
}
