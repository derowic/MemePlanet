import React, { useState } from "react";
import Like from "./Likes/Like";
import CommentSection from "../Comments/CommentSection";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav/Fav";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import SetPostToMainPage from "../AdminAndModeratorFunctions/SetPostToMainPage";
import HidePost from "../AdminAndModeratorFunctions/HidePost";
import DeletePost from "../AdminAndModeratorFunctions/DeletePost";
import Report from "./Report";

function Post({ show, post, tags, userData, favs }) {
    const user = usePage().props.auth;
    const [isOpen, setIsOpen] = useState(false);
    const [showFull, setShowFull] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            {post.status != "hide" && (
                <div className="m-auto border-t py-2 w-3/5">
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
                    <Img path={post.path_to_image} togglePanel={togglePanel} />

                    {show == true && <div></div>}
                    <div className="flex">
                        <div className="flex m-auto">
                            <Like
                                elementId={post.id}
                                elementType={"post"}
                                likes={post.likes}
                                is_liked={post.is_liked}
                            />

                            <Fav postId={post.id} is_Fav={post.is_fav} />
                            <Report postId={post.id} />
                        </div>
                    </div>

                    {(user.role == "admin" || user.role == "moderator") && (
                        <div className="block">
                            <div className="w-full ">
                                <button
                                    className="p-3 rounded-lg bg-green-500 m-2"
                                    onClick={() => SetPostToMainPage(post.id)}
                                >
                                    Send to main page
                                </button>

                                <button
                                    className="p-3 rounded-lg bg-gray-500 m-2"
                                    onClick={() => HidePost(post.id)}
                                >
                                    Hide for the users
                                </button>

                                <button
                                    className="p-3 rounded-lg bg-red-500 m-2"
                                    onClick={() => DeletePost(post.id)}
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    )}
                    <CommentSection postId={post.id} />
                    {/**/}
                    <Drawer
                        anchor="bottom"
                        open={isOpen}
                        onClose={togglePanel}
                        className="items-center justify-center"
                    >
                        <PostDetals
                            post={post}
                            tags={tags}
                            favs={favs}
                            togglePanel={togglePanel}
                        />
                    </Drawer>
                    <button onClick={togglePanel}>
                        <div className="text-white">Comment Section</div>
                    </button>
                </div>
            )}
        </>
    );
}

export default Post;
