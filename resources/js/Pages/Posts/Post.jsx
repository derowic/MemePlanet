import React, { useState } from "react";
import Like from "./Likes/Like";
import CommentSection from "../EXPERIMENTAL/CommentSection";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav/Fav";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import AdminPostsFuncs from "../AdminAndModeratorFunctions/AdminPostsFuncs";
import ReportDialog from "./Reports/ReportDialog";
import ReportViewDialog from "../AdminPanel/ReportListDialog";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import BanDialog from "../AdminPanel/BanDialog";

function Post({ post, tags, showOptions }) {
    //console.log(post);

    const user = usePage().props.auth.user;
    //console.log(user );
    const [showFull, setShowFull] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loadComments, setLoadComments] = useState(false);
    //console.log(loadComments);
    const loadCommentsFunc = () => {
        setLoadComments(true);
        //console.log(loadComments);
    };

    return (
        <>
            {user.role === "user" && post.status === "hide" ? null : (
                <div className="m-auto border-t py-2 w-4/5">
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
                    <Img post={post} loadCommentsFunc={loadCommentsFunc} />

                    {showOptions && (
                        <div className="flex flex-wrap">
                            <Like
                                elementId={post.id}
                                elementType={"post"}
                                likes={post.likes}
                                is_liked={post.is_liked}
                            />

                            <Fav postId={post.id} is_Fav={post.is_fav} />

                            <ReportDialog
                                post={post}
                                defaultButtonText={"!"}
                                modalTitle={"Report"}
                                modalDescription={"Select report reason"}
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
                    {(user.roles.some((role) => role.name === "admin") ||user.roles.some((role) => role.name === "moderator")) && (
                        <>
                            <AdminPostsFuncs post={post} />
                            <ReportViewDialog
                                post={post}
                                defaultButtonText={"Show reports"}
                                modalTitle={"Reports"}
                                modalDescription={"This post reports list"}
                            />
                            <BanDialog
                                user={post.user}
                                defaultButtonText={"Ban this user"}
                                modalTitle={"Bans"}
                                modalDescription={
                                    "Select ban reason and length"
                                }
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Post;
