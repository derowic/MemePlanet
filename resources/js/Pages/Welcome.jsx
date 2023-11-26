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
import FetchPosts from "./API/FetchWithPagination";

import BanInfo from "@/Layouts/BanInfo";
import { usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "@/Layouts/NavBar";
import AxiosGet from "./API/AxiosGet";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const translation = useTranslation(["dashboard"]);
    const [chosenCategory, setChosenCategory] = useState(0);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("Home"),
    );

    const user = usePage().props.auth.user;
    //console.log(user);
    const [rout, setRout] = useState("post.index");

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    useEffect(() => {
        AxiosGet("tag.index", null, null, setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);
    return (
        <div className="bg-meme_black text-white">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/*
            <div className="bg-meme_black sticky top-0 border-b border-meme_blue hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavBar translation={translation}/>
            </div>
            */}

            <div className="w-full sticky top-0 p-6 text-center text-white font-bold bg-meme_black text-2xl">
                {auth.user ? (
                    <Link href={route("dashboard")} className="">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="border-r-2 px-2 border-meme_violet"
                        >
                            Log in
                        </Link>

                        <Link href={route("register")} className="ml-2">
                            Register
                        </Link>
                    </>
                )}
            </div>
            <div className="font-bold bg-meme_black">
                <div className="flex text-gray-100">
                    <div className="w-full text-center">
                        <h2 className="mb-2 text-3xl border-b border-meme_violet">
                            {translation.t("Meme Planet")}
                        </h2>
                        <PostsTypeSelect
                            selected={selectedPostsType}
                            setSelected={setSelectedPostsType}
                            elements={[
                                [translation.t("Home"), "post.index"],
                                [translation.t("Top"), "post.top"],
                                [
                                    translation.t("Trending"),
                                    "post.trending",
                                ],
                                [translation.t("Fresh"), "post.fresh"],
                            ]}
                            setPosts={setPosts}
                            setRout={setRout}
                        />
                        {tags.length > 0 && categories.length > 0 && (
                            <InfiniteScrollPosts
                                chosenCategory={chosenCategory}
                                posts={posts}
                                fetchPosts={() =>
                                    FetchPosts(
                                        rout,
                                        { page: page },
                                        setPosts,
                                        page,
                                        setPage,
                                    )
                                }
                                categories={categories}
                                tags={tags}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
