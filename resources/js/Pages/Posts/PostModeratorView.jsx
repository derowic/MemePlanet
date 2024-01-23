import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import UnHide from "../AdminAndModeratorFunctions/UnHide";
import HidePost from "../AdminAndModeratorFunctions/HidePost";
import PostData from "./PostData";

function PostModeratorView({ post, tags, showOptions, translation, translationCategory, translationTag }) {
    const user = usePage().props.auth.user;
    const [showFull, setShowFull] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loadComments, setLoadComments] = useState(false);
    const [hide, setHide] = useState(false);

    const loadCommentsFunc = () => {
        setLoadComments(true);
    };

    const hideFunc = () => {
        post.status = "hide";
        setHide(!hide);
    };

    useEffect(() => {
    }, [post, post.status]);

    return (
        <>
            {hide ? (
                <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                    <PostData
                        post={post}
                        tags={tags}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        loadComments={loadComments}
                        loadCommentsFunc={loadCommentsFunc}
                        setLoadComments={setLoadComments}
                        translation={translation}
                        translationCategory={translationCategory}
                        translationTag={translationTag}
                        showOptions={showOptions}
                    />
                    <UnHide
                        post={post}
                        hide={hideFunc}
                        translation={translation}
                    />
                </div>
            ) : (
                <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                    <PostData
                        post={post}
                        tags={tags}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        loadComments={loadComments}
                        loadCommentsFunc={loadCommentsFunc}
                        setLoadComments={setLoadComments}
                        translation={translation}
                        translationCategory={translationCategory}
                        translationTag={translationTag}
                        showOptions={showOptions}
                    />

                    {user &&
                        (user.roles.some((role) => role.name === "admin") ||
                            user.roles.some(
                                (role) => role.name === "moderator",
                            )) && (
                            <>
                                <HidePost
                                    post={post}
                                    hide={hideFunc}
                                    translation={translation}
                                />

                                <div className="flex text-center justify-center"></div>
                            </>
                        )}
                </div>
            )}
        </>
    );
}

export default PostModeratorView;
