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

    const checkIsUserBanned = async () =>
    {
        let t = await FetchIndex("ban.check", null);
        console.log(t);
    }



    useEffect(() => {
        checkIsUserBanned();
        FetchTags("tag.index", null, setTags);
        FetchCategories("category.index", null, setCategories);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="text-white">
            {tags && tags.map((tag) => (
                    <div key={tag.id} className="text-base">
                        {tag.name}


                    </div>
            ))}
            </div>
        </AuthenticatedLayout>
    );
}
