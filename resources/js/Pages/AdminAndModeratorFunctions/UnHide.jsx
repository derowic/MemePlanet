import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function UnHide({ post, hide }) {
    const unhidePost = (post) => {
        AxiosPut("post.unHidePost", { id: post.id });
        hide();
    };

    return (
        <button
            className="w-full p-3 rounded-lg border border-gray-500  hover:bg-gray-400 m-2"
            onClick={() => unhidePost(post)}
        >
            unHide
        </button>
    );
}

export default UnHide;
