import React, { useState, useEffect } from "react";
import Like from "./Likes/Like";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav/Fav";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import AdminPostsFuncs from "../AdminAndModeratorFunctions/AdminPostsFuncs";
import ReportDialog from "./Reports/ReportDialog";
import ReportListDialog from "../AdminPanel/ReportListDialog";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import BanDialog from "../AdminPanel/BanDialog";
import CheckRole from "../API/CheckRole";
import LogedIn from "../API/LogedIn";
import UnHide from "../AdminAndModeratorFunctions/UnHide";

function Post({ post, tags, showOptions }) {
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
        //console.log(post.status);
    }, [post, post.status]);

    return (
        <>
            {(CheckRole("admin") ||
                ((CheckRole("user") || LogedIn() == false) &&
                    post.status != "hide") ||
                CheckRole("moderator")) && (
                <>
                    {hide ? (
                        <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                            <UnHide post={post} hide={hideFunc} />
                        </div>
                    ) : (
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
                            {user &&
                                (user.roles.some(
                                    (role) => role.name === "admin",
                                ) ||
                                    user.roles.some(
                                        (role) => role.name === "moderator",
                                    )) && (
                                    <>
                                        <AdminPostsFuncs
                                            post={post}
                                            hide={hideFunc}
                                        />
                                        <div className="flex text-center justify-center">
                                            <ReportListDialog
                                                post={post}
                                                defaultButtonText={
                                                    "Show reports"
                                                }
                                                modalTitle={"Reports"}
                                                modalDescription={
                                                    ""
                                                }
                                            />
                                            <BanDialog
                                                user={post.user}
                                                defaultButtonText={
                                                    "Ban this user"
                                                }
                                                modalTitle={""}
                                                modalDescription={
                                                    "Select ban reason and length"
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Post;
