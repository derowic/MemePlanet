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
import SendPostToMainPage from "../AdminAndModeratorFunctions/SendPostToMainPage";
import HidePost from "../AdminAndModeratorFunctions/HidePost";
import DeletePost from "../AdminAndModeratorFunctions/DeletePost";
import RestorePost from "../AdminAndModeratorFunctions/RestorePost";
import TakeFromMainPage from "../AdminAndModeratorFunctions/TakeFromMainPage";

function PostAdminView({ post, tags, showOptions, setPosts, translation }) {
    const user = usePage().props.auth.user;
    const [showFull, setShowFull] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loadComments, setLoadComments] = useState(false);
    const [hide, setHide] = useState(false);
    const [mainPage, setMainPage] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);

    const loadCommentsFunc = () => {
        setLoadComments(true);
    };

    const hideFunc = () => {
        post.status = "hide";
        setHide(!hide);
    };

    const setAsMainPagePost = (tmp) => {
        if (tmp == false) {
            post.status = "waiting";
        } else if (tmp == true) {
            post.status = "main page";
        }
        setMainPage(tmp);
    };

    const deletePost = () => {
        setPostDeleted(!postDeleted);
        setHide(false);
        setMainPage(false);
    };

    useEffect(() => {
        if (post.status == "main page") {
            setMainPage(true);
        } else if (post.status == "deleted") {
            setPostDeleted(true);
        } else if (post.status == "hide") {
            setHide(true);
        }
    }, [post, post.status]);

    return (
        <>
            {(CheckRole("admin") ||
                ((CheckRole("user") || LogedIn() == false) &&
                    post.status != "hide") ||
                CheckRole("moderator")) && (
                <>
                    {hide || postDeleted ? (
                        <>
                            {hide && (
                                <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                                    <Img
                                        post={post}
                                        loadCommentsFunc={loadCommentsFunc}
                                        setIsOpen={setIsOpen}
                                    />

                                    <UnHide
                                        post={post}
                                        hide={hideFunc}
                                        translation={translation}
                                    />
                                </div>
                            )}
                            {postDeleted && (
                                <div className="rounded-lg p-4 border border-red-700 hover:border-meme_violet m-2">
                                    <Img
                                        post={post}
                                        loadCommentsFunc={loadCommentsFunc}
                                        setIsOpen={setIsOpen}
                                    />
                                    <RestorePost
                                        post={post}
                                        restore={deletePost}
                                        translation={translation}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div
                            className={`rounded-lg p-4 border ${
                                mainPage === true
                                    ? "border-green-400"
                                    : "border-[#333]"
                            } hover:border-meme_violet m-2`}
                        >
                            <h3 className="text-left font-semibold mb-2 w-full">
                                {post.title}
                            </h3>
                            <div className="text-left text-xs mb-2">
                                {isNaN(post.user) ? post.user.name : "unknown"}
                            </div>
                            <div className="text-left text-xs ">
                                {post.category && post.category.name}
                            </div>
                            <Tags
                                post={post}
                                tags={tags}
                                translation={translation}
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
                            {user &&
                                (user.roles.some(
                                    (role) => role.name === "admin",
                                ) ||
                                    user.roles.some(
                                        (role) => role.name === "moderator",
                                    )) && (
                                    <>
                                        <SendPostToMainPage
                                            setAsMainPagePost={
                                                setAsMainPagePost
                                            }
                                            post={post}
                                            mainPage={mainPage}
                                            translation={translation}
                                        />
                                        <HidePost
                                            post={post}
                                            hide={hideFunc}
                                            translation={translation}
                                        />
                                        <DeletePost
                                            post={post}
                                            postDeleted={postDeleted}
                                            deletePost={deletePost}
                                            translation={translation}
                                        />
                                        <div className="flex text-center justify-center">
                                            <ReportListDialog
                                                post={post}
                                                defaultButtonText={translation.t(
                                                    "Show reports",
                                                )}
                                                modalTitle={translation.t(
                                                    "Reports",
                                                )}
                                                modalDescription={""}
                                                translation={translation}
                                            />
                                            <BanDialog
                                                user={post.user}
                                                defaultButtonText={translation.t(
                                                    "Ban",
                                                )}
                                                modalTitle={""}
                                                modalDescription={translation.t(
                                                    "Select ban reason and length",
                                                )}
                                                translation={translation}
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

export default PostAdminView;
