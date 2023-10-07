import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import axios from "axios";
import Notification from "@/Components/Notification";
import "../i18n";
import FetchIndex from "@/Components/FetchIndex";
import Post from "./Post";

const TopPosts = (tags) => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            /*
            const response = await axios.post(`/getTopPosts`);
            setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
            */
            let t = await FetchIndex("post.top", null);
            //console.log(t);
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

    return posts.map((post, index) => <Post key={post.id} post={post} tags={tags} />);

};

export default TopPosts;
