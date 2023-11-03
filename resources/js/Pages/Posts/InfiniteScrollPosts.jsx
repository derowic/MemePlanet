import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UploadPost from "./UploadPost";
import Post from "./Post";
import DefaultButton from "../BasicElements/DefaultButton";
import { useTranslation } from "react-i18next";
import CheckPermission from "../API/CheckPermission";

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
    const [chosedCategory, setChosedCategory] = useState(0);

    useEffect(() => {
        setChosedCategory(chosenCategory);
        fetchPosts();
    }, [chosenCategory, categories, tags]);

    return (
        <div>
            <div className="p-4 ">
                To hide:
                <DefaultButton onClick={refreshPosts} text={"Refresh"} />
                {CheckPermission("post.create") && (
                    <UploadPost
                        fetchPosts={refreshPosts}
                        categories={categories}
                        tags={tags}
                    />
                )}
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
                                    showOptions={true}
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
