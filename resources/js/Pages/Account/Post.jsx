import React, { useState } from "react";
import Notification from "@/Components/Notification";
import { FaPlus, FaMinus, FaSadCry } from "react-icons/fa";
import Like from "./Like";
import Heart from "./Heart";
import CommentSection from "./CommentSection";
import Tags from "./Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";

function Post({ show, post, tags, userData, favs }) {
    const [isOpen, setIsOpen] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="m-auto">
            <h3 className="text-left font-semibold mb-2">
                {post.id} {post.title}
            </h3>
            <div className="text-left text-xs mb-2">{post.user.name}</div>
            <div className="text-left text-xs ">{post.category.text}</div>
            <Tags post={post} tags={tags} />
            <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">
                {post.text}
            </div>
            <div
                className="flex flex-col items-center justify-end mt-2"
                onClick={togglePanel}
            >
                <img
                    src={"/images/" + post.path_to_image}
                    alt="Opis obrazka"
                    className="w-full h-full"
                ></img>
                {show == true && <div></div>}
                <div className="flex">
                    {userData.id != post.user.id && (
                        <div className="flex">
                            <Like
                                elementId={post.id}
                                elementType={"post"}
                                likes={post.likes}
                            />
                            <Heart
                                postId={post.id}
                                fav={
                                    favs.find((fav) => fav == post.id) !==
                                    undefined
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <CommentSection postId={post.id} />
            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={togglePanel}
                className="items-center justify-center"
            >
                <PostDetals
                    post={post}
                    tags={tags}
                    userData={userData}
                    favs={favs}
                    togglePanel={togglePanel}
                />
            </Drawer>
        </div>
    );
}

export default Post;
