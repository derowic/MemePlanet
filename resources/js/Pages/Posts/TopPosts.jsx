import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import axios from "axios";
import Notification from "@/Components/Notify";
import "../i18n";
import FetchIndex from "@/Components/FetchIndex";
import Post from "./Post";

const TopPosts = (tags) => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            let t = await FetchIndex("post.top", null);
            if (t != undefined) {
                setPosts((prevPosts) => [...prevPosts, ...t]);
            }
        } catch (error) {
            Notification(error.response);
            console.error("TopPosts -> fetchPosts error: ", error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    return posts.map((post, index) => (
        <Post key={post.id} post={post} tags={tags}  />
    ));
};

export default TopPosts;
