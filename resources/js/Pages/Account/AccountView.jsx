import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Drawer } from "@mui/material";
import Comment from "../Comments/Comment";
import CommentInput from "../Comments/CommentInput";
import SendComment from "../Comments/SendComment";
import Notification from "@/Components/Notification";
import { userData } from "../GlobalData.js";
import InfiniteScrollPosts from "../Posts/InfiniteScrollPosts";
import CategoryList from "../Categories/CategoryList";
import FetchIndex from "@/Components/FetchIndex";

function AccountView({ categoryId, categories, tags }) {
    const [isOpenPosts, setIsOpenPosts] = useState(true);

    const togglePanelPosts = () => {
        setIsOpenPosts(!isOpenPosts);
    };

    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await FetchIndex("account.index", null);
            console.log('posts');
            setPosts((prevPosts) => [...prevPosts, ...response]);
        } catch (error) {
            console.error("InfiniteScrollPosts -> fetchPosts error: ", error);
        }
    };

    useEffect(() => {}, []);

    return (
        <div>
            <Button onClick={togglePanelPosts}>
                <div className="text-white">My Posts</div>
            </Button>

            <Button onClick={togglePanelPosts}>
                <div className="text-white">Favourites</div>
            </Button>

            <div className="w-full p-4 text-center sm:rounded-lg">
                <h2 className="bg-[#333333] p-4 mb-2 rounded-lg">
                    Meme Planet <br /> memes and news
                    <hr />
                </h2>


                <InfiniteScrollPosts
                                chosenCategory={categoryId}
                                posts={posts}
                                fetchPosts={fetchPosts}
                                categories={categories}
                                tags={tags}
                            />
            </div>
        </div>
    );
}

export default AccountView;
