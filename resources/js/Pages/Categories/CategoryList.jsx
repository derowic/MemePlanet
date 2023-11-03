import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import FetchIndex from "@/Pages/API/FetchIndex";
import DefaultButton from "../BasicElements/DefaultButton";
import { useTranslation } from "react-i18next";
import FetchCategories from "../API/FetchCategories";
import "./scrollbar.css"; // Import pliku CSS

function CategoryList({ chosenCategory, changeCategory }) {
    const categoryTranslation = useTranslation(["dashboard"]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        FetchCategories("category.index", null, setCategories);
    }, []);

    const beforeChangeCategory = (tmp) => {
        if (tmp == selectedCategory) {
            changeCategory(0);
            setSelectedCategory(0);
        } else {
            changeCategory(tmp);
            setSelectedCategory(tmp);
        }
    };

    return (
        <div className="w-full h-[85vh] overflow-y-auto grid custom-scroll flex items-center ">
            {categories.map((category) => (
                <DefaultButton
                    key={category.id + " categoryList"}
                    onClick={() => beforeChangeCategory(category.id)}
                    text={categoryTranslation.t(category.name)}
                    className={
                        selectedCategory === category.id
                            ? " m-2 px-2 text-left hover:bg-[#f1f1f1] bg-[#f1f1f1] text-black "
                            : " m-2 px-2 text-left hover:bg-[#f1f1f1] hover:text-black"
                    }
                />
            ))}
        </div>
    );
}

export default CategoryList;
