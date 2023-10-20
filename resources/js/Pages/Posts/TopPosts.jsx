import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import FetchPosts from "../API/FetchPosts";
import Post from "./Post";

const TopPosts = (tags) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        FetchPosts("post.top", null, setPosts, null, null)
    }, []);

    return posts.map((post, index) => (
        <Post key={post.id} post={post} tags={tags} />
    ));
};

export default TopPosts;
