import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import DefaultButton from "../BasicElements/DefaultButton";
import { useTranslation } from "react-i18next";
import AxiosGet from "../API/AxiosGet";
import "../scrollbar.css";
import { Drawer } from "@mui/material";
import { Switch } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";

function CategoryList({ changeCategory }) {
    const categoryTranslation = useTranslation(["category"]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [enabled, setEnabled] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const beforeChangeCategory = (tmp) => {
        if (selectedCategories.includes(tmp)) {
            setSelectedCategories((prevCategories) => {
                const newCategories = prevCategories.filter((id) => id !== tmp);
                //setSelectedCategories(newCategories);
                changeCategory(newCategories);
                return [...newCategories, tmp];
            });

            setSelectedCategories(
                selectedCategories.filter((id) => id !== tmp),
            );
        } else {
            setSelectedCategories((prevCategories) => {
                const newCategories = [...prevCategories, tmp];
                changeCategory(newCategories);
                return newCategories;
            });
        }
        /*
        if (tmp == selectedCategoriesCategory) {
            changeCategory(0);
            setSelectedCategoriesCategory(0);
        } else {
            changeCategory(tmp);
            setSelectedCategoriesCategory(tmp);
        }
        */
    };

    /*
    const selectTag = (buttonId) => {
        if (selectedCategoriesTags.includes(buttonId)) {
            setSelectedCategoriesTags(selectedCategoriesTags.filter((id) => id !== buttonId));
        } else {
            setSelectedCategoriesTags([...selectedCategoriesTags, buttonId]);
        }
    };
    */

    useEffect(() => {
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    return (
        <>
            <div className="hamburger-icon p-1" onClick={togglePanel}>
                <IoMdMenu size={32} />
            </div>

            <Drawer
                anchor="left"
                open={isOpen}
                onClose={togglePanel}
                className="items-center justify-center "
            >
                <div className="bg-meme_black h-full">
                    <div className="bg-meme_black text-white overflow-y-auto grid custom-scroll flex items-center ">
                        {categories != undefined &&
                            categories.length > 0 &&
                            categories.map((element) => (
                                <DefaultButton
                                    key={element.id + "buttons list"}
                                    onClick={() =>
                                        beforeChangeCategory(element.id)
                                    }
                                    text={categoryTranslation.t(element.name)}
                                    className={
                                        Array.isArray(selectedCategories)
                                            ? selectedCategories.includes(
                                                  element.id,
                                              )
                                                ? " m-2 px-2 text-left hover:bg-[#f1f1f1] bg-[#f1f1f1] text-black "
                                                : " m-2 px-2 text-left hover:bg-[#f1f1f1] hover:text-black"
                                            : selectedCategories === element.id
                                            ? " m-2 px-2 text-left hover:bg-[#f1f1f1] bg-[#f1f1f1] text-black "
                                            : " m-2 px-2 text-left hover:bg-[#f1f1f1] hover:text-black"
                                    }
                                />
                            ))}
                    </div>
                </div>
                {/*
            <div className="bg-meme_black h-full">
                <div className="bg-meme_black text-white overflow-y-auto grid custom-scroll flex items-center ">
                    {categories.map((category) => (
                        <DefaultButton
                            key={category.id + " categoryList"}
                            onClick={() => beforeChangeCategory(category.id)}
                            text={categoryTranslation.t(category.name)}
                            className={
                                selectedCategoriesCategory === category.id
                                    ? " m-2 px-2 text-left hover:bg-[#f1f1f1] bg-[#f1f1f1] text-black "
                                    : " m-2 px-2 text-left hover:bg-[#f1f1f1] hover:text-black"
                            }
                        />
                    ))}
                </div>
            </div>
            */}
            </Drawer>
        </>
    );
}

export default CategoryList;
