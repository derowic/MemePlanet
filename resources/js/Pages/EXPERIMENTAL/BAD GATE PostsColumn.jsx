import React, { useState, useEffect } from "react";
import InfiniteScrollPosts from "../Posts/InfiniteScrollPosts";
import PostsTypeSelect from "../Posts/PostsTypeSelect";
import FetchPosts from "../API/FetchWithPagination";

function PostsColumn({ elements, categoryId, categories, tags }) {
    const [selectedPostsType, setSelectedPostsType] = useState(elements[0][0]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [rout, setRout] = useState(elements[0][0]);
    useEffect(() => {}, []);

    return (
        <div>
            <PostsTypeSelect
                selected={selectedPostsType}
                setSelected={setSelectedPostsType}
                elements={elements}
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
                />
            </div>
        </div>
    );
}

export default PostsColumn;
