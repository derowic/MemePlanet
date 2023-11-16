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

export default function AdminPanel() {
    const translation = useTranslation(["dashboard"]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("Reported Posts"),
    );
    const [rout, setRout] = useState("post.reportedPosts");

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    useEffect(() => {
        AxiosGet("tag.index", null, null, setTags);
        AxiosGet("category.index", null, null, setCategories);
        FetchPosts(rout, { page: page }, setPosts, page, setPage);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="font-bold bg-[#111] h-full">
                <div className="flex text-gray-100">
                    <div className=" w-1/4 mt-6">
                        <div className="w-full sticky top-20 p-4 sm:rounded-lg ">
                            <h3 className="w-full text-center mb-2 text-3xl"></h3>
                        </div>
                    </div>

                    <div className="w-2/4 mt-2">
                        <div className="w-full text-center">
                            <h2 className="mb-2 text-3xl border-b border-meme_violet">
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
                                ]}
                                setPosts={setPosts}
                                setRout={setRout}
                            />
                            {tags.length > 0 &&
                                categories.length > 0 &&
                                posts.length > 0 && (
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
                                    />
                                )}
                        </div>
                    </div>

                    <div className="w-1/4 mt-4 ml-4">
                        <div className="w-full p-4 text-center ">
                            <h3 className=" w-full text-center mb-2 text-3xl w-full">
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
                                            >
                                                {translation.t(
                                                    "Role and permissions",
                                                )}
                                            </NavLink>
                                        </div>

                                        <div>
                                            <NavLink
                                                href={route(
                                                    "EditCategoriesAndTags",
                                                )}
                                                active={route().current(
                                                    "EditCategoriesAndTags",
                                                )}
                                            >
                                                {translation.t(
                                                    "EditCategoriesAndTags",
                                                )}
                                            </NavLink>
                                        </div>
                                    </>
                                )}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
