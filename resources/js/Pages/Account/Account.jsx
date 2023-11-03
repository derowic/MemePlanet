import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoryList from "../Categories/CategoryList";
import AccountView from "./AccountView";
import FetchIndex from "@/Pages/API/FetchIndex";
import { Link } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import FetchTags from "../API/FetchTags";
import FetchCategories from "../API/FetchCategories";
import PostsColumn from "../EXPERIMENTAL/BAD GATE PostsColumn";

export default function Account({}) {
    const accountTranslation = useTranslation(["dashboard"]);
    const [chosenCategory, setChosenCategory] = useState(0);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    useEffect(() => {
        FetchTags("tag.index", null, setTags);
        FetchCategories("category.index", null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="bg-[#111] flex text-gray-100">
                <div className=" w-1/3 mt-6">
                    <div className=" fixed p-4 sm:rounded-lg w-1/4 ml-5">
                        <h3 className="text-center font-semibold mb-2 border-b border-[#7d12ff]">
                            {accountTranslation.t("Categories")}
                        </h3>
                        <CategoryList
                            chosenCategory={chosenCategory}
                            changeCategory={changeCategory}
                        />
                    </div>
                </div>

                <div className="w-full mt-4">
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
                        <h3 className="text-center mb-2 text-3xl  border-b border-[#7d12ff]">
                            {accountTranslation.t("Edit Profile")}
                        </h3>

                        <div className="grid">
                            <Link
                                href={route("profile.edit")}
                                className="text-2xl mt-4 "
                            >
                                {accountTranslation.t("Edit basic user data")}
                            </Link>

                            <Link
                                href={route("profile.edit")}
                                className="text-2xl mt-4 "
                            >
                                {accountTranslation.t("Edit posts preferences")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
