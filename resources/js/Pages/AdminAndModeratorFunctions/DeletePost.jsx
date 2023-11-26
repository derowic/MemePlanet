import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function DeletePost({ post }) {
    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-red-500  hover:bg-red-400 m-2"
                        onClick={() =>
                            AxiosDelete("post.destroy", { post: post.id }, null)
                        }
                    >
                        Delete Post
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeletePost;
