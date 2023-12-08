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
    const resotrePost = async (post) => {
        let tmp = await AxiosPut("post.restore", { id: post.id }, null, 1);

        if (tmp.status == 201) {
            restore();
        }
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
