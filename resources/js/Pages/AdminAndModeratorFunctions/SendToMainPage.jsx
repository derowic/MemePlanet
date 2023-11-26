import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function SendToMainPage({ post, hide }) {
    const hidePost = (post) => {
        AxiosPut("post.hidePost", { id: post.id });
        hide();
    };

    const unhidePost = (post) => {
        AxiosPut("post.unHidePost", { id: post.id });
        hide();
    };

    const setPostToMainPage = (post) =>{

        AxiosPut("post.mainPage", { id: post.id })
    }


    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-green-500  hover:bg-green-400 m-2"
                        onClick={() =>
                            setPostToMainPage(post)
                        }
                    >
                        Send to main page
                    </button>
                </div>
            </div>
        </>
    );
}

export default SendToMainPage;
