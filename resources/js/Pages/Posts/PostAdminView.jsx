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

function PostAdminView({ post, tags, showOptions, setPosts }) {
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

    const setAsMainPagePost = () => {
        post.status = "main page";
        setMainPage(!mainPage)
    };

    const deletePost = () =>
    {
        setPostDeleted(!postDeleted);
        setHide(false);
        setMainPage(false);
        //setPosts(selectedCategories.filter((id) => id !== tmp) )
    }


    useEffect(() => {
        if(post.status == "main page")
        {
            setMainPage(true);
        }
        else if(post.status == "delted")
        {
            setPostDeleted(true);
        }
        //console.log(post.status);
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
                        { hide &&
                            <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                                <UnHide post={post} hide={hideFunc} />
                            </div>
                        }
                        { postDeleted &&
                            <div className="rounded-lg p-4 border border-red-700 hover:border-meme_violet m-2">
                                <RestorePost post={post} restore={deletePost} />
                            </div>
                        }
                        </>
                    ) : (
                        <div className={`rounded-lg p-4 border ${mainPage === true ? 'border-green-400' : 'border-[#333]'} hover:border-meme_violet m-2`}>
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
                                        <SendPostToMainPage
                                            setAsMainPagePost={setAsMainPagePost}
                                            post={post}
                                            mainPage={mainPage}
                                        />
                                        <HidePost
                                            post={post}
                                            hide={hideFunc}
                                        />
                                        <DeletePost
                                            post={post}
                                            postDeleted={postDeleted}
                                            deletePost={deletePost}
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

export default PostAdminView;
