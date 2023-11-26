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
import FetchWithPagination from "./API/FetchWithPagination";
import BanInfo from "@/Layouts/BanInfo";
import { usePage } from "@inertiajs/react";
import Composition from "./providerTest/Index";
import AxiosGet from "./API/AxiosGet";

export default function Dashboard() {
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
        translation.t("Home"),
    );
    const [rout, setRout] = useState("post.index");
    const checkIsUserBanned = async () => {
        let t = await AxiosGet("ban.check", null, null, null);
    };

    useEffect(() => {
        checkIsUserBanned();
        AxiosGet("tag.index", null, null, setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout changeCategory={changeCategory}>
            <div className="font-bold h-full">
                <div className="flex text-gray-100">
                    <div className="w-full mt-2">
                        <div className="w-full text-center">
                            <BanInfo data={user} />
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
                            {tags.length >= 0 && categories.length > 0 && (
                                <InfiniteScrollPosts
                                    chosenCategory={chosenCategory}
                                    posts={posts}
                                    fetchPosts={() =>
                                        AxiosGet(
                                            chosenCategory.length > 0 ?  rout: rout ,
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
