import React, { useState, useEffect } from "react";
import Like from "./Likes/Like";
import Tags from "../Tags/Tags";
import PostDetals from "./PostDetals";
import { Button, Drawer } from "@mui/material";
import Fav from "./Fav/Fav";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import AdminPostsFuncs from "../AdminAndModeratorFunctions/SendPostToMainPage";
import ReportDialog from "./Reports/ReportDialog";
import ReportListDialog from "../AdminPanel/ReportListDialog";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import BanDialog from "../AdminPanel/BanDialog";
import CheckRole from "../API/CheckRole";
import LogedIn from "../API/LogedIn";
import UnHide from "../AdminAndModeratorFunctions/UnHide";
import SendPostToMainPage from "../AdminAndModeratorFunctions/SendPostToMainPage";
import HidePost from "../AdminAndModeratorFunctions/HidePost";
import DeletePost from "../AdminAndModeratorFunctions/DeletePost";
import RestorePost from "../AdminAndModeratorFunctions/RestorePost";
import TakeFromMainPage from "../AdminAndModeratorFunctions/TakeFromMainPage";

function PostPreView({
    title,
    text,
    category,
    previewImage,
    selectedTags,
    tags,
    translationCategory,
    translationTag,
}) {
    const user = usePage().props.auth.user;

    useEffect(() => {}, []);

    return (
        <div className="">
            <div className="flex flex-wrap justify-center mt-2 w-full">
                <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2  w-full">
                    <h3 className="text-left font-semibold mb-2 w-full">
                        {title ? (
                            title
                        ) : (
                            <div className="text-gray-400">title</div>
                        )}
                    </h3>
                    <div className="text-left text-xs mb-2">
                        {/*isNaN(post.user) ? post.user.name : "unknown"*/}
                        {user.name}
                    </div>
                    <div className="text-left text-xs ">
                        {/*post.category.name*/}
                        {/*categories[selectedCategory].name*/}
                        {translationCategory.t(category)}
                    </div>

                    <div className="m-auto">
                        <div className="text-left text-xs flex">
                            {selectedTags.map((tagData) => {
                                const tag = tags.find(
                                    (tag) => tag.id === tagData,
                                );
                                return tag ? (
                                    <div
                                        key={tag.id}
                                        className="mr-2 px-1 py-1 sm:rounded-lg p-4 mt-4 border-2 border-[#bbb]"
                                    >
                                        {translationTag.t(tag.name)}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>

                    <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">
                        {text ? (
                            text
                        ) : (
                            <div className="text-gray-400">text</div>
                        )}
                    </div>

                    {previewImage ? (
                        <div className="">
                            <img
                                id="attr"
                                src={previewImage}
                                alt="Preview"
                                className="m-auto w-full"
                            />
                        </div>
                    ) : (
                        <div className="text-gray-400 flex justify-center items-center">
                            no image
                        </div>
                    )}

                    <div className="flex flex-wrap">
                        {/*<Like
                                elementId={post.id}
                                elementType={"post"}
                                likes={post.likes}
                                is_liked={post.is_liked}
                    />*/}

                        {/*<Fav postId={post.id} is_Fav={post.is_fav} />*/}

                        {/*<ReportDialog
                                post={post}
                                defaultButtonText={"!"}
                                modalTitle={""}
                                modalDescription={translation.t(
                                    "Select report reason",
                                )}
                                translation={translation}
                            />

                            <PostDetals
                                post={post}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                loadComments={loadComments}
                                setLoadComments={setLoadComments}
                                translation={translation}
                                />*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPreView;
