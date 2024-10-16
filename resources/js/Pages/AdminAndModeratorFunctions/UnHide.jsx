import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function UnHide({ post, hide, translation }) {
    const unhidePost = async (post) => {
        let tmp = await AxiosPut("post.unHidePost", { id: post.id }, null, 1);

        if (tmp.status == 201) {
            hide();
        }
    };

    return (
        <button
            className="w-full p-3 rounded-lg border border-gray-500  hover:bg-gray-400 m-2"
            onClick={() => unhidePost(post)}
        >
            {translation.t("Unhide")}
        </button>
    );
}

export default UnHide;
