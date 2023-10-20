import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InfiniteScrollPosts from "./Posts/InfiniteScrollPosts";
import CategoryList from "./Categories/CategoryList";
import TopPosts from "./Posts/TopPosts";
import FetchIndex from "@/Pages/API/FetchIndex";
import PostsTypeSelect from "./Posts/PostsTypeSelect";
import { ToastContainer } from "react-toastify";
import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import FetchPosts from "./API/FetchPosts";

export default function Dashboard() {
    const user = usePage().props.auth;
    const dashboardTranslation = useTranslation(["dashboard"]);


    const [chosenCategory, setChosenCategory] = useState(0);
    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPostsType, setSelectedPostsType] = useState("Home");
    const [rout, setRout] = useState("post.index");

    const refreshPosts = async () => {
        setPosts([]);
        const response = await FetchIndex(rout, null);
        setPosts((prevPosts) => [...prevPosts, ...response]);
    };


    const fetchTags = async () => {
        try {
            let t = await FetchIndex("tag.index", null);
            setTags((prevTags) => [...prevTags, ...t]);
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("InfiniteScrollPosts -> fetchTags error: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            let t = await FetchIndex("category.index", null);
            setCategories((prevTags) => [...prevTags, ...t]);
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("InfiniteScrollPosts -> fetchTags error: ", error);
        }
    };

    useEffect(() => {
        fetchTags();
        fetchCategories();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className=" text-xl text-gray-800 dark:text-gray-200 leading-tight"></h2>
            }
        >

            <div className="font-bold bg-[#231f20] ">
                <div className="flex text-gray-100">
                    <div className=" w-1/4 mt-6">
                        <div className="sticky top-20 p-4 sm:rounded-lg ">
                            <h3 className="text-center mb-2 text-3xl">

                                {dashboardTranslation.t("Categories")}
                                <hr />

                            </h3>
                            <CategoryList
                                chosenCategory={chosenCategory}
                                changeCategory={changeCategory}
                            />
                        </div>
                    </div>

                    <div className="w-2/4 mt-2">
                        <div className="w-full text-center">
                            <h2 className="mb-2 text-3xl">

                                {dashboardTranslation.t("Meme Planet")}
                                <hr />

                            </h2>
                            <PostsTypeSelect
                                selected={selectedPostsType}
                                setSelected={setSelectedPostsType}
                                elements={[
                                    [dashboardTranslation.t("Home"), "post.index"],
                                    [dashboardTranslation.t("Top"), "post.top"],
                                    [dashboardTranslation.t("Trending"), "post.trending"],
                                    [dashboardTranslation.t("Fresh"), "post.fresh"],
                                ]}
                                setPosts={setPosts}
                                setRout={setRout}
                            />
                            {tags.length > 0 && categories.length > 0 && (
                                <InfiniteScrollPosts
                                    chosenCategory={chosenCategory}
                                    posts={posts}
                                    fetchPosts={() => FetchPosts(rout, { page: page }, setPosts, page, setPage)}
                                    categories={categories}
                                    tags={tags}
                                    refreshPosts={refreshPosts}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-1/4 mt-4 ml-4">
                        <div className="w-full p-4 text-center">
                            <h3 className="text-center mb-2 text-3xl">{dashboardTranslation.t("Hot")}</h3>
                            <TopPosts tags={tags} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
