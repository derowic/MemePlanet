import React, { useState, useEffect } from "react";
import Notification from "@/Components/Notification";
import FetchCategories from "@/Components/FetchCategories";
import axios from "axios";
import FetchIndex from "@/Components/FetchIndex";
import Button from "./Button";
import Input from "./Input";
import ButtonsList from "./ButtonsList";

const ImageUploadForm = ({ onImageUpload, categories, tags }) => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

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
            var tmp = "";
            for (const tag of selectedTags) {
                tmp += tag + " ";
            }
            onImageUpload(image, title, text, selectedCategory, tmp);
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
        <div className=
            {isOpen == true ?
            " m-2 px-2 border"
            :" m-2 px-2"}
        >
            <Button
                func={unHide}
                text={"Add new post"}
                customClass={

                    "text-2xl m-4 px-2 hover:border-b hover:border-[#ffbc40]"
                }
            />
            <div id={"post"} hidden>
                <input
                    type="file"
                    id="attr2"
                    className="bg-black3 hover:bg-black3-h text-white font-bold py-2 px-2 border border-[#555] focus:border-[#666]  w-full"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                <Input
                    type={"text"}
                    title={"Title"}
                    value={title}
                    func={setTitle}
                />
                <Input
                    type={"text"}
                    title={"Text"}
                    value={text}
                    func={setText}
                />
                <div className="flex flex-wrap justify-center mt-2">
                    {previewImage && (
                        <img id="attr" src={previewImage} alt="Preview" />
                    )}
                </div>
                <h1 className="text-2xl border-b border-[#bbb]">Categories</h1>
                <div className="flex flex-wrap justify-center">
                    <ButtonsList
                        elements={categories}
                        func={selectCategory}
                        selected={selectedCategory}
                    />
                </div>
                <h1 className="text-2xl border-b border-[#bbb]">Tags</h1>
                <div className="flex flex-wrap justify-center">
                    <ButtonsList
                        elements={tags}
                        func={selectTag}
                        selected={selectedTags}
                    />
                </div>
                <div className="text-2xl border-t border-[#bbb]">
                    <Button func={handleUploadClick} text={"Upload"} />
                    <Button func={clearImg} text={"Clear"} />
                    <Button func={close} text={"Close"} />
                </div>
            </div>
        </div>
    );
};

export default ImageUploadForm;
