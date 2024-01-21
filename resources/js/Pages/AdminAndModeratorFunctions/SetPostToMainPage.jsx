import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosPut from "../API/AxiosPut";

const SetPostToMainPage = async (post) => {
    let tmp = await AxiosPut("post.mainPage", { id: post.id }, null, 1);

    if (tmp.status == 201) {
        setAsMainPagePost(true);
    }
};
