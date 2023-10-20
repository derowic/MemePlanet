import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import FetchIndex from "@/Pages/API/FetchIndex";
import Button from "../BasicElements/Button";
import { useTranslation } from "react-i18next";
import FetchCategories from "../API/FetchCategories";

function CategoryList({ chosenCategory, changeCategory }) {
    const categoryTranslation = useTranslation(["dashboard"]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        FetchCategories("category.index", null, setCategories)
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
        <div className="grid">
            {categories.map((category) => (
                <Button
                    key={category.id + " categoryList"}
                    func={() => beforeChangeCategory(category.id)}
                    text={categoryTranslation.t(category.name)}
                    customClass={
                        selectedCategory === category.id
                            ? "m-2 px-2 text-left hover:bg-[#333] border-b border-[#ffbc40]"
                            : "m-2 px-2 text-left hover:bg-[#333]"
                    }
                />
            ))}
        </div>
    );
}

export default CategoryList;
