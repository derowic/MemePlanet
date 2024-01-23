import React, { useState, useEffect } from "react";
import Img from "./Img";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import Fav from "./Fav/Fav";
import ReportDialog from "./Reports/ReportDialog";
import Like from "./Likes/Like";

function PostData({
    post,
    tags,
    isOpen,
    setIsOpen,
    loadComments,
    loadCommentsFunc,
    showOptions,
    setLoadComments,
    translation,
    translationCategory,
    translationTag,
}) {
    useEffect(() => {

    }, [post.path_to_image, post]);

    return (
        <div>
            <h3 className="text-left font-semibold mb-2 w-full">
                {post.title}
            </h3>
            <div className="text-left text-xs mb-2">
                {isNaN(post.user) ? post.user.name : "unknown"}
            </div>
            <div className="text-left text-xs ">
                {post.category && translationCategory.t(post.category.name)}
            </div>
            <Tags
                post={post}
                tags={tags}
                translation={translationTag}
            />
            <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">
                {post.text}
            </div>
            <Img
                post={post}
                loadCommentsFunc={loadCommentsFunc}
                setIsOpen={setIsOpen}
            />

            {showOptions && (
                <div className="flex flex-wrap">
                    <Like
                        elementId={post.id}
                        elementType={"post"}
                        likes={post.likes}
                        is_liked={post.is_liked}
                        translation={translation}
                    />

                    <Fav
                        postId={post.id}
                        is_Fav={post.is_fav}
                        translation={translation}
                    />

                    <ReportDialog
                        post={post}
                        defaultButtonText={"!"}
                        modalTitle={""}
                        modalDescription={translation.t(
                            "Select report reason",
                        )}
                        translation={translation}
                    />

                    <PostDetals
                        post={post}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        loadComments={loadComments}
                        setLoadComments={setLoadComments}
                        translation={translation}
                    />
                </div>
            )}
        </div>
    );
}

export default PostData;
