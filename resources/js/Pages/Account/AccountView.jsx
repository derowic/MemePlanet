import React, { useState, useEffect } from "react";
import InfiniteScrollPosts from "../Posts/InfiniteScrollPosts";
import FetchIndex from "@/Pages/API/FetchIndex";
import PostsTypeSelect from "../Posts/PostsTypeSelect";
import FetchPosts from "../API/FetchPosts";
import RefreshPosts from "../API/RefreshPosts";
import { useTranslation } from "react-i18next";

function AccountView({ categoryId, categories, tags }) {
    const translation = useTranslation(["dashboard"]);
    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("My Posts"),
    );
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [rout, setRout] = useState("account.index");

    useEffect(() => {}, []);

    return (
        <div>
            <PostsTypeSelect
                selected={selectedPostsType}
                setSelected={setSelectedPostsType}
                elements={[
                    [translation.t("My Posts"), "account.index"],
                    [translation.t("Favourite"), "favourite.index"],
                ]}
                setPosts={setPosts}
                setRout={setRout}
            />

            <div className="w-full p-4 text-center sm:rounded-lg">
                <InfiniteScrollPosts
                    chosenCategory={categoryId}
                    posts={posts}
                    fetchPosts={() =>
                        FetchPosts(
                            rout,
                            { page: page },
                            setPosts,
                            page,
                            setPage,
                        )
                    }
                    categories={categories}
                    tags={tags}
                    refreshPosts={() => RefreshPosts(rout, null, setPosts)}
                />
            </div>
        </div>
    );
}

export default AccountView;
