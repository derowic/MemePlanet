import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosPut from "../API/AxiosPut";

const SetPostToMainPage = async (post) => {
    console.log("1");
    let tmp = await AxiosPut("post.mainPage", { id: post.id }, null, 1);

    if (tmp.status == 201) {
        console.log(tmp);
        setAsMainPagePost(true);
    }
};
