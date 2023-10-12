import React, { useState } from "react";
import Like from "../Likes/Like";
import CommentSection from "../Comments/CommentSection";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav";
import Img from "./Img";

function Post({ show, post, tags, userData, favs }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showFull, setShowFull] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="m-auto border-t py-2 w-full">
            <h3 className="text-left font-semibold mb-2 w-full">
                {post.id} {post.title}
            </h3>
            <div className="text-left text-xs mb-2">{post.user.name}</div>
            <div className="text-left text-xs ">{post.category.name}</div>
            <Tags post={post} tags={tags} />
            <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">
                {post.text}
            </div>
            <Img path={post.path_to_image} togglePanel={togglePanel}/>

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
                </div>

                {/*{userData.id != post.user.id && (
                        <div className="flex">
                            <Like
                                elementId={post.id}
                                elementType={"post"}
                                likes={post.likes}
                            />
                        </div>
                    )} */}
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
                    favs={favs}
                    togglePanel={togglePanel}
                />
            </Drawer>
        </div>
    );
}

export default Post;
