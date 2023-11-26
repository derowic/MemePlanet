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
import { usePage } from "@inertiajs/react";

export default function Account({}) {
    const user = usePage().props.auth.user;
    const translation = useTranslation(["dashboard"]);
    const [chosenCategory, setChosenCategory] = useState([]);
    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
        setPage(1);
    };
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("My Posts"),
    );
    const [rout, setRout] = useState("post.userPosts");

    useEffect(() => {
        AxiosGet("tag.index", null, null, setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout changeCategory={changeCategory}>
            <div className="bg-[#111] flex text-gray-100">


                <div className="w-full mt-4">
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
                                    AxiosGet(
                                        rout ,
                                        {
                                            page: page,
                                            chosenCategory: chosenCategory
                                        },
                                        null,
                                        null,
                                    )
                                }
                                categories={categories}
                                tags={tags}
                                setPosts={setPosts}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
