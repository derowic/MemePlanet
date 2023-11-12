import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoryList from "./Categories/CategoryList";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import AxiosGet from "./API/AxiosGet";
import InfiniteScrollPosts from "./Posts/InfiniteScrollPosts";
import PostsTypeSelect from "./Posts/PostsTypeSelect";
import FetchWithPagination from "./API/FetchWithPagination";


export default function Account({}) {
    const translation = useTranslation(["dashboard"]);
    const [chosenCategory, setChosenCategory] = useState(0);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("My Posts"),
    );
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [rout, setRout] = useState("post.userPosts");


    useEffect(() => {
        AxiosGet("tag.index", null, null,  setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="bg-[#111] flex text-gray-100">
                <div className=" w-1/4 mt-6">
                    <div className=" sticky top-7 p-4 sm:rounded-lg ">
                        <h3 className="text-center mb-2 text-3xl border-b border-meme_violet">
                            {translation.t("Categories")}
                        </h3>
                        <CategoryList
                            chosenCategory={chosenCategory}
                            changeCategory={changeCategory}
                        />
                    </div>
                </div>

                <div className="w-2/4 mt-4">
                    <div className="w-full p-4 text-center ">
                        <PostsTypeSelect
                            selected={selectedPostsType}
                            setSelected={setSelectedPostsType}
                            elements={[
                                [translation.t("My Posts"), "post.userPosts"],
                                [translation.t("Favourite"), "favourite.index"],
                            ]}
                            setPosts={setPosts}
                            setRout={setRout}
                        />

                        <div className="w-full p-4 text-center sm:rounded-lg">
                            <InfiniteScrollPosts
                                chosenCategory={chosenCategory}
                                posts={posts}
                                fetchPosts={() =>
                                    FetchWithPagination(
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
                        </div>
                    </div>
                </div>

                <div className="w-1/4 mt-4 ml-4">
                    <div className="w-full  p-4 text-center sm:rounded-lg">
                        <h3 className="text-center mb-2 text-3xl  border-b border-[#7d12ff]">
                            {translation.t("Edit Profile")}
                        </h3>

                        <div className="grid">
                            <Link
                                href={route("profile.edit")}
                                className="text-2xl mt-4 "
                            >
                                {translation.t("Edit basic user data")}
                            </Link>

                            <Link
                                href={route("profile.edit")}
                                className="text-2xl mt-4 "
                            >
                                {translation.t("Edit posts preferences")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
