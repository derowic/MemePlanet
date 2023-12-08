import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AxiosDelete from "../Pages/API/AxiosDelete";
import AxiosPut from "../Pages/API/AxiosPut";
import AxiosPost from "../Pages/API/AxiosPost";
import AxiosGet from "@/Pages/API/AxiosGet";
import { useTranslation } from "react-i18next";

function ChangeLanguage({}) {
    const { i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        AxiosGet("profile.setLang", { lang: lang });
    };

    return (
        <>
            <button
                onClick={() => changeLanguage("en")}
                className="white font-bold mr-2"
            >
                English
            </button>
            <button
                onClick={() => changeLanguage("pl")}
                className="white font-bold"
            >
                Polish
            </button>
        </>
    );
}

export default ChangeLanguage;
