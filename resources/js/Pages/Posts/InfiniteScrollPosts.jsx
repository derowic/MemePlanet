import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UploadPost from "./UploadPost";
import { userData } from "../GlobalData.js";
import { OnePostViewData } from "../GlobalData.js";
import Post from "./Post";
import Button from "./Button";
import "../styles.css";
import { useTranslation } from "react-i18next";

const InfiniteScrollPosts = ({
    chosenCategory,
    posts,
    fetchPosts,
    categories,
    tags,
    refreshPosts,
}) => {
    const translation = useTranslation(["dashboard"]);
    const [favs, setFavs] = useState([]);
    const [page, setPage] = useState(1);
    const [auth, setAuth] = useState({ user: null });
    const [key, setKey] = useState(0);

    const [chosedCategory, setChosedCategory] = useState(0);

    /*
    const handleRefresh = () => {
        //setPosts([]);
        setPage(1);
        setFavs([]);
        fetchPosts();
    };
    */

    useEffect(() => {
        setChosedCategory(chosenCategory);
    }, [chosenCategory]);

    const isAdmin = auth.user && auth.user.roles.includes("admin");

    useEffect(() => {
        fetchPosts();
    }, [categories, tags]);

    return (
        <div>
            <div className="p-4 ">
                To hide:
                <Button func={refreshPosts} text={"Refresh"} />
                <UploadPost
                    fetchPosts={refreshPosts}
                    categories={categories}
                    tags={tags}
                />
            </div>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={true}
                loader={<p>{translation.t("loading...")}</p>}
                endMessage={<p>{translation.t("noMorePosts")}</p>}
            >
                {posts.map((post, index) => (
                    <div key={index}>
                        {(chosedCategory === 0 ||
                            chosedCategory === post.category.id) && (
                            <div className="w-full flex overflow-hidden shadow-sm  p-4 ">
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
