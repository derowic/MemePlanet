import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import Like from "./Like";
import Heart from "./Heart";
import UploadPost from "./UploadPost";
import Notification from "@/Components/Notification";
import CommentSection from "./CommentSection";
import { userData } from "../GlobalData.js";
import { OnePostViewData } from "../GlobalData.js";
import Post from "./Post";

import "../styles.css";
import "../i18n";

const InfiniteScrollPosts = ({ chosenCategory }) => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [favs, setFavs] = useState([]);
    const [page, setPage] = useState(1);
    const [auth, setAuth] = useState({ user: null });
    const [key, setKey] = useState(0);
    const [tags, setTags] = useState([]);

    const [chosedCategory, setChosedCategory] = useState(0);

    const handleRefresh = () => {
        setPosts([]);
        setPage(1);
        setFavs([]);
        fetchPosts();
    };

    useEffect(() => {
        setChosedCategory(chosenCategory);
    }, [chosenCategory]);

    const fetchPosts = async () => {
        try {
            const response = await axios.post(`/account_index?page=${page}`);
            setPosts((prevPosts) => [
                ...prevPosts,
                ...response.data.posts.data,
            ]);
            setPage((prevPage) => prevPage + 1);
            setAuth({ user: response.data.user });
            setFavs((prevFavs) => [...prevFavs, ...response.data.fav]);
            userData.name = response.data.user.name;
            userData.id = response.data.user.id;
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("InfiniteScrollPosts -> fetchPosts error: ", error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axios.post(`/getTags`);
            setTags((prevTags) => [...prevTags, ...response.data.tags]);
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("InfiniteScrollPosts -> fetchTags error: ", error);
        }
    };

    const isAdmin = auth.user && auth.user.roles.includes("admin");

    const changeLanguageToPolish = () => {
        i18n.changeLanguage("pl");
    };

    const savePostId = (tmp) => {
        OnePostViewData.postId = tmp;
        console.log(OnePostViewData.postId);
        route("OnePostView");
    };

    useEffect(() => {
        fetchPosts();
        fetchTags();
    }, []);

    return (
        <div>
            <div className="bg-[#333333] rounded-lg p-4">
                <button
                    className="bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]"
                    onClick={handleRefresh}
                >
                    Odśwież
                </button>
                <UploadPost fetchPosts={handleRefresh} />
            </div>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={true}
                loader={<p>{t("loading")}</p>}
                endMessage={<p>{t("noMorePosts")}</p>}
            >
                {posts.map((post, index) => (
                    <div key={index}>
                        {chosedCategory != 0 ? (
                            <div key={post.id}>
                                {chosedCategory == post.category.id && (
                                    <div className="w-full flex bg-[#333333]  overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]">
                                        <Post
                                            post={post}
                                            tags={tags}
                                            userData={userData}
                                            favs={favs}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div key={post.id}>
                                hkuh
                                <div className="w-full flex bg-[#333333]  overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]">
                                    <Post
                                        post={post}
                                        tags={tags}
                                        userData={userData}
                                        favs={favs}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollPosts;
