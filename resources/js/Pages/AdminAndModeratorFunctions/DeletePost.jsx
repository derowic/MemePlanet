import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function DeletePost({ post,  postDeleted, deletePost}) {
    const deletingPost = (post) =>
    {
        AxiosDelete("post.destroy", { post: post.id }, null);
        deletePost();
    }
    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-red-500  hover:bg-red-400 m-2"
                        onClick={() =>
                            deletingPost(post)
                        }
                    >
                        <div>Delete Post</div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeletePost;
