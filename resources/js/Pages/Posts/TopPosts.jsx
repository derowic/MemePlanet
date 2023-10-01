import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import axios from "axios";
import Notification from "@/Components/Notification";
import "../i18n";

const TopPosts = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await axios.post(`/getTopPosts`);
            setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        } catch (error) {
            Notification(error.response);
            console.error("TopPosts -> fetchPosts error: ", error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    return posts.map((post, index) => (
        <div
            key={post.id}
            className="w-full flex bg-[#333333]  overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]"
        >
            <div className="m-auto">
                <h3 className="text-left font-semibold mb-2">{post.title}</h3>
                <div className="text-left text-xs mb-2">{post.user.name}</div>
                <div className="text-left text-xs ">{post.category.text}</div>
                <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">
                    {post.text}
                </div>
                <div className="flex flex-col items-center justify-end mt-2">
                    <img
                        src={"/images/" + post.path_to_image}
                        alt="Opis obrazka"
                        className="w-full h-full"
                    ></img>
                </div>
            </div>
        </div>
    ));
};

export default TopPosts;
