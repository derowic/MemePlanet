import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import FetchIndex from "@/Components/FetchIndex";

function CategoryList({ chosenCategory, changeCategory }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        //var tmp = await FetchCategories();
        //setCategories(prevCategories => [...prevCategories, ...tmp]);

        let t = await FetchIndex("category.index", null);
        console.log(t);
        setCategories((prevCategories) => [...prevCategories, ...t]);
    };

    useEffect(() => {
        fetchCategories();
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
        <div className="">
            {categories.map((category) => (
                <div key={"cat" + category.id}>
                    <button
                        onClick={() => beforeChangeCategory(category.id)}
                        className={`${
                            selectedCategory === category.id
                                ? "bg-[#FFC465] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-bg-[#FFC465]"
                                : null
                        } m-2`}
                    >
                        {category.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
