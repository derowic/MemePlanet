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
import FetchCategories from "@/Components/FetchCategories";
import CategoryList from "./Categories/CategoryList";
import TopPosts from "./Posts/TopPosts";
import FetchIndex from "@/Components/FetchIndex";

export default function Dashboard({ auth }) {
    const [chosenCategory, setChosenCategory] = useState(0);
    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await FetchIndex("post.index", null);
            console.log(response);
            //const response = await axios.post(`/posts?page=${page}`);
            setPosts((prevPosts) => [...prevPosts, ...response]);
            //setPage((prevPage) => prevPage + 1);
            //setAuth({ user: response.data.user });
            //setFavs((prevFavs) => [...prevFavs, ...response.data.fav]);
            //userData.name = response.data.user.name;
            //userData.id = response.data.user.id;
        } catch (error) {
            //Notification(error.response.data.msg);
            console.error("InfiniteScrollPosts -> fetchPosts error: ", error);
        }
    };

    const fetchTags = async () => {
        try {
            //const response = await axios.post(`/getTags`);
            //setTags((prevTags) => [...prevTags, ...response.data.tags]);

            let t = await FetchIndex("tag.index", null);
            setTags((prevTags) => [...prevTags, ...t]);
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("InfiniteScrollPosts -> fetchTags error: ", error);
        }
    };

    useEffect(() => {
        //fetchPosts();
        fetchTags();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"></h2>
            }
        >
            <div className="bg-[#231f20] flex text-gray-100">
                <div className=" w-1/3 mt-6">
                    <div className=" fixed p-4 sm:rounded-lg w-1/4 ml-5">
                        <h3 className="text-center font-semibold mb-2">
                            Categories
                            <hr />
                        </h3>
                        <CategoryList
                            chosenCategory={chosenCategory}
                            changeCategory={changeCategory}
                        />
                    </div>
                </div>

                <div className="bg-[#231f20] w-1/2 mt-2">
                    <div className="w-full p-4 text-center sm:rounded-lg">
                        <h2 className="bg-[#333333] p-4 mb-2 rounded-lg">
                            Meme Planet <br /> memes and news
                            <hr />
                        </h2>
                        <InfiniteScrollPosts chosenCategory={chosenCategory}  posts={posts} fetchPosts={fetchPosts} fetchTags={fetchTags} />
                    </div>
                </div>

                <div className="bg-[#231f20] w-1/3 mt-6 ml-4">
                    <div className="w-full bg-[#333333] p-4 text-center sm:rounded-lg">
                        <h3 className="text-center font-semibold mb-2">
                            Popular
                            <hr />
                        </h3>
                        <TopPosts tags={tags}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
