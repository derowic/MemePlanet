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
    setPosts,
    page,
    setPage,
}) => {
    const translation = useTranslation(["dashboard"]);
    const [favs, setFavs] = useState([]);
    const [chosedCategory, setChosedCategory] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const screenWidth = window.screen.width;
    const [columnNumber, setColumnNumber] = useState(6);
    const [columnStyle, setColumnStyle] = useState("w-1/6");
    const [replacedPosts, SetReplacedPosts] = useState([]);
    let columnWidthShouldBe = 320;
    let oldColumnNumber = 6;

    const fetchPaginatedPost = async () => {
        //console.log("fetch posts");
        let response = await fetchPosts();
        setPosts((prevData) => [...prevData, ...response]);
        setPage(page + 1);
    };


    const afterChangeSelectedPosts = async () =>
    {

        setPosts([]);
        let response = await fetchPosts();
        //console.log(response);
        setPosts(response);
        setPage(page + 1);
        replacePosts();
    }


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
        if (columnNumber != oldColumnNumber) {
            replacePosts();
            oldColumnNumber = columnNumber;

        }
        setWindowWidth(window.innerWidth);
        let columnNum = window.innerWidth / columnWidthShouldBe;
        columnNum = Math.round(columnNum);
        if(columnNum >6)
        {
            columnNum = 6;
        }
        /*
        if(columnNum <=0)
        {
            columnNum = 1;
        }
        */
        setColumnNumber(columnNum);


        setColumnStyle("w-1/"+columnNum);

    };

    useEffect(() => {
        setChosedCategory(chosenCategory);
        fetchPaginatedPost();
        replacePosts();
        handleResize();
    }, [categories, tags]);

    useEffect(() => {
        setChosedCategory(chosenCategory);
        afterChangeSelectedPosts();
        //console.log("zmina kategorii");
    }, [chosenCategory]);


    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setWindowWidth(window.innerWidth);
        handleResize();
        replacePosts();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [columnNumber, posts]);



    return (
        <div>
            <div className="p-4">
                {CheckPermission("post.create") && (
                    <UploadPost categories={categories} tags={tags} />
                )}
                {columnNumber}
            </div>

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPaginatedPost}
                hasMore={true}
                loader={<p>{translation.t("loading...")}</p>}
                endMessage={<p>{translation.t("noMorePosts")}</p>}
            >
                <div className="flex flex-wrap">
                    {replacedPosts.map((column, columnIndex) => (
                        <div
                            key={columnIndex}
                            className={columnStyle}
                        >
                            {column.map((post, postIndex) => (
                                <>
                                    <Post
                                    key={postIndex}
                                    index={postIndex}
                                    post={post}
                                    tags={tags}
                                    showOptions={true}
                                    />
                                </>
                            ))}
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollPosts;
