import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function DeletePost({ post, postDeleted, deletePost, translation }) {
    const deletingPost = async (post) => {
        let tmp = await AxiosDelete("post.destroy", { post: post.id }, null, 1);

        if (tmp.status == 201) {
            deletePost();
        }
    };
    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-red-500  hover:bg-red-400 m-2"
                        onClick={() => deletingPost(post)}
                    >
                        <div>{translation.t("Delete")}</div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeletePost;
