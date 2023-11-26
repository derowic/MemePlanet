import React, { useState, useEffect } from "react";
import Comment from "../Comments/Comment";
import CommentInput from "../Comments/CommentInput";
import SendComment from "../Comments/SendComment";
import Notify from "@/Components/Notify";
import { Drawer } from "@mui/material";
import Img from "./Img";
import AxiosGet from "../API/AxiosGet";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchWithPagination from "../API/FetchWithPagination";
import Button from "../BasicElements/Button";

function PostDetals({
    post,
    isOpen,
    setIsOpen,
    loadComments,
    setLoadComments,
}) {
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
            // Filtruj nowo pobrane komentarze, usuwając te, które już istnieją wśród obecnych komentarzy
            const newComments = response.filter(
                (newComment) =>
                    !comments.some(
                        (existingComment) =>
                            existingComment.id === newComment.id,
                    ),
            );
            // Aktualizuj komentarze, dodając nowe komentarze
            setComments((prevData) => [...prevData, ...newComments]);
            // Zaktualizuj numer strony
            setPage(page + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const togglePanel = () => {
        setUsedComments([]);
        setComments([]);
        //setIsOpen(!isOpen);
        if (isOpen == false) {
            fetchMoreComments();
        }
        setLoadComments(false);
    };

    const closePanel = () => {
        setUsedComments([]);
        setComments([]);
        setIsOpen(!isOpen);
        setLoadComments(false);
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
        if (loadComments == true) {
            togglePanel();
        }
    }, [loadComments]);

    useEffect(() => {
        if (isOpen) {
            fetchMoreComments();
            const img = new Image();
            img.src = "/images/" + post.path_to_image;
            img.onload = () => {
                let height = img.height;
                if(height <  window.innerHeight/2)
                {
                    height = window.innerHeight/2;
                }
                setCustomHeight({ height: height + "px" });
            };
        }
        setLoadComments(false);
    }, [isOpen, post.path_to_image]);

    useEffect(() => {}, [post.path_to_image, post]);

    return (
        <div>
            <div className="flex m-auto h-full ">
                <img
                    src="/comment.png"
                    alt="Twoja Ikona"
                    className="w-10 mt-2"
                />
                <div className="flex-1 flex items-center h-full">
                    <p className="ml-2 text-white text-center">
                        {post.comment_count}
                    </p>
                </div>
            </div>

            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={closePanel}
                className="items-center justify-center "
            >
                <div className="bg-meme_black text-white ">
                    <button
                        onClick={closePanel}
                        className="sticky top-4 px-4 py-2 border hover:border-meme_black rounded-lg mx-4 bg-meme_black hover:bg-white text-white hover:text-black text-2xl"
                    >
                        X
                    </button>
                    <div className="w-full m-auto flex">
                        <div className="m-auto flex w-full">
                            <div className="w-1/2 flex items-center justify-center">
                                <div className="w-full justify-center p-4">
                                    <Img
                                        post={post}
                                        loadCommentsFunc={null}
                                        postDetailsView={true}
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            <div
                                className="w-1/2 flex flex-col m-2"
                                style={customHeight}
                            >
                                <div className="flex items-center justify-center bg-meme_black">
                                    <div className="text-center text-lg">
                                        Comments
                                    </div>
                                </div>

                                <CommentInput
                                    onSubmit={(commentText) =>
                                        handleSubmitComment(commentText, null)
                                    }
                                    post={post.id}
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
                                        />
                                    ))}
                                    <div className="w-full text-center">
                                        <Button
                                            onClick={() => fetchMoreComments()}
                                            text={"load more comments"}
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
        </div>
    );
}

export default PostDetals;
