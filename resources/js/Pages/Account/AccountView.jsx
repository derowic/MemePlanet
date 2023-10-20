import React, { useState, useEffect } from "react";
import InfiniteScrollPosts from "../Posts/InfiniteScrollPosts";
import FetchIndex from "@/Pages/API/FetchIndex";
import PostsTypeSelect from "../Posts/PostsTypeSelect";

function AccountView({ categoryId, categories, tags }) {
    const [selectedPostsType, setSelectedPostsType] = useState("My Posts");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [rout, setRout] = useState("account.index");

    const fetchPosts = async () => {
        let params = { page: page };
        const response = await FetchIndex(rout, params);
        setPosts((prevPosts) => [...prevPosts, ...response]);
        setPage(page + 1);
        console.log("fetchPosts try load new posts " + posts.length);
    };

    const refreshPosts = async () => {
        setPosts([]);
        const response = await FetchIndex(rout, null);
        setPosts((prevPosts) => [...prevPosts, ...response]);
    };

    useEffect(() => {}, []);

    return (
        <div>
            <PostsTypeSelect
                selected={selectedPostsType}
                setSelected={setSelectedPostsType}
                elements={[
                    ["My Posts", "account.index"],
                    ["Favourite", "favourite.index"],
                ]}
                setPosts={setPosts}
                setRout={setRout}
            />

            <div className="w-full p-4 text-center sm:rounded-lg">
                <InfiniteScrollPosts
                    chosenCategory={categoryId}
                    posts={posts}
                    fetchPosts={fetchPosts}
                    categories={categories}
                    tags={tags}
                    refreshPosts={refreshPosts}
                />
            </div>
        </div>
    );
}

export default AccountView;
