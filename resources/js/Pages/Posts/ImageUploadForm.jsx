import React, { useState, useEffect } from "react";
import Notification from "@/Components/Notify";
import FetchCategories from "@/Components/FetchCategories";
import axios from "axios";
import DefaultButton from "../BasicElements/DefaultButton";
import Input from "../BasicElements/Input";
import ButtonsList from "../BasicElements/ButtonsList";
import { useTranslation } from "react-i18next";
import CheckPermission from "../API/CheckPermission";
import Post from "./Post";
import Img from "./Img";
import { usePage } from "@inertiajs/react";
import PostPreView from "./PostPreView";

const ImageUploadForm = ({ onImageUpload, categories, tags }) => {
    const translation = useTranslation(["dashboard"]);
    const translationCategory = useTranslation(["category"]);
    const translationPost = useTranslation(["post"]);
    const translationTag = useTranslation(["tag"]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [customTagText, setCustomTagText] = useState("");
    const user = usePage().props.auth.user;
    useEffect(() => {}, [tags, categories, selectedCategory, selectedTags]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setPreviewImage(null);
        }

        e.target.value = null;
    };

    const handleUploadClick = () => {
        if (
            image != null &&
            title != null &&
            text != "" &&
            selectedCategory != null
        ) {
            let tmp = [];
            for (const tag of selectedTags) {
                tmp.push(tag);
            }
            onImageUpload(
                image,
                title,
                text,
                selectedCategory,
                tmp,
                customTagText,
            );
            setPreviewImage(null);
            setImage(null);
            unHide();
            setSelectedCategory(null);
            setSelectedTags([]);
            clearImg();
            setTitle("");
            setText("");
        } else {
            Notification("Image, title and category are required", "warning");
        }
    };

    const clearImg = () => {
        if (previewImage != null) {
            let get = document.getElementById("attr");
            get = document.getElementById("attr");
            get.value = "";
            get.value = null;
            get.target = null;
            setPreviewImage(null);
        }
    };

    const unHide = () => {
        const element = document.getElementById("post");
        element.hidden = !element.hidden;
        setIsOpen(!isOpen);
    };

    const close = () => {
        clearImg();
        unHide();
    };

    const selectCategory = (buttonId) => {
        setSelectedCategory(buttonId);
        console.log(categories.find((category) => category.id === buttonId));
    };

    const selectTag = (buttonId) => {
        if (selectedTags.includes(buttonId)) {
            setSelectedTags(selectedTags.filter((id) => id !== buttonId));
        } else {
            setSelectedTags([...selectedTags, buttonId]);
        }
    };

    return (
        <div className={isOpen == true ? " m-2 px-2 border" : " m-2 px-2"}>
            {CheckPermission("post.create") && isOpen == false && (
                <DefaultButton
                    onClick={unHide}
                    text={translation.t("Add new post")}
                    className={
                        "text-2xl m-4 px-2 hover:border-b hover:border-meme_violet"
                    }
                />
            )}
            <div id={"post"} hidden>
                <div className="w-full flex mt-2">
                    <div className="w-1/2">
                        <Input
                            className={
                                "bg-black3 hover:bg-black3-h text-black font-bold py-2 px-2 border border-[#555] focus:border-[#666] w-full"
                            }
                            key={"title"}
                            type={"text"}
                            title={translation.t("Title")}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                            className={
                                "bg-black3 hover:bg-black3-h text-black font-bold py-2 px-2 border border-[#555] focus:border-[#666] w-full"
                            }
                            key={"text"}
                            type={"text"}
                            title={translation.t("Text")}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <input
                            type="file"
                            id="attr2"
                            className="bg-black3 hover:bg-black3-h text-white font-bold py-2 px-2 border border-meme_violet focus:border-[#666]  w-full"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <h1 className="text-2xl border-b border-meme_violet">
                            {translation.t("Categories")}
                        </h1>
                        <div className="flex flex-wrap justify-center">
                            <ButtonsList
                                elements={categories}
                                func={selectCategory}
                                selected={selectedCategory}
                                translation={translationCategory}
                            />
                        </div>
                        <h1 className="text-2xl border-b border-meme_violet">
                            {translation.t("Tags")}
                        </h1>
                        <div className="flex flex-wrap justify-center">
                            <ButtonsList
                                elements={tags}
                                func={selectTag}
                                selected={selectedTags}
                                translation={translationTag}
                            />
                        </div>
                        <Input
                            className={
                                "bg-black3 hover:bg-black3-h text-black font-bold py-2 px-2 border border-[#555] focus:border-[#666] w-full"
                            }
                            type={"text"}
                            title={translation.t("Custom tag")}
                            value={customTagText}
                            onChange={(e) => setCustomTagText(e.target.value)}
                        />
                        {translation.t("Example:")} #humor#mem#funny
                        <div className=" border-t border-meme_violet p-2">
                            <DefaultButton
                                onClick={handleUploadClick}
                                text={translation.t("Upload")}
                                className={
                                    "border-2 border-green-500 rounded-lg p-2 mx-2"
                                }
                            />
                            <DefaultButton
                                onClick={clearImg}
                                text={translation.t("Clear")}
                                className={
                                    "border-2 border-yellow-500 rounded-lg p-2 mx-2"
                                }
                            />
                            <DefaultButton
                                onClick={close}
                                text={translation.t("Close")}
                                className={
                                    "border-2 border-red-500 rounded-lg p-2 mx-2"
                                }
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <PostPreView
                            title={title}
                            text={text}
                            category={
                                selectedCategory &&
                                categories.find(
                                    (category) =>
                                        category.id === selectedCategory,
                                ).name
                            }
                            previewImage={previewImage}
                            selectedTags={selectedTags}
                            tags={tags}
                            translationCategory={translationCategory}
                            translationTag={translationTag}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadForm;
