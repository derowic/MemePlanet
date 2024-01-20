import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function TakeFromMainPage({ post, mainPage, setAsMainPagePost, translation }) {
    const takeFromMainPage = (post) => {
        setAsMainPagePost();
        AxiosPut("post.takeFromMainPage", { id: post.id }, null, translation);
    };
    useEffect(() => {
    }, [post, post.status]);

    return (
        <>
            <div className="block">
                <div className="w-full ">
                    <button
                        className="p-3 rounded-lg border border-green-500  hover:bg-green-400 m-2"
                        onClick={() => takeFromMainPage(post)}
                    >
                        <div>{translation.t("Take it from the home page")}</div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default TakeFromMainPage;
