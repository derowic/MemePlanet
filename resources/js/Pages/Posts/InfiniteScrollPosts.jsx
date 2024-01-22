import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageUploadForm from "./ImageUploadForm";
import Post from "./Post";
import DefaultButton from "../BasicElements/DefaultButton";
import { useTranslation } from "react-i18next";
import CheckPermission from "../API/CheckPermission";
import { setRef } from "@mui/material";

const InfiniteScrollPosts = ({
    chosenCategory,
    posts,
    fetchPosts,
    categories,
    tags,
    fetchTags,
    setPosts,
    page,
    setPage,
    viewType,
}) => {
    const translation = useTranslation(["post"]);
    const [favs, setFavs] = useState([]);
    const [chosedCategory, setChosedCategory] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const screenWidth = window.screen.width;
    const [columnNumber, setColumnNumber] = useState(6);
    const [columnStyle, setColumnStyle] = useState(null);
    const [replacedPosts, SetReplacedPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    let columnWidthShouldBe = window.screen.width / 6;
    let oldColumnNumber = 6;

    const fetchPaginatedPost = async () => {
        if (setPosts) {
            let response = await fetchPosts();
            if (response.length == 0) {
                setHasMore(false);
            } else {
                setPosts((prevData) => [...prevData, ...response]);
                setPage(page + 1);
            }
        }
    };

    const afterChangeSelectedPosts = async () => {
        if (setPosts) {
            setPosts([]);
            let response = await fetchPosts();
            setPosts(response);
            setPage(page + 1);
            replacePosts();
        }
    };

    const replacePosts = () => {
        SetReplacedPosts([]);
        const replacePosts = [];

        for (let i = 0; i < columnNumber; i++) {
            replacePosts.push([]);
        }

        let tmp = 0;
        for (let i = 0; i < posts.length; i++) {
            replacePosts[tmp].push(posts[i]);
            tmp++;
            if (tmp >= columnNumber) {
                tmp = 0;
            }
        }
        SetReplacedPosts(replacePosts);
    };

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        let columnNum = window.innerWidth / columnWidthShouldBe;
        columnNum = Math.round(columnNum);
        if (columnNum <= 0) {
            columnNum = 1;
        }
        setColumnNumber(columnNum);
        setColumnStyle("w-" + columnNum + "");
        setRefresh(!refresh);

        if (columnNumber != oldColumnNumber) {
            replacePosts();
            oldColumnNumber = columnNumber;
        }
    };

    useEffect(() => {
        setChosedCategory(chosenCategory);
        fetchPaginatedPost();
        replacePosts();
        handleResize();
    }, [categories, tags]);

    useEffect(() => {
        if (page == 1) {
            setHasMore(true);
        }
    }, [page]);

    useEffect(() => {
        setChosedCategory(chosenCategory);
        afterChangeSelectedPosts();
    }, [chosenCategory]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setWindowWidth(window.innerWidth);
        handleResize();
        replacePosts();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
        return () => {};
    }, [columnNumber, posts]);

    const [scrollY, setScrollY] = useState(0);
    const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const scrollBarVisible = documentHeight > windowHeight;
        setScrollY(currentScrollY);
        setIsScrollBarVisible(scrollBarVisible);
    };

    return (
        <div>
            <div className="p-4 w-full m-auto">
                <div className="m-auto w-3/4">
                    {CheckPermission("post.create") && (
                        <ImageUploadForm
                            categories={categories}
                            tags={tags}
                            fetchTags={fetchTags}
                        />
                    )}
                </div>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPaginatedPost}
                    hasMore={hasMore}
                    loader={<p>{translation.t("loading...")}</p>}
                    endMessage={<p>{translation.t("No more posts")}</p>}
                >
                    {viewType ? (
                        <div className="m-auto flex w-full">
                            {replacedPosts.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    style={{
                                        width: columnWidthShouldBe,
                                    }}
                                >
                                    {column.map((post, postIndex) => (
                                        <Post
                                            key={postIndex}
                                            index={postIndex}
                                            post={post}
                                            tags={tags}
                                            showOptions={true}
                                            translation={translation}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="m-auto w-full">
                            {replacedPosts.map((column, columnIndex) => (
                                <div key={columnIndex} className="w-2/5 m-auto">
                                    {column.map((post, postIndex) => (
                                        <Post
                                            key={postIndex}
                                            index={postIndex}
                                            post={post}
                                            tags={tags}
                                            showOptions={true}
                                            translation={translation}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default InfiniteScrollPosts;
