import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";
import AxiosPost from "../API/AxiosPost";

function HidePost({ post, hide, translation }) {
    const hidePost = async (post) => {
        let tmp = await AxiosPut("post.hidePost", { id: post.id }, null, 1);
        if (tmp.status == 201) {
            hide();
        }
    };

    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-gray-500  hover:bg-gray-400 m-2"
                        onClick={() => hidePost(post)}
                    >
                        {translation.t("Hide")}
                    </button>
                </div>
            </div>
        </>
    );
}

export default HidePost;
