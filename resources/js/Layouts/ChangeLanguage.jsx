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
import { usePage } from "@inertiajs/react";

function ChangeLanguage({}) {
    const { i18n } = useTranslation();
    const user = usePage().props.auth.user;

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        AxiosGet("profile.setLang", { lang: lang });
    };

    useEffect(() => {
        i18n.changeLanguage(user.lang);
    }, []);

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
