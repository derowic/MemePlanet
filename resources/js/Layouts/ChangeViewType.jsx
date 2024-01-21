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
import { Switch } from "@headlessui/react";

function ChangeViewType({ viewType, setViewType }) {
    const { i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        AxiosGet("profile.setLang", { lang: lang });
    };

    return (
        <div className="p-8 flex ">
            <img
                id={"yourImage"}
                src={"columnView.png"}
                alt="Opis obrazka"
                className={`m-auto mr-2 w-1/6 w-[35px] ${
                    viewType ? "" : "bg-meme_violet"
                }`}
            />
            <Switch
                checked={viewType}
                onChange={setViewType}
                className={`${viewType ? "bg-[#222]" : "bg-[#222]"}
                relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only text-white">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${viewType ? "translate-x-9" : "translate-x-0"}
                    pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            <img
                id={"yourImage"}
                src={"gridView.png"}
                alt="Opis obrazka"
                className={`m-auto ml-2 w-1/6 w-[30px] ${
                    viewType ? "bg-meme_violet" : ""
                }`}
            />
        </div>
    );
}

export default ChangeViewType;
