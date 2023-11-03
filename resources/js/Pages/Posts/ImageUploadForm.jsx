import React, { useState, useEffect } from "react";
import Notification from "@/Components/Notify";
import FetchCategories from "@/Components/FetchCategories";
import axios from "axios";
import FetchIndex from "@/Pages/API/FetchIndex";
import DefaultButton from "../BasicElements/DefaultButton";
import Input from "../BasicElements/Input";
import ButtonsList from "../BasicElements/ButtonsList";
import { useTranslation } from "react-i18next";
import CheckPermission from "../API/CheckPermission";

const ImageUploadForm = ({ onImageUpload, categories, tags }) => {
    const translation = useTranslation(["dashboard"]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [customTagText, setCustomTagText] = useState("");
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
            title != "" &&
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
            Notification("Image, title and category are required");
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
            {CheckPermission("post.create") && (
                <DefaultButton
                    onClick={unHide}
                    text={translation.t("Add new post")}
                    className={
                        "text-2xl m-4 px-2 hover:border-b hover:border-meme_violet"
                    }
                />
            )}
            <div id={"post"} hidden>
                <input
                    type="file"
                    id="attr2"
                    className="bg-black3 hover:bg-black3-h text-white font-bold py-2 px-2 border border-meme_violet focus:border-[#666]  w-full"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                <Input
                    key={"title"}
                    type={"text"}
                    title={translation.t("Title")}
                    value={title}
                    func={setTitle}
                />
                <Input
                    key={"text"}
                    type={"text"}
                    title={translation.t("Text")}
                    value={text}
                    func={setText}
                />
                <div className="flex flex-wrap justify-center mt-2">
                    {previewImage && (
                        <img id="attr" src={previewImage} alt="Preview" />
                    )}
                </div>
                <h1 className="text-2xl border-b border-meme_violet">
                    {translation.t("Categories")}
                </h1>
                <div className="flex flex-wrap justify-center">
                    <ButtonsList
                        elements={categories}
                        func={selectCategory}
                        selected={selectedCategory}
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
                    />
                </div>
                <Input
                    type={"text"}
                    title={translation.t("Custom tag")}
                    value={customTagText}
                    func={setCustomTagText}
                />
                Example: #humor#mem#funny
                <div className=" border-t border-meme_violet p-2">
                    <DefaultButton
                        onClick={handleUploadClick}
                        text={translation.t("Upload")}
                        className={"border-2 border-green-500 rounded-lg p-2 mx-2"}
                    />
                    <DefaultButton
                        onClick={clearImg}
                        text={translation.t("Clear")}
                        className={"border-2 border-yellow-500 rounded-lg p-2 mx-2"}
                    />
                    <DefaultButton
                        onClick={close}
                        text={translation.t("Close")}
                        className={"border-2 border-red-500 rounded-lg p-2 mx-2"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUploadForm;
