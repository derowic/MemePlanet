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
import FetchIndex from "../API/FetchIndex";
import FetchTags from "../API/FetchTags";
import FetchCategories from "../API/FetchCategories";
import DefaultModal from "../BasicElements/DefaultModal";
import EditTag from "../API/EditTag";
import ImproveTag from "../API/ImproveTag";
import AddNewCategory from "./AddNewCategory";
import AxiosDelete from "../API/AxiosDelete";
import DefaultButton from "../BasicElements/DefaultButton";

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
        let t = await FetchIndex("ban.check", null);
        console.log(t);
    };

    useEffect(() => {
        checkIsUserBanned();
        FetchTags("tag.index", null, setTags);
        FetchCategories("category.index", null, setCategories);
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
                                            "adminPanel.deleteCategory",
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
                                        ImproveTag(
                                            "adminPanel.improveTag",
                                            tag.id,
                                        )
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
