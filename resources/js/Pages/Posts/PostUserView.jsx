import React, { useState, useEffect } from "react";
import Like from "./Likes/Like";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav/Fav";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import AdminPostsFuncs from "../AdminAndModeratorFunctions/SendToMainPage";
import ReportDialog from "./Reports/ReportDialog";
import ReportListDialog from "../AdminPanel/ReportListDialog";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import BanDialog from "../AdminPanel/BanDialog";
import CheckRole from "../API/CheckRole";
import LogedIn from "../API/LogedIn";
import UnHide from "../AdminAndModeratorFunctions/UnHide";

function PostUserView({ post, tags, showOptions }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loadComments, setLoadComments] = useState(false);

    const loadCommentsFunc = () => {
        setLoadComments(true);
    };

    return (
        <>
            {post.status != "hide" &&
                <>
                    <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                        <h3 className="text-left font-semibold mb-2 w-full">
                            {post.id} {post.title}
                        </h3>
                        <div className="text-left text-xs mb-2">
                            {post.user.name}
                        </div>
                        <div className="text-left text-xs ">
                            {post.category.name}
                        </div>
                        <Tags post={post} tags={tags} />
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
                                />

                                <Fav
                                    postId={post.id}
                                    is_Fav={post.is_fav}
                                />

                                <ReportDialog
                                    post={post}
                                    defaultButtonText={"!"}
                                    modalTitle={""}
                                    modalDescription={
                                        "Select report reason"
                                    }
                                />

                                <PostDetals
                                    post={post}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    loadComments={loadComments}
                                    setLoadComments={setLoadComments}
                                />
                            </div>
                        )}
                    </div>
                </>
            }
        </>
    );
}

export default PostUserView;
