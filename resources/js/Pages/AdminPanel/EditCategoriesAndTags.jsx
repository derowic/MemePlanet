import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Button from "../BasicElements/Button";
import SearchUser from "./SearchUser";
import DefaultModal from "../BasicElements/DefaultModal";
import AddNewCategory from "./AddNewCategory";
import AxiosDelete from "../API/AxiosDelete";
import DefaultButton from "../BasicElements/DefaultButton";
import AxiosGet from "../API/AxiosGet";
import AxiosPut from "../API/AxiosPut";

export default function EditCategoriesAndTags() {
    const user = usePage().props.auth.user;
    const translation = useTranslation(["dashboard"]);
    const [chosenCategory, setChosenCategory] = useState(0);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPostsType, setSelectedPostsType] = useState(
        translation.t("Home"),
    );
    const [rout, setRout] = useState("post.index");

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    const checkIsUserBanned = async () => {
        let t = await AxiosGet("ban.check", null, null, null);
    };

    useEffect(() => {
        checkIsUserBanned();
        AxiosGet("tag.index", null, null,  setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="flex text-white">
                <div className="w-1/2 ">
                    <AddNewCategory
                        defaultButtonText={"Add new category"}
                        modalTitle={"Adding new category"}
                        modalDescription
                        primaryButtonText={"Add"}
                        primaryButtonOnClick={null}
                        secondaryButtonText={"Cancel"}
                        secondaryButtonOnClick={null}
                    />
                    <h2 className="mb-4">Categories</h2>
                    {categories &&
                        categories.map((category) => (
                            <div key={category.id} className="">
                                {category.name}
                                <DefaultButton
                                    className={
                                        "p-2 m-2 bg-red-500 hover:bg-red-400 rounded-lg"
                                    }
                                    text={"Delete"}
                                    onClick={() =>
                                        AxiosDelete(
                                            "category.destroy",
                                            { id: category.id },
                                            null,
                                        )
                                    }
                                />
                            </div>
                        ))}
                </div>

                <div className="w-1/2 ">
                    <h2 className="mb-4">Tags</h2>
                    {tags &&
                        tags.map((tag) => (
                            <div key={tag.id} className="">
                                <DefaultButton
                                    onClick={() =>
                                         AxiosPut("tag.improveTag",{ tag:tag.id }, null)
                                    }
                                    className="bg-purple-900 hover:bg-purple-700 p-2 rounded-lg m-2"
                                    text={" Improve to category" + tag.name}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
