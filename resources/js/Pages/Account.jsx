import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import CategoryList from "./Categories/CategoryList";
import AccountView from "./Account/AccountView";
import FetchIndex from "@/Components/FetchIndex";
import { Link } from "@inertiajs/react";

export default function Account({ auth }) {
    const [chosenCategory, setChosenCategory] = useState(0);
    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchTags = async () => {
        try {
            //const response = await axios.post(`/getTags`);
            //setTags((prevTags) => [...prevTags, ...response.data.tags]);

            let t = await FetchIndex("tag.index", null);
            setTags((prevTags) => [...prevTags, ...t]);
            console.log("tags");
        } catch (error) {
            console.error("InfiniteScrollPosts -> fetchTags error: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            let t = await FetchIndex("category.index", null);
            setCategories((prevTags) => [...prevTags, ...t]);
            console.log("categories");
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

                <div className="bg-[#231f20] w-1/2 mt-4">
                    <div className="w-full p-4 text-center ">
                        <AccountView
                            categoryId={chosenCategory}
                            categories={categories}
                            tags={tags}
                        />
                    </div>
                </div>

                <div className="w-1/3 mt-4 ml-4">
                    <div className="w-full  p-4 text-center sm:rounded-lg">
                        <h3 className="text-center mb-2 text-3xl border-b">
                            Edit Profile
                        </h3>

                        <div className="grid">
                            <Link
                                href={route("profile.edit")}
                                className="text-2xl mt-4 hover:border-b border-[#ffbc40]"
                            >
                                Edit basic user data
                            </Link>

                            <Link
                                href={route("profile.edit")}
                                className="text-2xl mt-4 hover:border-b border-[#ffbc40]"
                            >
                                Edit posts preferences
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
