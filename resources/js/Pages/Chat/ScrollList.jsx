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
import { Switch } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";

function ScrollList({ changeCategory, resetCategory }) {
    const categoryTranslation = useTranslation(["category"]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    const [enabled, setEnabled] = useState(false);

    const beforeChangeCategory = (tmp) => {
        if (selectedCategories.includes(tmp)) {
            setSelectedCategories((prevCategories) => {
                const newCategories = prevCategories.filter((id) => id !== tmp);
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
    };

    useEffect(() => {
        AxiosGet("user.getAllUsers", null, null, setCategories);
    }, []);

    useEffect(() => {
        setSelectedCategories([]);
        //console.log("reset");
    }, [resetCategory]);

    return (
        <>
            <div className="bg-meme_black h-full">
                <div className="bg-meme_black text-white overflow-y-auto h-[80vh] grid custom-scroll flex items-center ">
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
        </>
    );
}

export default ScrollList;
