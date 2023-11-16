import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function AdminPostsFuncs({ post }) {
    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-green-500  hover:bg-green-400 m-2"
                        onClick={() =>
                            AxiosPut("post.mainPage", { id: post.id })
                        }
                    >
                        Send to main page
                    </button>

                    <button
                        className="p-3 rounded-lg border border-gray-500  hover:bg-gray-400 m-2"
                        onClick={() =>
                            AxiosPut("post.hidePost", { id: post.id })
                        }
                    >
                        Hide for the users
                    </button>

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

export default AdminPostsFuncs;
