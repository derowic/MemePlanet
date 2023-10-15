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
import FetchIndex from "@/Components/FetchIndex";
import PostsTypeSelect from "./Posts/PostsTypeSelect";
import { ToastContainer } from "react-toastify";
import { router, usePage } from "@inertiajs/react";


export default function Dashboard() {

    const user = usePage().props.auth;


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
    /*
    const loadNewPost = async (rout) => {
        const response = await FetchIndex(rout, null);
        setPosts((prevPosts) => [...prevPosts, ...response]);
    };
    */

    const refreshPosts = async () => {
        setPosts([]);
        const response = await FetchIndex(rout, null);
        setPosts((prevPosts) => [...prevPosts, ...response]);
    };

    const fetchPosts = async () => {
        let params = { page: page };
        const response = await FetchIndex(rout, params);
        setPosts((prevPosts) => [...prevPosts, ...response]);
        setPage(page + 1);
        console.log("fetchPosts try load new posts " + posts.length);
        //console.log(response);
    };

    /*
    const fetchPosts = async () => {
        try {
          const response = await axios.get(`/api/posts?page=${page}`);
          const newPosts = response.data;
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);

        } catch (error) {
          console.error('Błąd podczas pobierania postów', error);
        }
      };
      */

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
            <ToastContainer />
            <div className="font-bold bg-[#231f20] ">
                <div className="flex text-gray-100">
                    <div className=" w-1/3 mt-6">
                        <div className=" fixed p-4 sm:rounded-lg w-1/5 ml-5">
                            <h3 className="text-center mb-2 text-3xl">
                                Categories
                                <hr />
                            </h3>
                            <CategoryList
                                chosenCategory={chosenCategory}
                                changeCategory={changeCategory}
                            />
                            <button
                                onClick={() =>
                                    router.visit(
                                        route("post.onePost", { post: 1 }),
                                    )
                                }
                            >
                                TEST
                            </button>
                        </div>
                    </div>

                    <div className="w-3/4 mt-2">
                        <div className="w-full text-center">
                            <h2 className="mb-2 text-3xl">
                                Meme Planet - memes and news
                                <hr />
                            </h2>
                            <PostsTypeSelect
                                selected={selectedPostsType}
                                setSelected={setSelectedPostsType}
                                elements={[
                                    ["Home", "post.index"],
                                    ["Top", "post.top"],
                                    ["Trending", "post.trending"],
                                    ["Fresh", "post.fresh"],
                                ]}
                                setPosts={setPosts}
                                setRout={setRout}
                                //loadNewPost={loadNewPost}
                            />
                            {tags.length > 0 && categories.length > 0 && (
                                <InfiniteScrollPosts
                                    chosenCategory={chosenCategory}
                                    posts={posts}
                                    fetchPosts={fetchPosts}
                                    categories={categories}
                                    tags={tags}
                                    refreshPosts={refreshPosts}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-1/3 mt-4 ml-4">
                        <div className="w-full p-4 text-center">
                            <h3 className="text-center mb-2 text-3xl">Hot</h3>
                            <TopPosts tags={tags} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
