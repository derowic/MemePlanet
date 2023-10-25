import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InfiniteScrollPosts from "../Posts/InfiniteScrollPosts";
import CategoryList from "../Categories/CategoryList";
import TopPosts from "../Posts/TopPosts";
import PostsTypeSelect from "../Posts/PostsTypeSelect";
import { useTranslation } from "react-i18next";
import FetchPosts from "../API/FetchPosts";
import FetchTags from "../API/FetchTags";
import RefreshPosts from "../API/RefreshPosts";
import FetchCategories from "../API/FetchCategories";

export default function AdminPanel() {
    const translation = useTranslation(["dashboard"]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("Reported posts"),
    );
    const [rout, setRout] = useState("adminPanel.index");

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    useEffect(() => {
        FetchTags("tag.index", null, setTags);
        FetchCategories("category.index", null, setCategories);
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
                        <div className="w-full sticky top-20 p-4 sm:rounded-lg ">
                            <h3 className="w-full text-center mb-2 text-3xl">
                                {translation.t("Categories")}
                                <hr />
                            </h3>
                        </div>
                    </div>

                    <div className="w-2/4 mt-2">
                        <div className="w-full text-center">
                            <h2 className="mb-2 text-3xl">
                                {translation.t("Admin Panel")}
                                <hr />
                            </h2>
                            <PostsTypeSelect
                                selected={selectedPostsType}
                                setSelected={setSelectedPostsType}
                                elements={[
                                    [
                                        translation.t("Reported posts"),
                                        "adminPanel.index",
                                    ],
                                    [
                                        translation.t("Hidden posts"),
                                        "adminPanel.hiddenPosts",
                                    ],
                                ]}
                                setPosts={setPosts}
                                setRout={setRout}
                            />
                            {tags.length > 0 && categories.length > 0 && (
                                <InfiniteScrollPosts
                                    chosenCategory={0}
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
                            <h3 className=" w-full text-center mb-2 text-3xl w-full">
                                {translation.t("Hot")}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
