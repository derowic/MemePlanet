import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import Like from "../Likes/Like";
import Heart from "./Fav";
import UploadPost from "./UploadPost";
import Notification from "@/Components/Notification";
import CommentSection from "../Comments/CommentSection";
import { userData } from "../GlobalData.js";
import { OnePostViewData } from "../GlobalData.js";
import Post from "./Post";
import FetchIndex from "@/Components/FetchIndex";

import "../styles.css";
import "../i18n";

const InfiniteScrollPosts = ({
    chosenCategory,
    posts,
    fetchPosts,
    //fetchTags,
    categories,
    tags,
}) => {
    const { t, i18n } = useTranslation();

    const [favs, setFavs] = useState([]);
    const [page, setPage] = useState(1);
    const [auth, setAuth] = useState({ user: null });
    const [key, setKey] = useState(0);
    //const [tags, setTags] = useState([]);

    const [chosedCategory, setChosedCategory] = useState(0);

    const handleRefresh = () => {
        //setPosts([]);
        setPage(1);
        setFavs([]);
        fetchPosts();
    };

    useEffect(() => {
        setChosedCategory(chosenCategory);
    }, [chosenCategory]);

    const isAdmin = auth.user && auth.user.roles.includes("admin");

    const changeLanguageToPolish = () => {
        i18n.changeLanguage("pl");
    };

    const savePostId = (tmp) => {
        OnePostViewData.postId = tmp;
        //console.log(OnePostViewData.postId);
        route("OnePostView");
    };

    useEffect(() => {
        fetchPosts();
        //fetchTags();
        //console.log("infinite scrolls", categories);
        //console.log("infinite scrolls", tags);
    }, [categories, tags]);

    return (
        <div>
            <div className="bg-[#333333] rounded-lg p-4">
                <button
                    className="bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]"
                    onClick={handleRefresh}
                >
                    Odśwież
                </button>
                <UploadPost fetchPosts={handleRefresh} categories={categories} tags={tags} />
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
                        {(chosedCategory === 0 ||
                            chosedCategory === post.category.id) && (
                            <div className="w-full flex bg-[#333333] overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]">
                                <Post
                                    post={post}
                                    tags={tags}
                                    userData={userData}
                                    favs={favs}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollPosts;
