import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import SetPostToMainPage from "../AdminAndModeratorFunctions/SetPostToMainPage";
import HidePost from "../AdminAndModeratorFunctions/HidePost";
import DeletePost from "../AdminAndModeratorFunctions/DeletePost";

function AdminPostsFuncs({ post }) {
    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg bg-green-500 m-2"
                        onClick={() => SetPostToMainPage(post.id)}
                    >
                        Send to main page
                    </button>

                    <button
                        className="p-3 rounded-lg bg-gray-500 m-2"
                        onClick={() => HidePost(post.id)}
                    >
                        Hide for the users
                    </button>

                    <button
                        className="p-3 rounded-lg bg-red-500 m-2"
                        onClick={() => DeletePost(post.id)}
                    >
                        Delete Post
                    </button>
                </div>
            </div>
        </>
    );
}

export default AdminPostsFuncs;
