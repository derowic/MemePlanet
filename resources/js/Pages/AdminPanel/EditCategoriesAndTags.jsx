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
    const translation = useTranslation(["rolesAndPermissions"]);
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

    const deleteCategory = (deletedCategory) => {
        AxiosDelete("category.destroy", { id: deletedCategory.id }, null);
        refresh();
    };

    const improveTag = (tag) => {
        AxiosPut("tag.improveTag", { tag: tag.id }, null);
        refresh();
    };

    const refresh = () => {
        AxiosGet("tag.index", null, null, setTags);
        AxiosGet("category.index", null, null, setCategories);
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <>
            <div className="text-white w-full items-center justify-center text-center">
                <AddNewCategory
                    defaultButtonText={translation.t("Add new category")}
                    modalTitle={translation.t("Adding new category")}
                    modalDescription
                    primaryButtonText={translation.t("Add")}
                    primaryButtonOnClick={null}
                    secondaryButtonText={translation.t("Cancel")}
                    secondaryButtonOnClick={null}
                />
                <div className="flex">
                    <div className="w-1/2 ">
                        <h2 className="mb-4 text-center w-full">
                            {translation.t("Categories")}
                        </h2>
                        <div className="h-[85vh] overflow-y-auto custom-scroll  items-center ">
                            {categories &&
                                categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="bg-red-yellow flex justify-between m-2"
                                    >
                                        {translation.t(category.name)}

                                        <DefaultButton
                                            className={
                                                "p-2 m-2 bg-red-500 hover:bg-red-400 rounded-lg text-right align-right item-right"
                                            }
                                            text={translation.t("Delete")}
                                            onClick={() =>
                                                deleteCategory(category)
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="w-1/2 ">
                        <h2 className="mb-4 text-center w-full">
                            {translation.t("Tags")}
                        </h2>
                        <div className="h-[85vh] overflow-y-auto custom-scroll  items-center  m-2">
                            {tags &&
                                tags.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className="bg-red-yellow flex justify-between m-2"
                                    >
                                        <div>{translation.t(tag.name)}:</div>
                                        <div> {tag.use_count}</div>

                                        <DefaultButton
                                            className="bg-green-600 hover:bg-green-400 p-2 rounded-lg m-2"
                                            text={translation.t(
                                                "Improve to category",
                                            )}
                                            onClick={() => improveTag(tag)}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
