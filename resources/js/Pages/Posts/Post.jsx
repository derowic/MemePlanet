import React, { useState, useEffect } from "react";
import Like from "./Likes/Like";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav/Fav";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import AdminPostsFuncs from "../AdminAndModeratorFunctions/SendPostToMainPage";
import ReportDialog from "./Reports/ReportDialog";
import ReportListDialog from "../AdminPanel/ReportListDialog";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import BanDialog from "../AdminPanel/BanDialog";
import CheckRole from "../API/CheckRole";
import LogedIn from "../API/LogedIn";
import UnHide from "../AdminAndModeratorFunctions/UnHide";
import PostAdminView from "./PostAdminView";
import PostModeratorView from "./PostModeratorView";
import PostUserView from "./PostUserView";
import PostData from "./PostData";

function Post({ post, tags, showOptions, translation, translationCategory, translationTag}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loadComments, setLoadComments] = useState(false);
    const loadCommentsFunc = () => {
        setLoadComments(true);
    };

    useEffect(() => {
    }, [post, post.status]);

    return (
        <>
            {CheckRole("admin") ? (
                <PostAdminView
                    post={post}
                    tags={tags}
                    showOptions={showOptions}
                    translation={translation}
                    translationCategory={translationCategory}
                    translationTag={translationTag}
                />
            ) : (
                <>
                    {CheckRole("moderator") ? (
                        <PostModeratorView
                            post={post}
                            tags={tags}
                            showOptions={showOptions}
                            translation={translation}
                            translationCategory={translationCategory}
                            translationTag={translationTag}
                        />
                    ) : (
                        <>
                            {CheckRole("user") ? (
                                <PostUserView
                                    post={post}
                                    tags={tags}
                                    showOptions={showOptions}
                                    translation={translation}
                                    translationCategory={translationCategory}
                                    translationTag={translationTag}
                                />
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
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Post;
