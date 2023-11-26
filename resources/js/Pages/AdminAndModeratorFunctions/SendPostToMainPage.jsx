import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function SendPostToMainPage({ post, mainPage, setAsMainPagePost }) {

    const setPostToMainPage = (post) =>{
        setAsMainPagePost();
        AxiosPut("post.mainPage", { id: post.id })
    }
    useEffect(() => {
        //console.log(post.status);
    }, [post, post.status]);

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
                        {mainPage ?
                            <div>Take it from main page</div>
                            :
                            <div>Send to main page</div>
                        }
                    </button>
                </div>
            </div>
        </>
    );
}

export default SendPostToMainPage;
