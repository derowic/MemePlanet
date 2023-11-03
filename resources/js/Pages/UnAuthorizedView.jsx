import { Link, Head } from "@inertiajs/react";
import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InfiniteScrollPosts from "./Posts/InfiniteScrollPosts";
import CategoryList from "./Categories/CategoryList";
import TopPosts from "./Posts/TopPosts";
import PostsTypeSelect from "./Posts/PostsTypeSelect";
import { useTranslation } from "react-i18next";
import FetchPosts from "./API/FetchPosts";
import FetchTags from "./API/FetchTags";
import RefreshPosts from "./API/RefreshPosts";
import FetchCategories from "./API/FetchCategories";
import BanInfo from "@/Layouts/BanInfo";
import { usePage } from "@inertiajs/react";
import FetchIndex from "@/Pages/API/FetchIndex";
import { ToastContainer, toast } from "react-toastify";

export default function UnAuthorizedView({ }) {

    const user = usePage().props.auth.user;
    const translation = useTranslation(["dashboard"]);

    return (
        <div className="h-[100vh] bg-meme_black border-b border-t border-meme_violet text-white items-center justify-center h-screen">
            <div className="text-2xl text-center font-bold bg-meme_black text-white mt-[10vh]">
                You aren't authorize to be here, go back
            </div>

            <div className="w-full h- p-6 text-center text-white font-bold bg-meme_black ">
                {user ? (
                    <Link href={route("dashboard")} className="">
                        go back to dashboard
                    </Link>
                ) : (
                    <>
                        <Link href={route("login")} className="">
                            Log in
                        </Link>

                        <Link href={route("register")} className="ml-2">
                            Register
                        </Link>
                    </>
                )}
            </div>

        </div>
    );
}
