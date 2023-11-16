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

    useEffect(() => {
        AxiosGet("tag.index", null, null,  setTags);
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout>
            <>
            <div className="text-white w-full items-center justify-center text-center">
            <AddNewCategory
                    defaultButtonText={"Add new category"}
                    modalTitle={"Adding new category"}
                    modalDescription
                    primaryButtonText={"Add"}
                    primaryButtonOnClick={null}
                    secondaryButtonText={"Cancel"}
                    secondaryButtonOnClick={null}
                   
                />
            <div className="flex">
                <div className="w-1/2 ">
                    <h2 className="mb-4 text-center w-full">Categories</h2>
                    <div className="h-[80vh] overflow-y-auto grid custom-scroll flex items-center ">
                        {categories &&
                            categories.map((category) => (
                                <div key={category.id} className="bg-red-yellow flex justify-between m-2">
                                {category.name}
                                
                                    <DefaultButton
                                        className={
                                            "p-2 m-2 bg-red-500 hover:bg-red-400 rounded-lg text-right align-right item-right"
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
                </div>

                

                <div className="w-1/2 ">
                    <h2 className="mb-4 text-center w-full">Tags</h2>
                    <div className="h-[80vh] overflow-y-auto grid custom-scroll flex items-center  m-2">
                        {tags &&
                            tags.map((tag) => (
                                <div key={tag.id} className="bg-red-yellow flex justify-between m-2">
                                {tag.name}
                                
                                    <DefaultButton
                                        className="bg-purple-900 hover:bg-purple-700 p-2 rounded-lg m-2"
                                        text={"Improve to category "}
                                        onClick={() =>
                                            AxiosPut("tag.improveTag",{ tag:tag.id }, null)
                                        }
                                    />
                                
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>
            </div>
            </>
        </AuthenticatedLayout>
    );
}
