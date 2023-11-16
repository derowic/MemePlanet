import React, { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";
import Notify from "@/Components/Notify";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPost = ({ categories, tags }) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleImageUpload = async (
        image,
        title,
        text,
        category,
        tags,
        customTagText,
    ) => {
        if (image != null && title != null && title != "" && category != null) {
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
                            "Content-Type": "multipart/form-data", // Ustawiamy odpowiedni Content-Type
                        },
                    },
                );
                setUploadedImageUrl(response.data.imageUrl);
                setImageUploaded(true);
                Notify(response.data.msg, "success");
            } catch (error) {
                console.error("UploadPost error: ", error);
                Notify(error);
            }
        } else {
            toast.warning("Set all inputs");
        }
    };

    return (
        <div>
            <ImageUploadForm
                onImageUpload={handleImageUpload}
                categories={categories}
                tags={tags}
            />
        </div>
    );
};

export default UploadPost;
