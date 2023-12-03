import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function RestorePost({ post, restore, translation }) {
    const resotrePost = (post) => {
        AxiosPut("post.restore", { id: post.id }, null, translation);
        restore();
    };

    return (
        <button
            className="w-full p-3 rounded-lg border border-red-500  hover:bg-red-400 m-2"
            onClick={() => resotrePost(post)}
        >
            {translation.t("Restore")}
        </button>
    );
}

export default RestorePost;
