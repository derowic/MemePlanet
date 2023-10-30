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

        FetchTags("tag.index", null, setTags);
        FetchCategories("category.index", null, setCategories);
    }, []);
    return (
        <>
            <div className="font-bold bg-[#111]">
                <div className="flex text-gray-100">
                    <div className=" w-1/4 mt-6">
                        <div className="w-full sticky top-20 p-4 sm:rounded-lg ">
                            <h3 className="w-full text-center mb-2 text-3xl border-b border-[#7d12ff]">
                                {translation.t("Categories")}

                            </h3>
                            <CategoryList
                                chosenCategory={chosenCategory}
                                changeCategory={changeCategory}
                            />
                        </div>
                    </div>

                    <div className="w-2/4 mt-2">
                        <div className="w-full text-center">

                            <h2 className="mb-2 text-3xl border-b border-[#7d12ff]">
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
                                    refreshPosts={() =>
                                        RefreshPosts(rout, null, setPosts)
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-1/4 mt-4 ml-4">
                        <div className="w-full p-4 text-center ">
                            <h3 className=" w-full text-center mb-2 text-3xl w-full border-b border-[#7d12ff]">
                                {translation.t("Hot")}
                            </h3>
                            <TopPosts tags={tags} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
