import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UploadPost from "./UploadPost";
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
    const [columnStyle, setColumnStyle] = useState("grid grid-cols-6 gap-4");
    const [replacedPosts, SetReplacedPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    let columnWidthShouldBe =  window.screen.width /6;
    let oldColumnNumber = 6;

    const fetchPaginatedPost = async () => {
        //

        if(setPosts){
            console.log("fetch posts");
            let response = await fetchPosts();
            setPosts((prevData) => [...prevData, ...response]);
            setPage(page + 1);
        }
    };

    const afterChangeSelectedPosts = async () => {

        if(setPosts){
            setPosts([]);
            let response = await fetchPosts();
            //console.log(response);
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
        if (columnNumber != oldColumnNumber) {
            replacePosts();
            oldColumnNumber = columnNumber;
        }
        setWindowWidth(window.innerWidth);
        let columnNum = window.innerWidth / columnWidthShouldBe;
        columnNum = Math.round(columnNum);
        if (columnNum <= 0) {
            columnNum = 1;
        }
        if (columnNum == 3) {
            columnNum = 2;
        }

        if (columnNum >= 7  ) {
            columnNum = 6;
        }

        setColumnNumber(columnNum);

        setColumnStyle("grid grid-cols-" + columnNum+" gap-4");
        console.log(columnStyle);
        setRefresh(!refresh);
    };

    useEffect(() => {
        setChosedCategory(chosenCategory);
        fetchPaginatedPost();
        replacePosts();
        handleResize();
        console.log("syatuy");

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
            <div className="p-4 w-3/4 m-auto">
                {CheckPermission("post.create") && (
                    <UploadPost categories={categories} tags={tags} />
                )}
            </div>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPaginatedPost}
                hasMore={true}
                loader={<p>{translation.t("loading...")}</p>}
                endMessage={<p>{translation.t("noMorePosts")}</p>}
            >

                <div className={columnStyle}>
                    {replacedPosts.map((column, columnIndex) => (
                        <div key={columnIndex} className={"col-span-1"}>
                            {column.map((post, postIndex) => (
                                <Post
                                    key={post.id}
                                    index={postIndex}
                                    post={post}
                                    tags={tags}
                                    showOptions={true}
                                />
                            ))}
                        </div>
                    ))}
                </div>

            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollPosts;
