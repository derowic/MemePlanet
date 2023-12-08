import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../API/AxiosDelete";
import AxiosPut from "../API/AxiosPut";

function SendPostToMainPage({
    post,
    mainPage,
    setAsMainPagePost,
    translation,
}) {
    const setPostToMainPage = async (post) => {
        console.log("1");
        let tmp = await AxiosPut("post.mainPage", { id: post.id }, null, 1);

        if (tmp.status == 201) {
            console.log(tmp);
            setAsMainPagePost(true);
        }
    };

    const takePostFromMainPage = async (post) => {
        console.log("2");
        let tmp = await AxiosPut(
            "post.takeFromMainPage",
            { id: post.id },
            null,
            1,
        );

        if (tmp.status == 201) {
            console.log(tmp);
            setAsMainPagePost(false);
        }
    };
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
                            mainPage
                                ? takePostFromMainPage(post)
                                : setPostToMainPage(post)
                        }
                    >
                        {mainPage ? (
                            <div>
                                {translation.t("Take it from the home page")}
                            </div>
                        ) : (
                            <div>{translation.t("Send to main page")}</div>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

export default SendPostToMainPage;
