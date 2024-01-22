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
import Notify from "@/Components/Notify";

const ImageUploadForm = ({ categories, tags, fetchTags }) => {
    const translation = useTranslation(["dashboard"]);
    const translationCategory = useTranslation(["category"]);
    const translationTag = useTranslation(["tag"]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [customTagText, setCustomTagText] = useState("");
    const [errors, setErrors] = useState([]);
    useEffect(() => {}, [title, text, tags, categories, selectedCategory, selectedTags,errors]);

    const handleImageUpload = async (
        image,
        title,
        text,
        category,
        tags,
        customTagText,
    ) => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("title", title);
            formData.append("text", text);
            formData.append("category", category);
            formData.append("tags", tags);
            formData.append("customTag", customTagText);
            const response = await axios.post(
                route("post.store"),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            Notify(response.data.message, "success").then(() => {
                fetchTags();
            });
            setErrors([]);
            setSelectedCategory(null);
            setSelectedTags([]);
            setPreviewImage(null);
            setImage(null);
            clearImg();
            setTitle("");
            setText("");
        } catch (error) {
            setErrors(error.response ? error.response.data.errors : []);
            if(error.response)
            {
                Notify(error.response.data.message, "error");
            }
        }
    };

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
        let tmp = [];
        for (const tag of selectedTags) {
            tmp.push(tag);
        }
        handleImageUpload(image,title,text,selectedCategory,tmp,customTagText);
    };

    const clearImg = () => {
        if (previewImage != null) {
            let get = document.getElementById("attr");
            get = document.getElementById("attr");
            get.value = "";
            get.value = null;
            get.target = null;
        }
        setErrors([]);
        setSelectedCategory(null);
        setSelectedTags([]);
        setPreviewImage(null);
        setImage(null);
        setTitle("");
        setText("");
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
                        <div className="text-red-500">{errors.title && errors.title[0]}</div>
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
                        <div className="text-red-500">{errors.text && errors.text[0]}</div>
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/gif"
                            id="attr2"
                            className="bg-black3 hover:bg-black3-h text-white font-bold py-2 px-2 border border-meme_violet focus:border-[#666]  w-full"
                            onChange={handleImageChange}
                        />
                        <div className="text-red-500">{errors.image && errors.image[0]}</div>
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
                        <div className="text-red-500">{errors.category && errors.category[0]}</div>
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
                        <div className="text-red-500">{errors.tags && errors.tags[0]}</div>
                        <Input
                            className={
                                "bg-black3 hover:bg-black3-h text-black font-bold py-2 px-2 border border-[#555] focus:border-[#666] w-full"
                            }
                            type={"text"}
                            title={translation.t("Custom tag")}
                            value={customTagText}
                            onChange={(e) => setCustomTagText(e.target.value)}
                            placeholder = {"#customTag"}
                        />
                           <div className="text-red-500">{errors.customTag && errors.customTag[0]}</div>

                        <div className=" border-meme_violet p-2">
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
