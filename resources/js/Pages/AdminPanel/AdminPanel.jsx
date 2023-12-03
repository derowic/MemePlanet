import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InfiniteScrollPosts from "../Posts/InfiniteScrollPosts";
import PostsTypeSelect from "../Posts/PostsTypeSelect";
import { useTranslation } from "react-i18next";
import FetchPosts from "../API/FetchWithPagination";
import NavLink from "@/Components/NavLink";
import CheckRole from "../API/CheckRole";
import AxiosGet from "../API/AxiosGet";
import { usePage } from "@inertiajs/react";

export default function AdminPanel() {
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
        translation.t("Reported Posts"),
    );
    const [rout, setRout] = useState("post.reportedPosts");

    useEffect(() => {
        AxiosGet("tag.index", null, null, setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout changeCategory={changeCategory}>
            <div className="font-bold bg-[#111] h-full">
                <div className="text-gray-100">
                    <div className="w-full mt-2">
                        <div className="w-full text-center">
                            <h2 className="mb-2 text-3xl">
                                {translation.t("Meme Planet")}
                            </h2>
                            <PostsTypeSelect
                                selected={selectedPostsType}
                                setSelected={setSelectedPostsType}
                                elements={[
                                    [
                                        translation.t("Reported Posts"),
                                        "post.reportedPosts",
                                    ],
                                    [
                                        translation.t("Hidden Posts"),
                                        "post.hiddenPosts",
                                    ],
                                    [
                                        translation.t("Deleted Posts"),
                                        "post.deletedPosts",
                                    ],
                                ]}
                                setPosts={setPosts}
                                setRout={setRout}
                            />
                            <div className="w-1/4 m-auto mt-4 text-3xl border rounded-lg hover:border-meme_violet">
                                {CheckRole("admin") && (
                                    <>
                                        <div>
                                            <NavLink
                                                href={route(
                                                    "RoleAndPermissions",
                                                )}
                                                active={route().current(
                                                    "RoleAndPermissions",
                                                )}
                                                className="bg-red-500"
                                            >
                                                {translation.t(
                                                    "Service settings",
                                                )}
                                            </NavLink>
                                        </div>
                                    </>
                                )}
                            </div>
                            {tags.length >= 0 && categories.length > 0 && (
                                <InfiniteScrollPosts
                                    chosenCategory={chosenCategory}
                                    posts={posts}
                                    fetchPosts={() =>
                                        AxiosGet(
                                            chosenCategory.length > 0
                                                ? rout
                                                : rout,
                                            {
                                                page: page,
                                                chosenCategory: chosenCategory,
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
