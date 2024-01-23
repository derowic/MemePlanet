import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import ReportListDialog from "../AdminPanel/ReportListDialog";
import BanDialog from "../AdminPanel/BanDialog";
import CheckRole from "../API/CheckRole";
import LogedIn from "../API/LogedIn";
import UnHide from "../AdminAndModeratorFunctions/UnHide";
import SendPostToMainPage from "../AdminAndModeratorFunctions/SendPostToMainPage";
import HidePost from "../AdminAndModeratorFunctions/HidePost";
import DeletePost from "../AdminAndModeratorFunctions/DeletePost";
import RestorePost from "../AdminAndModeratorFunctions/RestorePost";
import TakeFromMainPage from "../AdminAndModeratorFunctions/TakeFromMainPage";
import PostData from "./PostData";

function PostAdminView({ post, tags, showOptions, setPosts, translation, translationCategory, translationTag }) {
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
                            )}
                            {postDeleted && (
                                <div className="rounded-lg p-4 border border-red-700 hover:border-meme_violet m-2">
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
